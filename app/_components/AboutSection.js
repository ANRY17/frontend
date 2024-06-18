import Image from 'next/image';
import norway from '@/public/norway.png';

export default function AboutSection() {
  return (
    <section id="about" className="my-12 md:my-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">About</h2>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
          <div className="relative w-full md:w-2.5/5 h-80 rounded overflow-hidden bg-gray-300">
            <Image
              src={norway}
              alt="About Us"
              layout="fill"
              objectFit="cover"
              quality={80}
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-2.5/5 mt-8 md:mt-0 md:pl-10 text-left">
            <div className="mb-8">
              <p className="text-xl font-bold">Sustainable</p>
              <p className="mt-2">
                At Jejak Wisata, we are committed to supporting sustainable
                tourism by respecting the environment and local cultures. We
                believe that responsible travel can provide long-term benefits
                for destinations and their communities.
              </p>
            </div>
            <div className="mb-8">
              <p className="text-xl font-bold">Fair & Share</p>
              <p className="mt-2">
                We uphold the principle of fairness in all our travel
                activities. By sharing experiences and benefits equitably, we
                ensure that everyone has the opportunity to enjoy the beauty of
                the world.
              </p>
            </div>
            <div>
              <p className="text-xl font-bold">Experience</p>
              <p className="mt-2">
                Jejak Wisata provides authentic and memorable travel
                experiences. We believe that travel is not just about the
                destination, but also about the adventures, learning, and
                memories created along the way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
