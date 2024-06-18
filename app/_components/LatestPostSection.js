'use client';
import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '@/app/_lib/api';
import BlogCard from '@/app/_components/BlogCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LatestPostsSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const result = await getAllBlogs(1, 4);
      if (result) {
        setPosts(result.data);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <section id="latest-posts" className="mt-20 mb-14 md:mt-28 md:mb-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Latest Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
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
            : posts.map((post) => (
                <BlogCard key={post.id} post={post} skeletonLoading={loading} />
              ))}
        </div>
      </div>
    </section>
  );
}
