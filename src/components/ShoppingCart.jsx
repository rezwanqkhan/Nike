import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import { star } from '../assets/icons';

const ShoppingCart = () => {
  const { 
    items, 
    isOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    toggleCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();
  
  const [isAnimating, setIsAnimating] = useState(false);

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
    } else {
      updateQuantity(cartId, newQuantity);
    }
  };

  const handleRemoveItem = (cartId) => {
    setIsAnimating(true);
    setTimeout(() => {
      removeFromCart(cartId);
      setIsAnimating(false);
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={toggleCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        {/* Cart Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-slate-gray">
            Shopping Cart ({getTotalItems()})
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center flex-col p-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-gray mb-2">Your cart is empty</h3>
              <p className="text-gray-500 text-center">Add some products to get started!</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div 
                    key={item.cartId} 
                    className={`bg-white border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                      isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.imgURL} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-gray truncate">{item.name}</h4>
                        <p className="text-coral-red font-bold text-lg">{item.price}</p>
                        
                        {/* Variants */}
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          {item.selectedColor && (
                            <span>Color: {item.selectedColor}</span>
                          )}
                          {item.selectedSize && (
                            <span>Size: {item.selectedSize}</span>
                          )}
                        </div>
                        
                        {/* Rating */}
                        {item.rating && (
                          <div className="flex items-center gap-1 mt-1">
                            <img src={star} alt="star" className="w-4 h-4" />
                            <span className="text-sm text-slate-gray">({item.rating})</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="font-semibold text-slate-gray min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.cartId)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Cart Footer */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Total */}
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-coral-red">${getTotalPrice().toFixed(2)}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-coral-red text-white py-3 rounded-full font-semibold hover:bg-red-600 transition-colors duration-200">
                    Checkout
                  </button>
                  <button 
                    onClick={clearCart}
                    className="w-full border border-gray-300 text-slate-gray py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;