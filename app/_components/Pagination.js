export default function Pagination({ page, pageCount, onPageChange }) {
  return (
    <div className="flex justify-center">
      {Array.from({ length: pageCount }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          disabled={page === index + 1}
          className={`px-4 py-2 mx-1 ${
            page === index + 1 ? 'bg-gray-400' : 'bg-gray-200'
          } rounded`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
