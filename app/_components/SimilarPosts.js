'use client';
import { useEffect, useState } from 'react';
import { getSimilarPosts } from '@/app/_lib/api';
import BlogCard from '@/app/_components/BlogCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SimilarPosts({ tags, currentPostId }) {
  const [similarPosts, setSimilarPosts] = useState([]);
  const [loadingSimilarPosts, setLoadingSimilarPosts] = useState(true);

  useEffect(() => {
    async function fetchSimilarPosts() {
      const posts = await getSimilarPosts(
        tags.map((tag) => tag.name),
        currentPostId
      );
      setSimilarPosts(posts.slice(0, 4)); // Limit to 4 posts
      setLoadingSimilarPosts(false);
    }
    fetchSimilarPosts();
  }, [tags, currentPostId]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Similar Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loadingSimilarPosts
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="w-full">
                <Skeleton height={200} />
                <Skeleton
                  count={1}
                  height={20}
                  style={{ marginTop: '8px', marginBottom: '4px' }}
                />
                <Skeleton
                  count={1}
                  height={20}
                  style={{ marginBottom: '8px' }}
                />
              </div>
            ))
          : similarPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                skeletonLoading={loadingSimilarPosts}
              />
            ))}
      </div>
    </div>
  );
}
