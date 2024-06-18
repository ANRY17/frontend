'use client';
import { useEffect, useState } from 'react';
import { getPopularBlogsByRating } from '@/app/_lib/api';
import BlogCard from '@/app/_components/BlogCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PopularBlogsByRating() {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularBlogs = async () => {
      setLoading(true);
      const data = await getPopularBlogsByRating();
      setPopularBlogs(data.slice(0, 8));
      setLoading(false);
    };

    fetchPopularBlogs();
  }, []);

  return (
    <section className="container mx-auto my-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-10">
        Popular Blogs by Rating
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
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
          : popularBlogs.map((post) => (
              <BlogCard key={post.id} post={post} skeletonLoading={loading} />
            ))}
      </div>
    </section>
  );
}
