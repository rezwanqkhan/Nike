import { useState, useEffect, useRef } from 'react';
import { products } from '../constants';

const SearchBar = ({ onSearchResults, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts([]);
      setIsOpen(false);
      if (onSearchResults) {
        onSearchResults([]);
      }
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
    setIsOpen(filtered.length > 0);
    setSelectedIndex(-1);
    
    if (onSearchResults) {
      onSearchResults(filtered);
    }
  }, [searchTerm, onSearchResults]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen || filteredProducts.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredProducts.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleProductSelect(filteredProducts[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleProductSelect = (product) => {
    setSearchTerm(product.name);
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onSearchResults) {
      onSearchResults([product]);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onSearchResults) {
      onSearchResults([]);
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => filteredProducts.length > 0 && setIsOpen(true)}
          placeholder="Search for Nike products..."
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-coral-red focus:border-transparent transition-all duration-200"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-coral-red transition-colors duration-200"
          >
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && filteredProducts.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {/* Results Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Results List */}
          <div className="py-2">
            {filteredProducts.map((product, index) => (
              <button
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className={`w-full px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors duration-200 ${
                  selectedIndex === index ? 'bg-coral-red bg-opacity-10' : ''
                }`}
              >
                {/* Product Image */}
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={product.imgURL} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Product Details */}
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-slate-gray">
                    {highlightText(product.name, searchTerm)}
                  </h4>
                  <p className="text-coral-red font-bold">
                    {highlightText(product.price, searchTerm)}
                  </p>
                </div>
                
                {/* Arrow Icon */}
                <div className="text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-100 px-4 py-3">
            <div className="flex gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">Enter</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">Esc</kbd>
                Close
              </span>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && searchTerm && filteredProducts.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <div className="px-4 py-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-gray mb-2">No products found</h3>
            <p className="text-gray-500">Try searching with different keywords</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;