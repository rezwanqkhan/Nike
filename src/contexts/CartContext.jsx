import { createContext, useContext, useReducer, useEffect } from 'react';
import { useToast } from './ToastContext';

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  TOGGLE_CART: 'TOGGLE_CART'
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.selectedColor === action.payload.selectedColor &&
        item.selectedSize === action.payload.selectedSize
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id &&
            item.selectedColor === action.payload.selectedColor &&
            item.selectedSize === action.payload.selectedSize
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.cartId !== action.payload.cartId)
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.cartId === action.payload.cartId
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: []
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload
      };

    case CART_ACTIONS.TOGGLE_CART:
      return {
        ...state,
        isOpen: !state.isOpen
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  isOpen: false
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { showSuccess, showError } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nike-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nike-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Cart actions
  const addToCart = (product) => {
    try {
      const cartId = `${product.id}-${product.selectedColor || 'default'}-${product.selectedSize || 'default'}-${Date.now()}`;
      dispatch({ 
        type: CART_ACTIONS.ADD_ITEM, 
        payload: { ...product, cartId } 
      });
      showSuccess(`${product.name} added to cart!`);
    } catch (error) {
      showError('Failed to add item to cart');
    }
  };

  const removeFromCart = (cartId) => {
    try {
      const item = state.items.find(item => item.cartId === cartId);
      dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { cartId } });
      if (item) {
        showSuccess(`${item.name} removed from cart`);
      }
    } catch (error) {
      showError('Failed to remove item from cart');
    }
  };

  const updateQuantity = (cartId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { cartId, quantity } });
  };

  const clearCart = () => {
    try {
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
      showSuccess('Cart cleared successfully');
    } catch (error) {
      showError('Failed to clear cart');
    }
  };

  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  // Calculate totals
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getItemCount = (productId, selectedColor, selectedSize) => {
    const item = state.items.find(item => 
      item.id === productId && 
      item.selectedColor === selectedColor &&
      item.selectedSize === selectedSize
    );
    return item ? item.quantity : 0;
  };

  const value = {
    items: state.items,
    isOpen: state.isOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    getTotalItems,
    getTotalPrice,
    getItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;