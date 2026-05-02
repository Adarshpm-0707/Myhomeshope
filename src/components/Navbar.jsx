import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const menuRef = useRef(null);

  const navLinks = ['Home', 'Shop', 'About', 'Portfolio', 'Collections'];

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
             <div className="relative w-8 h-8 md:w-10 md:h-10">
              <div
                className="absolute inset-0 bg-gradient-to-br from-brand-brown to-brand-accent rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-500"
              />
              <div
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-base md:text-lg z-10 group-hover:scale-110 transition-transform duration-300"
              >
                M
              </div>
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg md:text-xl text-brand-text leading-none">
                MyHome
                <span className="text-brand-brown">Shope</span>
              </h1>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setActiveLink(link)}
                className={`text-sm font-medium transition-all duration-300 relative group py-2 ${
                  activeLink === link
                    ? 'text-brand-brown'
                    : 'text-brand-text hover:text-brand-brown'
                }`}
              >
                {link}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-brown transition-all duration-300 ${activeLink === link ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3 md:gap-4">
             <button className="hidden sm:flex btn-3d bg-brand-brown text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold hover:bg-brand-brown-dark shadow-lg">
              Get Started →
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`block w-6 h-0.5 bg-brand-text transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-brand-text transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-brand-text transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-4 shadow-xl border border-brand-beige">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => { setActiveLink(link); setIsMobileMenuOpen(false); }}
                className={`text-left text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                  activeLink === link
                    ? 'bg-brand-brown text-white'
                    : 'text-brand-text hover:bg-brand-beige hover:text-brand-brown'
                }`}
              >
                {link}
              </button>
            ))}
            <button className="bg-brand-brown text-white px-6 py-3 rounded-xl text-sm font-semibold mt-2 shadow-lg">
              Get Started →
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}