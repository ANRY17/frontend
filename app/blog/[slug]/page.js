import { getBlogBySlug } from '@/app/_lib/api';
import BlogDetail from '@/app/_components/BlogDetail';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const blogData = await getBlogBySlug(slug);
  const { seo } = blogData;

  return {
    title: seo.seoTitle,
    description: seo.seoDescription,
  };
}

export default async function BlogPost({ params }) {
  const { slug } = params;
  const blogData = await getBlogBySlug(slug);
  return <BlogDetail blogData={blogData} />;
}
