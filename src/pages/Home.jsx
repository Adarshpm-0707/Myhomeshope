import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Home as HomeIcon, 
  Briefcase, 
  Layout, 
  Archive, 
  Table as TableIcon, 
  Armchair, 
  Bed,
  ChevronRight,
  Plus,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[#FAF9F6] selection:bg-brand-brown selection:text-white pt-20">
      <Hero />
      <LatestFurnitures />
      <FeatureSection />
      <Testimonials />
      <FAQ />
      <SaleBanner />
    </div>
  );
}

/* ── Animation Hook ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

/* ── 1. HERO SECTION ── */
function Hero() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="px-4 md:px-8 py-4 md:py-8">
      <div className={`relative max-w-7xl mx-auto h-[350px] md:h-[600px] rounded-[2.5rem] md:rounded-[5rem] overflow-hidden transition-all duration-1000 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <img 
          src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Bedroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 md:px-12">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white max-w-4xl mb-6 md:mb-10 leading-tight drop-shadow-2xl">
            Elevating Homes with <br className="hidden sm:block" /> Modern, Elegant & Timeless Decor
          </h1>
          <button className="bg-brand-brown hover:bg-brand-brown-dark text-white px-8 md:px-12 py-3 md:py-4 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── 2. LATEST FURNITURES ── */
function LatestFurnitures() {
  const [activeCat, setActiveCat] = useState('Home');
  const [ref] = useReveal();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const categories = [
    { name: 'Home', icon: HomeIcon },
    { name: 'Office', icon: Briefcase },
    { name: 'Wardrobe', icon: Layout },
    { name: 'Storage', icon: Archive },
    { name: 'Table', icon: TableIcon },
    { name: 'Chair', icon: Armchair },
    { name: 'Sofa', icon: Bed },
  ];

  const products = [
    { id: 1, name: 'Wooden Stool', price: 1200, category: 'Chair', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80' },
    { id: 2, name: 'Grey Armchair', price: 4500, category: 'Chair', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&q=80' },
    { id: 3, name: 'Bedside Table', price: 2500, category: 'Table', image: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=400&q=80' },
    { id: 4, name: 'Light Chair', price: 2100, category: 'Chair', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80' },
    { id: 5, name: 'Table Lamp', price: 1200, category: 'Home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80' },
    { id: 6, name: 'Soft Desk', price: 3000, category: 'Table', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
  ];

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 md:mb-16 gap-4">
        <h2 className="text-2xl md:text-4xl font-bold text-brand-text">Latest Furnitures</h2>
        <Link to="/collection" className="text-brand-text font-bold text-[10px] md:text-sm flex items-center gap-2 hover:text-brand-brown transition-colors uppercase tracking-widest">
          More Furniture <ArrowRight size={14} />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
        {/* Sidebar - Scrollable on mobile */}
        <div className="w-full lg:w-64 bg-brand-brown rounded-2xl md:rounded-[2.5rem] p-3 md:p-6 flex flex-row lg:flex-col gap-2 md:gap-4 overflow-x-auto no-scrollbar shadow-xl lg:shadow-2xl">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCat(cat.name)}
              className={`flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-sm font-bold transition-all min-w-[110px] lg:w-full whitespace-nowrap ${
                activeCat === cat.name ? 'bg-white text-brand-brown shadow-lg' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <cat.icon size={20} />
              {cat.name}
              {activeCat === cat.name && <ChevronRight className="ml-auto hidden lg:block" size={18} />}
            </button>
          ))}
        </div>

        {/* Product Grid - 2 columns on mobile */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-10">
          {products.map((p) => (
            <div 
              key={p.id} 
              onClick={() => { addToCart(p); navigate('/cart'); }}
              className="bg-white rounded-[1.5rem] md:rounded-[3rem] p-3 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-brand-beige flex flex-col h-full"
            >
              <div className="aspect-square bg-brand-light rounded-[1.2rem] md:rounded-[2.5rem] overflow-hidden mb-4 md:mb-8 flex items-center justify-center p-4 md:p-12 relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="px-1 md:px-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-brand-text text-sm md:text-xl mb-1 md:mb-3 line-clamp-1">{p.name}</h3>
                  <p className="text-brand-muted text-[8px] md:text-xs mb-3 md:mb-6 leading-relaxed line-clamp-2">
                    Premium quality furniture designed for your modern home sanctuary...
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 md:pt-6 border-t border-brand-beige">
                  <span className="font-bold text-brand-text text-base md:text-2xl">₹{p.price}</span>
                  <button className="w-8 h-8 md:w-12 md:h-12 bg-brand-light rounded-lg md:rounded-xl flex items-center justify-center text-brand-brown hover:bg-brand-brown hover:text-white transition-all active:scale-90">
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3. FEATURE SECTION ── */
function FeatureSection() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
        <div className={`w-full lg:w-1/2 transition-all duration-1000 ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="relative aspect-[3/4] max-w-[280px] md:max-w-md mx-auto rounded-full overflow-hidden border-[10px] md:border-[20px] border-brand-beige shadow-3d">
            <img 
              src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80" 
              alt="Luxury Lamp" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className={`w-full lg:w-1/2 text-center lg:text-left transition-all duration-1000 delay-300 ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <h2 className="text-2xl md:text-6xl font-bold text-brand-text mb-6 md:mb-10 leading-tight">
            Elevating Homes with <br className="hidden md:block" /> <span className="text-brand-brown">Modern</span>, Elegant & Timeless Decor
          </h2>
          <p className="text-brand-muted text-sm md:text-lg mb-6 md:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-brand-muted text-xs md:text-base mb-10 leading-relaxed italic border-l-4 border-brand-brown pl-4 text-left max-w-xl mx-auto lg:mx-0">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
          </p>
          <button className="bg-brand-brown hover:bg-brand-brown-dark text-white px-10 py-3.5 md:py-4 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── 4. TESTIMONIALS SECTION ── */
function Testimonials() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32">
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-16 md:mb-32 transition-all duration-1000 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {[
          { name: 'Mick Presley', role: 'Home Owner' },
          { name: 'Melisandra Well', role: 'Designer' },
          { name: 'Adrena Woodara', role: 'Architect' }
        ].map((t, i) => (
          <div key={i} className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-brand-beige shadow-sm hover:shadow-xl transition-all">
             <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-brand-light" />
                <div>
                  <h4 className="font-bold text-xs md:text-lg text-brand-text">{t.name}</h4>
                  <p className="text-[8px] md:text-[10px] text-brand-muted uppercase tracking-widest font-bold">{t.role}</p>
                </div>
                <div className="ml-auto text-brand-brown opacity-20">
                  <Quote size={32} />
                </div>
             </div>
             <p className="text-[10px] md:text-sm text-brand-muted leading-relaxed">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
             </p>
          </div>
        ))}
      </div>

      <div className={`relative transition-all duration-1000 delay-500 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="absolute -top-16 md:-top-32 left-0 hidden lg:block">
           <img src="https://images.unsplash.com/photo-1581572803900-33bc9627607a?w=400&q=80" alt="Plant" className="w-32 md:w-56 h-auto object-contain" />
        </div>
        <img 
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&q=80" 
          alt="White Luxury Sofa" 
          className="w-full h-auto object-contain max-w-5xl mx-auto drop-shadow-3d px-4"
        />
      </div>
    </section>
  );
}

const Quote = ({ size, md: mdSize, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M14.017 21L14.017 18C14.017 16.8954 14.9125 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9125 23 14.017 22.1046 14.017 21ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21C10 22.1046 9.10457 23 8 23H5C3.89543 23 3 22.1046 3 21ZM16.017 16V13C16.017 10.2386 18.2556 8 21.017 8V5C16.5987 5 13.017 8.58172 13.017 13V16H16.017ZM5 16V13C5 10.2386 7.23858 8 10 8V5C5.58172 5 2 8.58172 2 13V16H5Z"/></svg>
);

/* ── 5. FAQ SECTION ── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: 'How can I pay for my order?', a: 'We accept all major credit cards, UPI, and bank transfers.' },
    { q: 'Can I pay by bank transfer?', a: 'Yes, please select the bank transfer option during checkout.' },
    { q: 'What is Amazon Pay?', a: 'Amazon Pay is a secure payment method that uses your Amazon account details.' }
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 py-16 md:py-32">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-brand-text mb-10 md:mb-20">
        Frequently Asked <br className="md:hidden" /> <span className="text-brand-brown">Questions</span> (FAQ)
      </h2>
      <div className="space-y-2 md:space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-brand-beige">
            <button 
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-5 md:py-8 text-left group"
            >
              <span className="text-xs md:text-lg font-bold text-brand-text group-hover:text-brand-brown transition-colors">{f.q}</span>
              <span className={`text-brand-muted text-xl md:text-3xl transition-transform duration-300 ${open === i ? 'rotate-45 text-brand-brown' : ''}`}>+</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40 pb-6 md:pb-10' : 'max-h-0'}`}>
              <p className="text-[10px] md:text-base text-brand-muted leading-relaxed">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 6. SALE BANNER ── */
function SaleBanner() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
      <div className={`bg-brand-beige rounded-[2.5rem] md:rounded-[5rem] p-8 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 transition-all duration-1000 ${vis ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="max-w-md text-center md:text-left">
          <p className="text-brand-brown font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 md:mb-6">Sale Off</p>
          <h2 className="text-4xl md:text-7xl font-bold text-brand-text mb-6 md:mb-12 leading-tight">Decors</h2>
          <p className="text-brand-muted text-sm md:text-lg mb-10 md:mb-16 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-brand-brown hover:bg-brand-brown-dark text-white px-10 py-3 md:py-4 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95">
            Learn More
          </button>
        </div>
        <div className="relative w-full max-w-[280px] md:max-w-md">
          <img 
            src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=800&q=80" 
            alt="Vases" 
            className="w-full h-auto object-contain drop-shadow-3d scale-110 md:scale-125"
          />
        </div>
      </div>
    </section>
  );
}
