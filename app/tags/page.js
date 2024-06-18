'use client';
import { useEffect, useState } from 'react';
import HeroSection from '@/app/_components/HeroSection';
import { getTags } from '@/app/_lib/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Image from 'next/image';
import Link from 'next/link';
import bank from '@/public/bank.jpg';
import candi from '@/public/prambanan.jpg';
import mountain from '@/public/batur.jpg';

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const images = [{ src: bank }, { src: candi }, { src: mountain }];

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      const tagsData = await getTags();
      setTags(tagsData);
      setLoading(false);
    };

    fetchTags();
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection images={images} />
      <section>
        <div className="container mx-auto py-10 px-4">
          <h1 className="text-4xl font-bold text-center mb-10">Explore Tags</h1>
          {loading ? (
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
              {Array.from({ length: 20 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 relative h-48"
                >
                  <Skeleton
                    height={40}
                    width={'100%'}
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tags.map((tag) => (
                <Link key={tag.id} href={`/tags/${tag.slug}`}>
                  <div className="relative h-48">
                    <Image
                      src={tag.image} // Gunakan tag.image jika tersedia, jika tidak, gunakan placeholder
                      alt={tag.name}
                      layout="fill"
                      objectFit="cover"
                      quality={80}
                      className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-white">
                        #{tag.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
