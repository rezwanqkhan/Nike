import { star } from "../assets/icons";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import ProductModal from "./ProductModal";
import ImageZoom from "./ImageZoom";

import WishlistButton from "./WishlistButton";

const PopularProductCard = ({ imgURL, name, price, id, colors = [], sizes = [] }) => {
  const { addToCart, getItemCount } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleAddToCart = async () => {
    setIsAdding(true);
    
    const product = {
      id: id || name, // Use id if provided, otherwise fallback to name
      name,
      price,
      imgURL,
      rating: "4.5"
    };
    
    addToCart(product);
    
    // Brief animation delay
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };
  
  const itemCount = getItemCount(id || name);

  return (
    <div className='flex flex-1 flex-col w-full max-w-[320px] group'>
      <div className='relative overflow-hidden rounded-xl bg-gray-50'>
        <ImageZoom
          src={imgURL} 
          alt={name} 
          className='w-full h-[280px] sm:h-[300px] object-cover'
          containerClassName='w-full h-[280px] sm:h-[300px] rounded-xl'
          zoomScale={2}
        />
        
        {/* Quick Actions Overlay */}
        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
          <div className='flex gap-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300'>
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`px-4 py-2 bg-white text-slate-gray font-semibold rounded-full hover:bg-coral-red hover:text-white transition-colors duration-200 ${
                isAdding ? 'animate-pulse' : ''
              }`}
            >
              {isAdding ? 'Adding...' : 'Quick Add'}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className='px-4 py-2 bg-white text-slate-gray font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-200'
            >
              Quick View
            </button>
          </div>
        </div>
        
        {/* Wishlist Button */}
        <div className="absolute top-3 right-3">
          <WishlistButton 
            product={{ id, name, price, imgURL, colors, sizes }} 
            size="medium" 
          />
        </div>
        
        {/* Item Count Badge */}
        {itemCount > 0 && (
          <div className='absolute top-2 right-2 bg-coral-red text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center'>
            {itemCount}
          </div>
        )}
      </div>
      
      <div className='mt-8 flex justify-start gap-2.5'>
        <img src={star} alt='rating icon' width={24} height={24} />
        <p className='font-montserrat text-xl leading-normal text-slate-gray'>
          (4.5)
        </p>
      </div>
      <h3 className='mt-2 text-2xl leading-normal font-semibold font-palanquin'>
        {name}
      </h3>
      <p className='mt-2 font-semibold font-montserrat text-coral-red text-2xl leading-normal'>
        {price}
      </p>
      

      
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`mt-4 w-full py-3 px-6 rounded-full font-semibold transition-all duration-200 ${
          isAdding 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-coral-red text-white hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-0.5'
        }`}
      >
        {isAdding ? (
          <div className='flex items-center justify-center gap-2'>
            <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            Adding to Cart...
          </div>
        ) : (
          `Add to Cart ${itemCount > 0 ? `(${itemCount})` : ''}`
        )}
      </button>
      
      {/* Product Modal */}
      <ProductModal 
        product={{ id, name, price, imgURL, colors, sizes }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PopularProductCard;
