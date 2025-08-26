import { useState } from 'react';
import { useWishlist } from '../contexts/WishlistContext';

const WishlistButton = ({ product, className = '', size = 'medium' }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isWishlisted = isInWishlist(product.id);
  
  const handleWishlistToggle = (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    
    setIsAnimating(true);
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  // Size variants
  const sizeClasses = {
    small: 'w-8 h-8 p-1.5',
    medium: 'w-10 h-10 p-2',
    large: 'w-12 h-12 p-2.5'
  };
  
  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };
  
  return (
    <button
      onClick={handleWishlistToggle}
      className={`
        ${sizeClasses[size]}
        rounded-full transition-all duration-200 
        ${isWishlisted 
          ? 'bg-coral-red text-white hover:bg-red-600' 
          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-coral-red'
        }
        border border-gray-200 hover:border-coral-red
        transform hover:scale-110 active:scale-95
        ${isAnimating ? 'animate-pulse' : ''}
        ${className}
      `}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg 
        className={`${iconSizes[size]} transition-transform duration-200 ${isAnimating ? 'scale-125' : ''}`}
        fill={isWishlisted ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={isWishlisted ? 0 : 2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
};

export default WishlistButton;