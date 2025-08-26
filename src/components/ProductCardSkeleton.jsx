import React from 'react';

const ProductCardSkeleton = ({ count = 8 }) => {
  return (
    <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-8 place-items-center">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="animate-pulse">
          {/* Product Image Skeleton */}
          <div className="bg-gray-300 h-[282px] w-full rounded-lg mb-4"></div>
          
          {/* Rating Stars Skeleton */}
          <div className="flex gap-1 mb-2">
            {Array.from({ length: 5 }, (_, starIndex) => (
              <div key={starIndex} className="bg-gray-300 h-4 w-4 rounded-sm"></div>
            ))}
            <div className="bg-gray-300 h-4 w-8 rounded ml-2"></div>
          </div>
          
          {/* Product Name Skeleton */}
          <div className="bg-gray-300 h-6 rounded w-3/4 mb-2"></div>
          
          {/* Product Price Skeleton */}
          <div className="bg-gray-300 h-5 rounded w-1/2 mb-4"></div>
          
          {/* Color Options Skeleton */}
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 3 }, (_, colorIndex) => (
              <div key={colorIndex} className="bg-gray-300 h-6 w-6 rounded-full"></div>
            ))}
          </div>
          
          {/* Size Options Skeleton */}
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 4 }, (_, sizeIndex) => (
              <div key={sizeIndex} className="bg-gray-300 h-8 w-12 rounded"></div>
            ))}
          </div>
          
          {/* Action Buttons Skeleton */}
          <div className="flex gap-2">
            <div className="bg-gray-300 h-10 flex-1 rounded-lg"></div>
            <div className="bg-gray-300 h-10 w-10 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;