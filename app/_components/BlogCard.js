import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BlogCard({ post, skeletonLoading }) {
  const { id, title, slug, coverUrl, createdAt } = post;

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      key={id}
      href={`/blog/${slug}`}
      className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 mt-8 text-center"
    >
      <div className="relative h-72 overflow-hidden">
        {skeletonLoading ? (
          <Skeleton height={'100%'} />
        ) : (
          coverUrl && (
            <Image
              src={coverUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          )
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">
          {skeletonLoading ? <Skeleton width={100} /> : `${formattedDate}`}
        </p>
        <h3 className="text-lg font-semibold mb-2">
          {skeletonLoading ? <Skeleton width={200} /> : title || ''}
        </h3>
      </div>
    </Link>
  );
}
