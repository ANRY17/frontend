// error.js
'use client';
export default function Error({ error, reset }) {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 space-y-6 bg-white rounded-lg shadow-lg text-center">
        <div className="container mx-auto py-6">
          <h1 className="text-6xl font-extrabold text-red-600 mb-4">
            Something went wront!
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Error</h2>
          <p className="text-lg text-gray-600 mb-6">{error.message}</p>
          <button
            className="inline-block px-6 py-3 text-lg text-white bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 ease-in-out"
            onClick={reset}
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
