const axios = require("axios");
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const headers = {
  Authorization: `Bearer ${token}`,
};

/**
 * Fetches all blog posts. The list endpoint is usually paginated (often 10 per page by default);
 * without query params you only get the first page. We request pages until a short page is returned.
 */
export const getNewsData = async () => {
  try {
    const pageSize = 100;
    const merged = [];
    let page = 1;
    let lastRes = null;

    while (true) {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "news",
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


export const getNewsDetailData = async ({ newsSlug }) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "news/" + newsSlug,
      { headers }
    );
    return res;
  } catch (err) {
    console.error("❌ Blog Detail API error:", err.message);
  }
};


export const getCategoryNewsList = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "news-categories",
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


    export const getNewsCategoryDetailData = async (newsCategorySlug) => {
    try {
      const pageSize = 100;
      const merged = [];
      let page = 1;

      while (true) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}news/category/${newsCategorySlug}`,
          {
            headers,
            params: {
              page,
              per_page: pageSize,
              limit: pageSize,
            },
          }
        );

        const body = res?.data;
        const inner =
          body?.data && typeof body.data === "object" && !Array.isArray(body.data)
            ? body.data
            : body;
        const chunk = Array.isArray(inner?.data)
          ? inner.data
          : Array.isArray(inner)
            ? inner
            : [];

        if (chunk.length === 0) break;

        const seen = new Set(merged.map((item) => item.id ?? item.slug));
        const fresh = chunk.filter((item) => !seen.has(item.id ?? item.slug));
        if (fresh.length === 0) break;

        merged.push(...fresh);

        const totalPages = Number(inner?.pages ?? body?.pages);
        if (Number.isFinite(totalPages) && totalPages > 0 && page >= totalPages) {
          break;
        }
        if (!Number.isFinite(totalPages) && chunk.length < pageSize) {
          break;
        }

        page += 1;
        if (page > 500) break;
      }

      return {
        data: {
          data: merged,
        },
      };
    } catch (err) {
      console.error("❌ Blog Category Detail API error:", err.message);
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
      console.error("❌ News Author Detail API error:", err.message);
    }
  };