import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';


const Pagination = ({ currentPage, totalPages, onPageChange, isLoading }) => {
  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        className={`p-1 rounded-md ${currentPage === 1 || isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-gray-100'}`}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => !isLoading && onPageChange(page)}
          disabled={isLoading}
          className={`w-8 h-8 rounded-md ${currentPage === page
              ? 'bg-primary text-white'
              : 'text-gray-700 hover:bg-gray-100'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || isLoading}
        className={`p-1 rounded-md ${currentPage === totalPages || isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-gray-100'}`}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;