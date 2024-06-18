'use client';
import { useState, useEffect } from 'react';
import { getTags } from '@/app/_lib/api';
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';

export default function ActivitiesSection() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await getTags();
        setTags(tagsData.slice(0, 4));
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <section id="activities" className="my-12 md:my-16 text-center px-4">
      <h2 className="text-4xl font-bold mb-10">Some Categories</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="relative h-80 sm:h-64 lg:h-80 overflow-hidden rounded-lg shadow-lg group"
              >
                <Skeleton height="100%" />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                  <Skeleton width="80%" height={24} />
                  <Skeleton width="60%" height={20} />
                </div>
              </div>
            ))
          : tags.map((tag) => (
              <Link
                className="relative h-80 sm:h-64 lg:h-80 overflow-hidden rounded-lg shadow-lg group"
                key={tag.id}
                href={`/tags/${tag.slug}`}
              >
                <Image
                  src={tag.image}
                  alt={tag.name}
                  layout="fill"
                  objectFit="cover"
                  quality={80}
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 transform lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                  <h2 className="text-white text-xl">#{tag.name}</h2>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}
