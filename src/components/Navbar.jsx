import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const { cartCount } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (e, path) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      const id = path.substring(2);
      if (location.pathname === '/') {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = path;
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-lg py-2 md:py-3'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group cursor-pointer">
             <div className="relative w-8 h-8 md:w-12 md:h-12">
              <div
                className="absolute inset-0 bg-brand-brown rounded-xl md:rounded-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-brand-brown/20"
              />
              <div
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-base md:text-2xl z-10 font-serif italic"
              >
                M
              </div>
            </div>
            <div>
              <h1 className="font-serif font-bold text-base md:text-2xl text-brand-text leading-none tracking-tight">
                MyHome<span className="text-brand-brown">Shope</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group py-2 ${
                  isActive(link.path)
                    ? 'text-brand-brown'
                    : 'text-brand-text hover:text-brand-brown'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-brown transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          {/* CTA & Icons */}
          <div className="flex items-center gap-2 md:gap-6">
            <Link 
              to="/cart" 
              className="relative p-2 text-brand-text hover:text-brand-brown transition-all hover:scale-110 active:scale-95"
            >
              <ShoppingBag size={22} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 md:w-5 md:h-5 bg-brand-brown text-white text-[8px] md:text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-brand-cream shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button className="hidden sm:flex bg-brand-text text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-brown transition-all shadow-lg active:scale-95">
              Sign In
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex p-2 text-brand-text hover:text-brand-brown transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white rounded-3xl p-6 flex flex-col gap-2 shadow-2xl border border-brand-beige">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`text-left text-xs font-bold uppercase tracking-widest py-4 px-5 rounded-2xl transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-brand-brown text-white shadow-xl'
                    : 'text-brand-text hover:bg-brand-light'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-brand-beige w-full my-3" />
            <button className="bg-brand-text text-white px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}