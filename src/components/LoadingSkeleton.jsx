import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 1, className = '' }) => {
  const skeletons = Array.from({ length: count }, (_, index) => {
    switch (type) {
      case 'card':
        return (
          <div key={index} className={`animate-pulse bg-gray-200 rounded-lg p-4 ${className}`}>
            <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="bg-gray-300 h-4 rounded w-3/4"></div>
              <div className="bg-gray-300 h-4 rounded w-1/2"></div>
              <div className="bg-gray-300 h-6 rounded w-1/3"></div>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div key={index} className={`animate-pulse space-y-2 ${className}`}>
            <div className="bg-gray-300 h-4 rounded w-full"></div>
            <div className="bg-gray-300 h-4 rounded w-5/6"></div>
            <div className="bg-gray-300 h-4 rounded w-4/6"></div>
          </div>
        );
      
      case 'image':
        return (
          <div key={index} className={`animate-pulse bg-gray-300 rounded ${className}`}>
            <div className="h-full w-full bg-gray-300 rounded"></div>
          </div>
        );
      
      case 'button':
        return (
          <div key={index} className={`animate-pulse bg-gray-300 h-10 rounded-lg ${className}`}></div>
        );
      
      case 'nav':
        return (
          <div key={index} className={`animate-pulse flex items-center justify-between p-4 ${className}`}>
            <div className="bg-gray-300 h-8 w-24 rounded"></div>
            <div className="flex space-x-4">
              <div className="bg-gray-300 h-6 w-16 rounded"></div>
              <div className="bg-gray-300 h-6 w-16 rounded"></div>
              <div className="bg-gray-300 h-6 w-16 rounded"></div>
            </div>
            <div className="flex space-x-2">
              <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
              <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
            </div>
          </div>
        );
      
      case 'hero':
        return (
          <div key={index} className={`animate-pulse ${className}`}>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <div className="bg-gray-300 h-8 rounded w-3/4"></div>
                <div className="bg-gray-300 h-12 rounded w-full"></div>
                <div className="space-y-2">
                  <div className="bg-gray-300 h-4 rounded w-full"></div>
                  <div className="bg-gray-300 h-4 rounded w-5/6"></div>
                </div>
                <div className="bg-gray-300 h-12 rounded-lg w-32"></div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-300 h-96 rounded-lg"></div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div key={index} className={`animate-pulse bg-gray-300 h-20 rounded ${className}`}></div>
        );
    }
  });

  return (
    <>
      {skeletons}
    </>
  );
};

export default LoadingSkeleton;