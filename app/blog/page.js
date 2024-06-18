import { getAllBlogs } from '@/app/_lib/api';
import BlogClient from '@/app/_components/BlogClient';
import HeroSection from '@/app/_components/HeroSection';
import museum from '@/public/museum.jpg';
import museum2 from '@/public/museum2.jpg';
import museum3 from '@/public/museum3.jpg';

export default async function BlogPage() {
  const { data: initialBlogs, pagination: initialPagination } =
    await getAllBlogs(1);
  const images = [{ src: museum }, { src: museum2 }, { src: museum3 }];

  return (
    <main className="min-h-screen ">
      <HeroSection images={images} />
      <div className="container mx-auto py-10">
        <h2 className="text-4xl font-bold text-center">
          Activities for Everyone
        </h2>
        <section className="px-4">
          <BlogClient
            initialBlogs={initialBlogs}
            initialPagination={initialPagination}
          />
        </section>
      </div>
    </main>
  );
}
