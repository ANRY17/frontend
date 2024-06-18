'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="relative w-full h-custom-96 md:h-custom-128 mb-6 mx-auto overflow-hidden">
      <div
        className="relative w-full h-full flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-full flex-shrink-0"
            style={{ backgroundColor: '#9ca3af' }}
          >
            <Image
              src={image.src}
              layout="fill"
              objectFit="cover"
              placeholder="empty"
              quality={80}
              alt={`Slide ${index + 1}`}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full ${
              index === currentImageIndex
                ? 'bg-white'
                : 'bg-gray-500 hover:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
