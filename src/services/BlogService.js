const axios = require("axios");
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const headers = {
  Authorization: `Bearer ${token}`,
};

function isActiveBlog(blog) {
  return (
    blog?.is_active !== false &&
    blog?.is_active !== 0 &&
    blog?.is_page_created !== false
  );
}

/** Normalizes category list API body (works in SSG, API routes, and browser). */
export function parseBlogCategoryApiResponse(apiBody, fallbackLimit = 9) {
  if (!apiBody) {
    return { blogs: [], page: 1, limit: fallbackLimit, total: 0, pages: 1 };
  }

  const inner =
    apiBody?.data &&
    typeof apiBody.data === "object" &&
    !Array.isArray(apiBody.data)
      ? apiBody.data
      : apiBody;

  const rawList = Array.isArray(inner?.data)
    ? inner.data
    : Array.isArray(inner?.blogs)
      ? inner.blogs
      : Array.isArray(apiBody?.data)
        ? apiBody.data
        : [];

  const blogs = rawList.filter(isActiveBlog);
  const limit =
    Number(inner.limit ?? apiBody.limit ?? fallbackLimit) || fallbackLimit;
  const total =
    Number(inner.total ?? apiBody.total ?? blogs.length) || blogs.length;
  const page = Number(inner.page ?? apiBody.page ?? 1) || 1;
  const pages =
    Number(inner.pages ?? apiBody.pages) ||
    Math.max(1, Math.ceil(total / limit));

  return { blogs, page, limit, total, pages };
}

/**
 * Fetches all blog posts. The list endpoint is usually paginated (often 10 per page by default);
 * without query params you only get the first page. We request pages until a short page is returned.
 */
export const getBlogData = async () => {
  try {
    const pageSize = 100;
    const merged = [];
    let page = 1;
    let lastRes = null;

    while (true) {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "blogs",
        {
          headers,
          params: {
            page,
            per_page: pageSize,
            limit: pageSize,
          },
        }
      );
      lastRes = res;
      const chunk = res?.data?.data?.data;

      if (!Array.isArray(chunk)) {
        return res;
      }
      if (chunk.length === 0) {
        break;
      }

      merged.push(...chunk);

      if (chunk.length < pageSize) {
        break;
      }

      page += 1;
      if (page > 500) {
        break;
      }
    }

    if (!lastRes || merged.length === 0) {
      return lastRes;
    }

    const inner = lastRes.data?.data;
    const meta =
      inner && typeof inner === "object" && !Array.isArray(inner) ? inner : {};

    return {
      data: {
        ...lastRes.data,
        data: {
          ...meta,
          data: merged,
        },
      },
    };
  } catch (err) {
    console.error("❌ Blog API error:", err.message);
    // throw new Error("Unable to fetch mentor data");
    // return []; // ✅ return fallback instead of throwing
  }
};


export const getBlogDetailData = async ({ blogSlug }) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "blogs/" + blogSlug,
      { headers }
    );
    return res;
  } catch (err) {
    console.error("❌ Blog Detail API error:", err.message);
  }
};


export const getCategoryBlogList = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "blog-categories",
        { headers }
      );
      return res;
    } catch (err) {
      console.error("❌ Blog API error:", err.message);
      // throw new Error("Unable to fetch mentor data");
      // return []; // ✅ return fallback instead of throwing
    }
  };



  // export const getBlogCategoryDetailData = async ({ blogCategorySlug }) => {
  //   try {
  //     const res = await axios.get(
  //       process.env.NEXT_PUBLIC_BACKEND_URL + "blogs/category/" + blogCategorySlug,
  //       { headers }
  //     );
  //     return res;
  //   } catch (err) {
  //     console.error("❌ Blog Category Detail API error:", err.message);
  //   }
  // };


  export const getBlogCategoryDetailData = async (blogCategorySlug, options = {}) => {
    try {
      const { page = 1, limit = 9 } = options;
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!baseUrl) {
        console.error("❌ Blog Category Detail API error: NEXT_PUBLIC_BACKEND_URL is missing");
        return null;
      }

      const res = await axios.get(
        `${baseUrl}blogs/category/${blogCategorySlug}`,
        {
          headers,
          params: { page, limit },
        }
      );

      return res.data;
    } catch (err) {
      console.error("❌ Blog Category Detail API error:", err.message);
      return null;
    }
  };






  export const getAuthorDetailData = async (params = {}) => {
    try {
      const authorSlug = params?.authorSlug;

      // Single author by slug
      if (authorSlug) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}authors/slug/${authorSlug}`,
          { headers }
        );
        return res;
      }

      // Authors list is paginated (default ~10/page) — fetch all pages
      const pageSize = 100;
      const merged = [];
      let page = 1;
      let lastRes = null;

      while (true) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}authors`,
          {
            headers,
            params: {
              page,
              per_page: pageSize,
              limit: pageSize,
            },
          }
        );
        lastRes = res;
        const chunk = res?.data?.data?.data;

        if (!Array.isArray(chunk)) {
          return res;
        }
        if (chunk.length === 0) break;

        merged.push(...chunk);

        const totalPages = Number(res?.data?.data?.pages);
        if (Number.isFinite(totalPages) && totalPages > 0 && page >= totalPages) {
          break;
        }
        if (chunk.length < pageSize) break;

        page += 1;
        if (page > 500) break;
      }

      if (!lastRes || merged.length === 0) {
        return lastRes;
      }

      const inner = lastRes.data?.data;
      const meta =
        inner && typeof inner === "object" && !Array.isArray(inner) ? inner : {};

      return {
        data: {
          ...lastRes.data,
          data: {
            ...meta,
            data: merged,
            total: merged.length,
            pages: 1,
            page: 1,
          },
        },
      };
    } catch (err) {
      console.error("❌ Blog Author Detail API error:", err.message);
    }
  };