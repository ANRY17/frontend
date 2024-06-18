import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 space-y-6 bg-white rounded-lg shadow-lg text-center">
        <div className="container mx-auto py-6">
          <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link href="/">
            <button className="inline-block px-6 py-3 text-lg text-white bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 ease-in-out">
              Go back home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
