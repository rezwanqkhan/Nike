import { hamburger } from "../assets/icons";
import { headerLogo } from "../assets/images";
import { navLinks } from "../constants";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Nav = () => {
  const { toggleCart, getTotalItems } = useCart();
  const { getWishlistCount } = useWishlist();
  const totalItems = getTotalItems();
  const wishlistCount = getWishlistCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchResults = (results) => {
    // For now, just log the results. Later this can be used to filter the main product display
    console.log('Search results:', results);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
    <header className='px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 absolute z-10 w-full'>
      <nav className='flex justify-between items-center w-full max-w-screen-2xl mx-auto'>
        <a href='/'>
          <img
            src={headerLogo}
            alt='logo'
            width={129}
            height={29}
            className='m-0 w-[129px] h-[29px]'
          />
        </a>
        {/* Desktop Navigation */}
        <ul className='flex-1 flex justify-center items-center gap-8 xl:gap-16 max-lg:hidden'>
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className='font-montserrat leading-normal text-base xl:text-lg text-slate-gray hover:text-coral-red transition-colors duration-200'
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Search Bar - Desktop */}
        <div className='flex-1 max-w-xs xl:max-w-md mx-4 xl:mx-8 max-lg:hidden'>
          <SearchBar onSearchResults={handleSearchResults} />
        </div>
        <div className='flex items-center gap-3 xl:gap-6 text-base xl:text-lg leading-normal font-medium font-montserrat max-lg:hidden'>
          <div className='flex gap-2'>
            <a href='/' className='hover:text-coral-red transition-colors duration-200'>Sign in</a>
            <span>/</span>
            <a href='/' className='hover:text-coral-red transition-colors duration-200'>Explore now</a>
          </div>
          
          {/* Wishlist Icon */}
          <button
            onClick={() => window.location.href = '#wishlist'}
            className='relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
            title='Wishlist'
          >
            <svg className='w-6 h-6 text-slate-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
            </svg>
            {wishlistCount > 0 && (
              <span className='absolute -top-1 -right-1 bg-coral-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </button>
          
          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className='relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
          >
            <svg className='w-6 h-6 text-slate-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
            </svg>
            {totalItems > 0 && (
              <span className='absolute -top-1 -right-1 bg-coral-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className='hidden max-lg:flex items-center gap-2 sm:gap-3'>
          {/* Search Icon for Mobile */}
          <button className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'>
            <svg className='w-6 h-6 text-slate-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </button>
          
          {/* Wishlist Icon for Mobile */}
          <button
            onClick={() => window.location.href = '#wishlist'}
            className='relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
            title='Wishlist'
          >
            <svg className='w-6 h-6 text-slate-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
            </svg>
            {wishlistCount > 0 && (
              <span className='absolute -top-1 -right-1 bg-coral-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </button>
          
          <button
            onClick={toggleCart}
            className='relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
          >
            <svg className='w-6 h-6 text-slate-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
            </svg>
            {totalItems > 0 && (
              <span className='absolute -top-1 -right-1 bg-coral-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
          <button 
            onClick={toggleMobileMenu}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
          >
            <img src={hamburger} alt='hamburger icon' width={25} height={25} />
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile Menu Dropdown - Outside header for proper z-index layering */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay to block content behind */}
          <div 
            className='lg:hidden fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-[9999]'
            onClick={toggleMobileMenu}
          />
          
          {/* Menu Content */}
          <div className='lg:hidden fixed top-[72px] left-0 right-0 mx-4 bg-white shadow-2xl z-[10000] border border-gray-200 max-h-[calc(100vh-72px)] overflow-y-auto rounded-3xl'>
            <div className='px-4 py-4'>
            {/* Mobile Search Bar */}
            <div className='mb-4'>
              <SearchBar onSearchResults={handleSearchResults} />
            </div>
            
            {/* Mobile Navigation Links */}
            <ul className='space-y-3'>
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className='block py-2 font-montserrat text-base text-slate-gray hover:text-coral-red transition-colors duration-200'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Mobile Sign In / Explore */}
            <div className='mt-4 pt-4 border-t border-gray-200 flex gap-2 font-montserrat text-base'>
              <a 
                href='/' 
                className='hover:text-coral-red transition-colors duration-200'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in
              </a>
              <span>/</span>
              <a 
                href='/' 
                className='hover:text-coral-red transition-colors duration-200'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore now
              </a>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default Nav;
