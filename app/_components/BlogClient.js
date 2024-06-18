'use client';
import { useState, useEffect, useRef } from 'react';
import { getAllBlogs } from '@/app/_lib/api';
import BlogCard from '@/app/_components/BlogCard';
import Pagination from '@/app/_components/Pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BlogClient({ initialBlogs, initialPagination }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(initialPagination.pageCount);
  const [loading, setLoading] = useState(false);

  const initialLoad = useRef(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const { data, pagination } = await getAllBlogs(page, 8);
        setBlogs(data);
        setPageCount(pagination.pageCount);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!initialLoad.current) {
      fetchBlogs();
    } else {
      initialLoad.current = false;
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="container mx-auto py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          : blogs.map((post) => (
              <BlogCard key={post.id} post={post} skeletonLoading={loading} />
            ))}
      </div>
      <Pagination
        page={page}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </>
  );
}
