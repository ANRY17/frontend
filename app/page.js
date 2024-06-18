import HeroSection from '@/app/_components/HeroSection';
import ActivitiesSection from '@/app/_components/CategoriesSection';
import AboutSection from '@/app/_components/AboutSection';
import LatestPostsSection from '@/app/_components/LatestPostSection';
import FeatureSection from '@/app/_components/FeatureSection';
import mountain from '@/public/norway.png';
import beach from '@/public/gili.jpg';
import island from '@/public/nusa.jpg';

export default function Home() {
  const images = [{ src: mountain }, { src: beach }, { src: island }];
  return (
    <main className="min-h-screen">
      <HeroSection images={images} />
      <ActivitiesSection />
      <AboutSection />
      <FeatureSection />
      <LatestPostsSection />
    </main>
  );
}
