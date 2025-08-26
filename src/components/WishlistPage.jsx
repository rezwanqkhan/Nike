import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import WishlistButton from './WishlistButton';
import { star } from '../assets/icons';

const WishlistPage = () => {
  const { wishlistItems, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addingItems, setAddingItems] = useState(new Set());

  const handleAddToCart = async (product) => {
    setAddingItems(prev => new Set([...prev, product.id]));
    
    // Add product to cart with default selections
    const productToAdd = {
      ...product,
      selectedColor: product.colors?.[0]?.name || 'Default',
      selectedSize: product.sizes?.find(size => size.available)?.value || 'M',
      quantity: 1
    };
    
    addToCart(productToAdd);
    
    // Remove loading state after animation
    setTimeout(() => {
      setAddingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 500);
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-container min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-gray mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Start adding products you love to your wishlist. You can save items for later and easily find them here.
        </p>
        <button 
          onClick={() => window.location.href = '#products'}
          className="bg-coral-red text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors duration-200"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <section className="max-container py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-palanquin font-bold">
            My <span className="text-coral-red">Wishlist</span>
          </h1>
          <p className="text-gray-600 mt-2">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        
        {wishlistItems.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="text-gray-600 hover:text-red-600 transition-colors duration-200 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Wishlist Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {wishlistItems.map((product) => {
          const isAdding = addingItems.has(product.id);
          
          return (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100">
                <img 
                  src={product.imgURL} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Wishlist Button */}
                <div className="absolute top-3 right-3">
                  <WishlistButton product={product} size="medium" />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-slate-gray mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <img src={star} alt="star" className="w-4 h-4" />
                  <span className="text-sm text-gray-600">(4.5)</span>
                </div>
                
                {/* Price */}
                <p className="text-xl font-bold text-coral-red mb-4">
                  {product.price}
                </p>
                
                {/* Color Options Preview */}
                {product.colors && product.colors.length > 0 && (
                  <div className="flex gap-1 mb-4">
                    {product.colors.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 4}</span>
                    )}
                  </div>
                )}
                
                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={isAdding}
                  className={`w-full py-2.5 px-4 rounded-full font-semibold transition-all duration-200 ${
                    isAdding 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-coral-red text-white hover:bg-red-600 hover:shadow-md transform hover:-translate-y-0.5'
                  }`}
                >
                  {isAdding ? (
                    <div className='flex items-center justify-center gap-2'>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      Adding...
                    </div>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WishlistPage;