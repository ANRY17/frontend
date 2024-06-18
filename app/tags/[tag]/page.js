'use client';

import { useState, useEffect } from 'react';
import { getBlogsByTag } from '@/app/_lib/api';
import BlogCard from '@/app/_components/BlogCard';
import HeroSection from '@/app/_components/HeroSection';
import Pagination from '@/app/_components/Pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import zoo from '@/public/gembiraloka.jpg';
import candi from '@/public/borobudur.jpg';
import waterfall from '@/public/sipiso.jpg';

export default function BlogsByTagPage({ params }) {
  const { tag } = params;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const images = [{ src: candi }, { src: waterfall }, { src: zoo }];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const { data, pagination } = await getBlogsByTag(tag, page);
      setBlogs(data);
      setPageCount(pagination.pageCount);
      setLoading(false);
    };

    fetchBlogs();
  }, [tag, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <main className="min-h-screen">
      <HeroSection images={images} />
      <section className="container mx-auto py-6 px-4">
        <h1 className="text-4xl font-bold mb-6">Posts tagged with #{tag}</h1>
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
            : blogs.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
        <Pagination
          page={page}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
