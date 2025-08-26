import { useState } from 'react';

const FilterSort = ({ onFilterChange, onSortChange, categories = [], priceRange = { min: 0, max: 1000 } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    rating: 0
  });
  const [sortBy, setSortBy] = useState('name');

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: '',
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      rating: 0
    };
    setFilters(defaultFilters);
    setSortBy('name');
    onFilterChange(defaultFilters);
    onSortChange('name');
  };

  return (
    <div className='relative'>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200'
      >
        <svg className='w-5 h-5 text-slate-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z' />
        </svg>
        <span className='text-slate-gray font-medium'>Filter & Sort</span>
        <svg className={`w-4 h-4 text-slate-gray transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className='absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-6'>
          {/* Sort Section */}
          <div className='mb-6'>
            <h3 className='text-lg font-semibold text-slate-gray mb-3'>Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-red'
            >
              <option value='name'>Name (A-Z)</option>
              <option value='name-desc'>Name (Z-A)</option>
              <option value='price-asc'>Price (Low to High)</option>
              <option value='price-desc'>Price (High to Low)</option>
              <option value='rating-desc'>Rating (High to Low)</option>
              <option value='rating-asc'>Rating (Low to High)</option>
            </select>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className='mb-6'>
              <h3 className='text-lg font-semibold text-slate-gray mb-3'>Category</h3>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-red'
              >
                <option value=''>All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price Range Filter */}
          <div className='mb-6'>
            <h3 className='text-lg font-semibold text-slate-gray mb-3'>Price Range</h3>
            <div className='flex gap-3 items-center'>
              <div className='flex-1'>
                <label className='block text-sm text-slate-gray mb-1'>Min</label>
                <input
                  type='number'
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', Number(e.target.value))}
                  min={priceRange.min}
                  max={priceRange.max}
                  className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-red'
                />
              </div>
              <span className='text-slate-gray mt-6'>-</span>
              <div className='flex-1'>
                <label className='block text-sm text-slate-gray mb-1'>Max</label>
                <input
                  type='number'
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', Number(e.target.value))}
                  min={priceRange.min}
                  max={priceRange.max}
                  className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-red'
                />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className='mb-6'>
            <h3 className='text-lg font-semibold text-slate-gray mb-3'>Minimum Rating</h3>
            <div className='flex gap-2 flex-wrap'>
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange('rating', rating)}
                  className={`px-4 py-2 rounded-lg border transition-colors duration-200 flex-shrink-0 ${
                    filters.rating === rating
                      ? 'bg-coral-red text-white border-coral-red'
                      : 'bg-white text-slate-gray border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {rating === 0 ? 'All' : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-3'>
            <button
              onClick={clearFilters}
              className='flex-1 px-4 py-2 bg-gray-100 text-slate-gray rounded-lg hover:bg-gray-200 transition-colors duration-200'
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className='flex-1 px-4 py-2 bg-coral-red text-white rounded-lg hover:bg-red-600 transition-colors duration-200'
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSort;