import { useState, useMemo, useEffect } from 'react';
import { products } from "../constants";
import { PopularProductCard } from "../components";
import FilterSort from "../components/FilterSort";
import Pagination from "../components/Pagination";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const PopularProducts = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceMin: 0,
    priceMax: 1000,
    rating: 0
  });
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  // Extract unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category).filter(Boolean))];
    return uniqueCategories;
  }, []);

  // Calculate price range
  const priceRange = useMemo(() => {
    const prices = products.map(product => parseFloat(product.price.replace('$', '')));
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const price = parseFloat(product.price.replace('$', ''));
      const rating = product.rating || 0;
      
      return (
        (filters.category === '' || product.category === filters.category) &&
        price >= filters.priceMin &&
        price <= filters.priceMax &&
        rating >= filters.rating
      );
    });

    // Sort products
    filtered.sort((a, b) => {
      const priceA = parseFloat(a.price.replace('$', ''));
      const priceB = parseFloat(b.price.replace('$', ''));
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;

      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'rating-desc':
          return ratingB - ratingA;
        case 'rating-asc':
          return ratingA - ratingB;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handlePageChange = (page, newItemsPerPage) => {
    if (newItemsPerPage && newItemsPerPage !== itemsPerPage) {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1); // Reset to first page when items per page changes
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <section id='products' className='max-container max-sm:mt-12'>
      <div className='flex flex-col justify-start gap-5'>
        <h2 className='text-4xl font-palanquin font-bold'>
          Our <span className='text-coral-red'> Popular </span> Products
        </h2>
        <p className='lg:max-w-lg mt-2 font-montserrat text-slate-gray'>
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design, and value
        </p>
      </div>

      {/* Filter and Sort Controls */}
      <div className='mt-8 flex justify-between items-center'>
        <FilterSort
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          categories={categories}
          priceRange={priceRange}
        />
        <div className='text-slate-gray font-montserrat'>
          {filteredAndSortedProducts.length} products found
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <ProductCardSkeleton count={itemsPerPage} />
      ) : (
        <div className='mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-8 place-items-center'>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <PopularProductCard key={product.id} {...product} />
            ))
          ) : (
            <div className='col-span-full text-center py-12'>
              <div className='text-slate-gray text-lg font-montserrat'>
                No products found matching your criteria.
              </div>
              <button
                onClick={() => {
                  setFilters({
                    category: '',
                    priceMin: priceRange.min,
                    priceMax: priceRange.max,
                    rating: 0
                  });
                  setSortBy('name');
                  setCurrentPage(1);
                }}
                className='mt-4 px-6 py-2 bg-coral-red text-white rounded-lg hover:bg-red-600 transition-colors duration-200'
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && filteredAndSortedProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredAndSortedProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default PopularProducts;
