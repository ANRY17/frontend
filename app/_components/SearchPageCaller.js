'use client';
import { useState, useEffect } from 'react';
import SearchPageClient from '@/app/_components/SearchPageClient';
import { getPopularBlogsByRating } from '@/app/_lib/api';

export default function SearchPageCaller() {
  const [initialResults, setInitialResults] = useState([]);
  const [initialQuery, setInitialQuery] = useState('');
  const [initialPage, setInitialPage] = useState(1);
  const [initialPageCount, setInitialPageCount] = useState(1);

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await getPopularBlogsByRating();
      setInitialResults(data);
      setInitialPage(1);
      setInitialPageCount(1);
    };

    fetchInitialData();
  }, []);

  return (
    <SearchPageClient
      initialResults={initialResults}
      initialQuery={initialQuery}
      initialPage={initialPage}
      initialPageCount={initialPageCount}
    />
  );
}
