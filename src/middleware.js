import { NextResponse } from "next/server";
import { getRedirectionData } from "./services/RedirectionService";
import { getUniversityDetailData } from "./services/UniversitypageService";

let redirectCache = [];
let lastRedirectFetchAt = 0;
const REDIRECT_CACHE_TTL_MS = 60 * 1000; // refresh every 60s
const universityExistsCache = new Map();

function normalizePath(path) {
  if (!path) return "";

  let pathname = String(path);
  try {
    if (/^https?:\/\//i.test(pathname)) {
      pathname = new URL(pathname).pathname;
    }
  } catch {
    // keep original string
  }

  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  return pathname;
}

function buildRedirectMap(entries) {
  const map = new Map();

  for (const entry of entries) {
    const from = normalizePath(entry?.old_url);
    const to = normalizePath(entry?.new_url);

    if (!from || !to || from === to) continue;
    if (!map.has(from)) map.set(from, to);
  }

  return map;
}

function universitySlugFromPath(path) {
  const parts = String(path || "")
    .split("/")
    .filter(Boolean);
  if (parts[0] !== "university" || !parts[1]) return null;
  return parts[1];
}

async function universityPageExists(path) {
  const slug = universitySlugFromPath(path);
  if (!slug) return null;

  const cached = universityExistsCache.get(slug);
  if (cached && Date.now() - cached.at < REDIRECT_CACHE_TTL_MS) {
    return cached.exists;
  }

  const res = await getUniversityDetailData({ universitySlug: slug });
  const data = res?.data?.data?.data;
  const exists = !!(
    data &&
    data.is_page_created !== false &&
    data.is_active !== 0
  );

  universityExistsCache.set(slug, { exists, at: Date.now() });
  return exists;
}

async function resolveDestination(startPath, redirectMap) {
  const visited = new Set();
  let current = startPath;
  let cycle = false;

  while (redirectMap.has(current)) {
    if (visited.has(current)) {
      cycle = true;
      break;
    }
    visited.add(current);
    current = redirectMap.get(current);
  }

  if (!cycle) {
    return current === startPath ? null : current;
  }

  const nextPath = redirectMap.get(startPath);
  if (!nextPath || nextPath === startPath) return null;

  const [currentExists, nextExists] = await Promise.all([
    universityPageExists(startPath),
    universityPageExists(nextPath),
  ]);

  // Keep the live university page; send the 404 slug to it.
  if (currentExists === false && nextExists === true) return nextPath;
  return null;
}

export async function middleware(request) {
  let pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  pathname = normalizePath(pathname);

  try {
    const shouldRefreshCache =
      redirectCache.length === 0 ||
      Date.now() - lastRedirectFetchAt > REDIRECT_CACHE_TTL_MS;

    if (shouldRefreshCache) {
      console.log("⏳ Fetching redirect API...");

      const res = await getRedirectionData();
      redirectCache = res?.data?.data?.data || [];
      lastRedirectFetchAt = Date.now();
    }

    const redirectMap = buildRedirectMap(redirectCache);
    const destination = await resolveDestination(pathname, redirectMap);

    if (destination) {
      console.log("🚀 API redirect matched:");
      console.log("FROM:", pathname);
      console.log("TO  :", destination);

      const target = new URL(destination, request.url);
      if (!target.pathname.endsWith("/")) {
        target.pathname = `${target.pathname}/`;
      }
      target.search = request.nextUrl.search;

      return NextResponse.redirect(target, 301);
    }
  } catch (error) {
    console.log("❌ Redirect API error:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
