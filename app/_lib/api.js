import get from 'lodash/get';

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

async function fetchData(url, options = {}) {
  try {
    const response = await fetch(`${baseUrl}${url}`, options);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

export async function getAllBlogs(page = 1, pageSize = 4) {
  const strapiData = await fetchData(
    `/api/posts?populate=cover&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`
  );
  if (!strapiData || !strapiData.data || !strapiData.data.length) return null;
  console.log(strapiData);

  return {
    data: strapiData.data.map((post) => ({
      id: post.id,
      title: post.attributes.title,
      slug: post.attributes.slug,
      coverUrl: getCoverUrl(post.attributes.cover),
      tags:
        post.attributes.tags?.data.map((tag) => ({
          name: tag.attributes.name,
        })) || [],
      createdAt: post.attributes.createdAt,
    })),
    pagination: strapiData.meta.pagination,
  };
}

// Get Detail Blog by slug
export async function getBlogBySlug(slug) {
  const strapiData = await fetchData(
    `/api/posts?filters[slug][$eq]=${slug}&populate=cover,seo,tags`
  );
  if (!strapiData || !strapiData.data || !strapiData.data.length) return null;

  const post = strapiData.data[0];
  return {
    id: post.id,
    title: post.attributes.title,
    content: post.attributes.content,
    cover: getCoverUrl(post.attributes.cover),
    tags:
      post.attributes.tags?.data.map((tag) => ({
        name: tag.attributes.name,
        slug: tag.attributes.slug,
      })) || [],
    seo: post.attributes.seo,
    createdAt: post.attributes.createdAt,
  };
}
// Get CoverUrl
export function getCoverUrl(cover) {
  const coverUrl = get(cover, 'data[0].attributes.url');
  return coverUrl ? `${baseUrl}${coverUrl}` : null;
}

// Get Comments and Ratings by slug
export async function getCommentsAndRatingsBySlug(slug) {
  const commentsResponse = await fetchData(`/api/ratings/reviews/${slug}`);
  return {
    comments: commentsResponse?.reviews || [],
    averageScore: commentsResponse?.averageScore || 0,
    reviewsCount: commentsResponse?.reviewsCount || 0,
  };
}

// Post Comment and Rating
export async function postCommentAndRating(blogId, content, score, token) {
  const data = {
    comment: content,
    score: score,
  };

  return await fetchData(`/api/ratings/reviews/${blogId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function getBlogsByTag(tag, page = 1, pageSize = 8) {
  const strapiData = await fetchData(
    `/api/posts?filters[tags][slug][$eq]=${tag}&populate=cover,tags&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`
  );
  if (!strapiData || !strapiData.data || !strapiData.data.length)
    return { data: [], pagination: { pageCount: 1 } };
  console.log(strapiData);

  return {
    data: strapiData.data.map((post) => ({
      id: post.id,
      title: post.attributes.title,
      slug: post.attributes.slug,
      tags: post.attributes.tags.data.map((tag) => tag.attributes),
      coverUrl: getCoverUrl(post.attributes.cover),
      createdAt: post.attributes.createdAt,
    })),
    pagination: strapiData.meta.pagination,
  };
}

export async function getSimilarPosts(tags, currentPostId) {
  const tagFilters = tags
    .map((tag) => `filters[tags][name][$eq]=${tag}`)
    .join('&');
  const strapiData = await fetchData(
    `/api/posts?${tagFilters}&populate=cover,tags`
  );
  if (!strapiData || !strapiData.data) return [];

  return strapiData.data
    .filter((post) => post.id !== currentPostId) // Exclude the current post
    .map((post) => ({
      id: post.id,
      title: post.attributes.title,
      slug: post.attributes.slug,
      coverUrl: getCoverUrl(post.attributes.cover),
      tags: post.attributes.tags.data.map((tag) => tag.attributes),
      createdAt: post.attributes.createdAt,
    }));
}

export async function getBlogsByPage(page, pageSize) {
  const strapiData = await fetchData(
    `/api/posts?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=cover,seo,tags`
  );

  if (!strapiData || !strapiData.data) return { posts: [], meta: {} };

  const posts = strapiData.data.map((post) => ({
    id: post.id,
    title: post.attributes.title,
    content: post.attributes.content,
    cover: getCoverUrl(post.attributes.cover),
    tags:
      post.attributes.tags?.data.map((tag) => ({
        name: tag.attributes.name,
      })) || [],
    seo: {
      id: post.attributes.seo.id,
      SeoTitle: post.attributes.seo.SeoTitle,
      SeoDescription: post.attributes.seo.SeoDescription,
    },
    createdAt: post.attributes.createdAt,
  }));

  const meta = strapiData.meta.pagination;

  return { posts, meta };
}

// Function to search posts
export async function searchPosts(query, page = 1, pageSize = 8) {
  const strapiData = await fetchData(
    `/api/posts?filters[title][$containsi]=${query}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=cover,tags`
  );
  if (!strapiData || !strapiData.data) return [];

  return {
    data: strapiData.data.map((post) => ({
      id: post.id,
      title: post.attributes.title,
      slug: post.attributes.slug,
      coverUrl: getCoverUrl(post.attributes.cover),
      tags:
        post.attributes.tags?.data.map((tag) => ({
          name: tag.attributes.name,
        })) || [],
      createdAt: post.attributes.createdAt,
    })),
    pagination: strapiData.meta.pagination,
  };
}

// Mengambil popular blogs berdasarkan rating
export async function getPopularBlogsByRating() {
  const strapiData = await fetchData('/api/posts?populate=cover,tags');
  if (!strapiData || !strapiData.data) return [];

  const postsWithRatings = await Promise.all(
    strapiData.data.map(async (post) => {
      const ratingData = await fetchData(
        `/api/ratings/reviews/${post.attributes.slug}/stats`
      );
      return {
        id: post.id,
        title: post.attributes.title,
        slug: post.attributes.slug,
        coverUrl: getCoverUrl(post.attributes.cover),
        tags:
          post.attributes.tags?.data.map((tag) => ({
            name: tag.attributes.name,
          })) || [],
        createdAt: post.attributes.createdAt,
        averageRating: ratingData?.averageScore || 0,
      };
    })
  );

  return postsWithRatings.sort((a, b) => b.averageRating - a.averageRating);
}

export async function getTags() {
  const response = await fetch(`${baseUrl}/api/tags?populate=image`);
  const strapiData = await response.json();

  if (!strapiData || !strapiData.data) return [];

  return strapiData.data.map((tag) => {
    const { id, attributes } = tag;
    const { name, slug, image } = attributes;

    const imageUrl = getImagerUrl(image);

    return {
      id,
      name,
      slug,
      image: imageUrl,
    };
  });
}

// Get CoverUrl function
function getImagerUrl(image) {
  const imageUrl = image?.data?.attributes?.url;
  return imageUrl ? `${baseUrl}${imageUrl}` : null;
}

export async function login(identifier, password) {
  const data = {
    identifier,
    password,
  };

  return await fetchData('/api/auth/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

// Fungsi register
export async function register(username, email, password) {
  const data = {
    username,
    email,
    password,
  };

  return await fetchData('/api/auth/local/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

// Fungsi untuk mendapatkan profil pengguna
export async function getProfile(token) {
  return await fetchData('/api/users/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

