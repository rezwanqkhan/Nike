import { useState, useEffect } from "react";
import { Nav } from "./components";
import {
  CustomerReviews,
  Footer,
  Hero,
  PopularProducts,
  Services,
  SpecialOffer,
  Subscribe,
  SuperQuality,
} from "./sections";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { ToastProvider } from "./contexts/ToastContext";
import ShoppingCart from "./components/ShoppingCart";
import WishlistPage from "./components/WishlistPage";
import ToastContainer from "./components/ToastContainer";

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'wishlist':
        return (
          <div className='min-h-screen bg-white'>
            <div className='padding-x pt-24 pb-8'>
              <button 
                onClick={() => window.location.hash = ''}
                className='mb-6 flex items-center gap-2 text-slate-gray hover:text-black transition-colors font-medium'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
                Back to Home
              </button>
              <WishlistPage />
            </div>
          </div>
        );
      default:
        return (
          <>
            <section className='xl:padding-l wide:padding-r padding-b'>
              <Hero />
            </section>
            <section className='padding'>
              <PopularProducts />
            </section>
            <section className='padding'>
              <SuperQuality />
            </section>
            <section className='padding-x py-10'>
              <Services />
            </section>
            <section className='padding'>
              <SpecialOffer />
            </section>
            <section className='bg-pale-blue padding'>
              <CustomerReviews />
            </section>
            <section className='padding-x sm:py-32 py-16 w-full'>
              <Subscribe />
            </section>
            <section className=' bg-black padding-x padding-t pb-8'>
              <Footer />
            </section>
          </>
        );
    }
  };

  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <main className='relative'>
            <Nav />
            {renderPage()}
            
            {/* Shopping Cart */}
            <ShoppingCart />
            
            {/* Toast Notifications */}
            <ToastContainer />
          </main>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
};

export default App;
