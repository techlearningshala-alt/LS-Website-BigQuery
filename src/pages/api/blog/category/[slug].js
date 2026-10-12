import {
  getBlogCategoryDetailData,
  parseBlogCategoryApiResponse,
} from "@/services/BlogService";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const slug = req.query.slug;
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, Math.min(50, parseInt(req.query.limit, 10) || 9));

  if (!slug || Array.isArray(slug)) {
    return res.status(400).json({ error: "Invalid category slug" });
  }

  const apiRes = await getBlogCategoryDetailData(slug, { page, limit });
  if (!apiRes) {
    return res.status(502).json({ error: "Failed to fetch category blogs" });
  }

  const parsed = parseBlogCategoryApiResponse(apiRes, limit);
  return res.status(200).json(parsed);
}
