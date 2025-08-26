import { createContext, useContext, useReducer, useEffect } from 'react';
import { useToast } from './ToastContext';

// Wishlist Actions
const WISHLIST_ACTIONS = {
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
  CLEAR_WISHLIST: 'CLEAR_WISHLIST',
  LOAD_WISHLIST: 'LOAD_WISHLIST'
};

// Wishlist Reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case WISHLIST_ACTIONS.ADD_TO_WISHLIST:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    
    case WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    
    case WISHLIST_ACTIONS.CLEAR_WISHLIST:
      return {
        ...state,
        items: []
      };
    
    case WISHLIST_ACTIONS.LOAD_WISHLIST:
      return {
        ...state,
        items: action.payload
      };
    
    default:
      return state;
  }
};

// Initial State
const initialState = {
  items: []
};

// Create Context
const WishlistContext = createContext();

// Wishlist Provider Component
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { showSuccess, showError, showInfo } = useToast();

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('nike-wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({ type: WISHLIST_ACTIONS.LOAD_WISHLIST, payload: parsedWishlist });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nike-wishlist', JSON.stringify(state.items));
  }, [state.items]);

  // Add item to wishlist
  const addToWishlist = (product) => {
    try {
      const isAlreadyInWishlist = state.items.some(item => item.id === product.id);
      if (!isAlreadyInWishlist) {
        dispatch({ type: WISHLIST_ACTIONS.ADD_TO_WISHLIST, payload: product });
        showSuccess(`${product.name} added to wishlist!`);
        return true; // Successfully added
      } else {
        showInfo(`${product.name} is already in your wishlist`);
        return false; // Already in wishlist
      }
    } catch (error) {
      showError('Failed to add item to wishlist');
      return false;
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    try {
      const item = state.items.find(item => item.id === productId);
      dispatch({ type: WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST, payload: { id: productId } });
      if (item) {
        showSuccess(`${item.name} removed from wishlist`);
      }
    } catch (error) {
      showError('Failed to remove item from wishlist');
    }
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    try {
      dispatch({ type: WISHLIST_ACTIONS.CLEAR_WISHLIST });
      showSuccess('Wishlist cleared successfully');
    } catch (error) {
      showError('Failed to clear wishlist');
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Get wishlist item count
  const getWishlistCount = () => {
    return state.items.length;
  };

  const value = {
    wishlistItems: state.items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;