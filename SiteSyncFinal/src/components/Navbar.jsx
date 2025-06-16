import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Fractional CMO', path: '/fractional-cmo' },
    // { name: 'Our Verticals', path: '/verticals' },
    { name: 'Our Work', path: '/work' },
    // { name: 'News and Events', path: '/news-events' },
    // { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-b-3xl py-4 px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-red-600">10HEADS</span>
              <span className="text-2xl font-bold">MARKETING</span>
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-medium ${
                  location.pathname === link.path
                    ? 'text-orange-500 after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-orange-500'
                    : 'text-gray-700 hover:text-orange-500'
                } transition-colors`}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/admin"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Enquire Now Button */}
          <div className="hidden md:flex">
            <Link
              to="/enquiry"
              className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-orange-500 transition"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md mt-2 px-4 pb-4 rounded-b-2xl">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base font-medium py-2 ${
                  location.pathname === link.path
                    ? 'text-orange-500'
                    : 'text-gray-800 hover:text-orange-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-black text-white text-center px-4 py-2 rounded-full mt-2"
            >
              Enquire Now
            </Link>
            {user && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center text-blue-600 font-medium mt-2"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;