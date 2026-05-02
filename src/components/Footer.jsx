import React from 'react';

export default function Footer() {
  const quickLinks = ['Home', 'Shop', 'About Us', 'Portfolio', 'Collections'];
  const categories = ['Living Room', 'Bedroom', 'Office', 'Kitchen', 'Outdoor'];

  return (
    <footer className="relative overflow-hidden bg-brand-text text-white rounded-t-[2.5rem] md:rounded-t-[4rem] mt-12 pt-16 pb-8 px-4 sm:px-6 lg:px-16">
      {/* Decorative background orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-brand-brown/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-brown to-brand-accent rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg z-10">M</div>
              </div>
              <h2 className="font-serif font-bold text-xl text-white">
                MyHome<span className="text-brand-accent">Shope</span>
              </h2>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              Elevating homes with modern, elegant & timeless decor. Discover furniture that tells your story and transforms your space.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {['FB', 'IG', 'TW', 'LI'].map((social) => (
                <button
                  key={social}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-accent hover:bg-brand-accent/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-xs font-bold">{social}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:ml-auto">
            <h3 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#!" className="text-sm text-gray-400 hover:text-brand-accent transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-brand-accent transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="md:ml-auto">
            <h3 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">Categories</h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <a href="#!" className="text-sm text-gray-400 hover:text-brand-accent transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-brand-accent transition-all" />
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-6">Stay updated with the latest trends and exclusive offers.</p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-accent transition-colors"
              />
              <button className="bg-brand-brown hover:bg-brand-brown-dark text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg active:scale-95">
                Subscribe →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} MyHomeShope. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#!" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#!" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}