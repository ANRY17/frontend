'use client';

import { useState, useEffect } from 'react';
import { searchPosts, getPopularBlogsByRating } from '@/app/_lib/api';
import BlogCard from '@/app/_components/BlogCard';
import SearchBar from '@/app/_components/SearchBar';
import Pagination from '@/app/_components/Pagination';
import Skeleton from 'react-loading-skeleton';
import PopularBlogsByRating from '@/app/_components/PopularBlogsByRating';
import HeroSection from '@/app/_components/HeroSection';
import temple from '@/public/pura.jpg';
import terrace from '@/public/terrace.jpg';
import lake from '@/public/padar.jpg';
import 'react-loading-skeleton/dist/skeleton.css';

import React from 'react';

export default function SearchPageClient({
  initialResults,
  initialQuery,
  initialPage,
  initialPageCount,
}) {
  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState(initialResults);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageCount, setPageCount] = useState(initialPageCount);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const images = [{ src: temple }, { src: terrace }, { src: lake }];

  useEffect(() => {
    const fetchPopularBlogs = async () => {
      const data = await getPopularBlogsByRating();
      setPopularBlogs(data);
    };

    if (!query) {
      fetchPopularBlogs();
    }
  }, [query]);

  const handleSearch = async (searchTerm) => {
    setQuery(searchTerm);
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setPageCount(1);
    } else {
      setLoading(true);
      const { data, pagination } = await searchPosts(searchTerm, 1);
      setSearchResults(data);
      setPageCount(pagination.pageCount);
      setCurrentPage(1);
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);
    setLoading(true);
    const { data } = await searchPosts(query, newPage);
    setSearchResults(data);
    setLoading(false);
  };

  return (
    <main>
      <HeroSection images={images} />
      <section className=" container mx-auto py-6px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Search Results</h1>
        <SearchBar onSearch={handleSearch} />
        {query && (
          <p className="text-center mb-10 text-gray-600">
            Showing results for &quot;
            <span className="font-semibold">{query}</span>&quot;
          </p>
        )}
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
            : searchResults.map((post) => (
                <BlogCard key={post.id} post={post} skeletonLoading={loading} />
              ))}
        </div>
        {!loading && searchResults.length === 0 && query && (
          <p className="text-center mt-6 text-gray-600">No results found.</p>
        )}
        {!loading && searchResults.length > 0 && (
          <Pagination
            page={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        )}
        {!query && <PopularBlogsByRating />}
      </section>
    </main>
  );
}