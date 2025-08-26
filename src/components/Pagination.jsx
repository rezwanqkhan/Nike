import { useMemo } from 'react';

const Pagination = ({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  maxVisiblePages = 5 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const visiblePages = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages, maxVisiblePages]);

  if (totalPages <= 1) return null;

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className='flex flex-col items-center gap-4 mt-8'>
      {/* Page Info */}
      <div className='text-slate-gray font-montserrat text-sm'>
        Showing {startItem}-{endItem} of {totalItems} results
      </div>

      {/* Pagination Controls */}
      <div className='flex items-center gap-2'>
        {/* Previous Button */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-slate-gray border-gray-300 hover:bg-gray-50 hover:border-coral-red'
          }`}
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </button>

        {/* First Page */}
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => handlePageClick(1)}
              className='px-3 py-2 rounded-lg border bg-white text-slate-gray border-gray-300 hover:bg-gray-50 hover:border-coral-red transition-colors duration-200'
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className='px-2 text-slate-gray'>...</span>
            )}
          </>
        )}

        {/* Visible Page Numbers */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
              page === currentPage
                ? 'bg-coral-red text-white border-coral-red'
                : 'bg-white text-slate-gray border-gray-300 hover:bg-gray-50 hover:border-coral-red'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last Page */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className='px-2 text-slate-gray'>...</span>
            )}
            <button
              onClick={() => handlePageClick(totalPages)}
              className='px-3 py-2 rounded-lg border bg-white text-slate-gray border-gray-300 hover:bg-gray-50 hover:border-coral-red transition-colors duration-200'
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-slate-gray border-gray-300 hover:bg-gray-50 hover:border-coral-red'
          }`}
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </button>
      </div>

      {/* Items Per Page Selector */}
      <div className='flex items-center gap-2 text-sm'>
        <span className='text-slate-gray font-montserrat'>Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onPageChange(1, Number(e.target.value))}
          className='px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-coral-red text-slate-gray'
        >
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={16}>16</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;