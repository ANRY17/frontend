import Image from 'next/image';
import norway from '@/public/norway.png';

export default function FeatureSection() {
  const quotes = [
    {
      category: 'Adventure',
      quote:
        'The world is a book, and those who do not travel read only one page.',
      author: 'Saint Augustine',
    },
  ];

  return (
    <section id="feature" className="my-20 md:my-28">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Travel Quotes</h2>
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="relative w-full h-96 mb-6 mx-auto overflow-hidden rounded-lg shadow-lg"
          >
            <Image
              src={norway}
              alt="Feature Image"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full z-0 filter brightness-75"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-between text-center text-white p-6 z-10">
              <h2 className="text-lg uppercase mb-2 tracking-widest">
                {quote.category}
              </h2>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                &quot;{quote.quote}&quot;
              </h1>
              <p className="text-lg italic">- {quote.author} -</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
