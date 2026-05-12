import React from 'react';
import { Globe, MessageCircle, Share2, Users, Send, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Contact', path: '/contact' },
    { name: 'Cart', path: '/cart' }
  ];
  
  

  return (
    <footer className="relative bg-brand-text text-white pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-brown/50 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-brown/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-brown/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-brand-brown rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-brand-brown/20">
                <span className="text-2xl font-bold font-serif italic">M</span>
              </div>
              <h2 className="text-2xl font-bold font-serif tracking-tight">
                MyHome<span className="text-brand-brown">Shope</span>
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Redefining modern living through curated furniture and timeless design. Your home, our passion.
            </p>
            <div className="flex items-center gap-4">
              {[Globe, MessageCircle, Share2, Users].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#!" 
                  className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-brown hover:text-white transition-all duration-300 border border-white/10 hover:border-brand-brown"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-12">
            <h3 className="text-lg font-bold font-serif mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-brand-brown" /> Useful Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-brand-brown text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-brand-brown transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold font-serif mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-brand-brown" /> Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={18} className="text-brand-brown mt-1 flex-shrink-0" />
                <span>123 Design District, Modern Avenue, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={18} className="text-brand-brown flex-shrink-0" />
                <span>+1 (234) 567-8910</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={18} className="text-brand-brown flex-shrink-0" />
                <span>hello@myhomeshope.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold font-serif mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-brand-brown" /> Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Subscribe to get latest updates and exclusive offers.
            </p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-brand-brown transition-all pr-12 group-hover:border-white/20"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-brown rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} MyHomeShope. All rights reserved. Crafted with Passion.
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map(item => (
              <a key={item} href="#!" className="text-xs text-gray-500 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}