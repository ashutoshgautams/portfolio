'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

// Define the navigation links
const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Playground', path: '/playground' }
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check if the current path matches the link
  const isActive = (path: string): boolean => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path) || false;
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-gray-800 py-4 shadow-lg z-50 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 500 }}
                className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold"
              >
                3D
              </motion.div>
              <h1 className="text-2xl font-bold gradient-text">Code in 3D</h1>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`relative ${
                  isActive(link.path) 
                    ? 'text-white font-medium' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </nav>
          
          {/* Try It button - desktop */}
          <div className="hidden md:block">
            <Link href="/playground">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors">
                Try It Now
              </button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <nav className="flex flex-col space-y-4 pt-4 pb-6">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`${
                    isActive(link.path) 
                      ? 'text-white font-medium' 
                      : 'text-gray-300 hover:text-white'
                  } transition-colors px-2 py-1`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/playground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <button className="mt-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors">
                  Try It Now
                </button>
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
