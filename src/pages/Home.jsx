import React, { useState, useEffect, useRef } from 'react';


/* ── Intersection Observer Hook ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── HERO ── */
export function Hero() {
  const [ref, vis] = useReveal();
  return (
    <section className="bg-brand-cream pb-8 md:pb-16 px-4 sm:px-6 lg:px-8 mt-24 md:mt-28">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`relative w-full h-[350px] sm:h-[450px] md:h-[550px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <img
            src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=80"
            alt="Modern bedroom"
            className="w-full h-full object-cover scale-105"
          />
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mb-6 md:mb-10 drop-shadow-xl font-serif">
              Elevating Homes with Modern,<br className="hidden sm:block" /> Elegant & Timeless Decor
            </h1>
            <button className="btn-3d bg-brand-brown text-white px-6 md:px-10 py-2.5 md:py-4 rounded-full font-semibold text-xs md:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">
              Learn More →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── LATEST FURNITURES ── */
const CATEGORIES = [
  { name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Office', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'Wardrobe', icon: 'M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M9 4v16 M15 4v16' },
  { name: 'Storage', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
  { name: 'Table', icon: 'M4 6h16M4 6v12m16-12v12M8 6v12m8-12v12' },
  { name: 'Chair', icon: 'M5 10v10m14-10v10m-14-6h14m-3-4V6a2 2 0 00-2-2H10a2 2 0 00-2 2v4' },
  { name: 'Sofa', icon: 'M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z M8 18v2M16 18v2' },
];

const PRODUCTS = [
  { id:1, name:'Wooden Stool', desc:'Comfortable and durable', price:'$120', img:'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80' },
  { id:2, name:'Cosy Armchair', desc:'Premium soft fabric', price:'$450', img:'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&q=80' },
  { id:3, name:'Wooden Table', desc:'Solid oak wood finish', price:'$250', img:'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=400&q=80' },
  { id:4, name:'Blue Chair', desc:'Modern ergonomic design', price:'$210', img:'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80' },
  { id:5, name:'Table Lamp', desc:'Warm light for reading', price:'$120', img:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80' },
  { id:6, name:'Soft Table', desc:'Round decorative piece', price:'$300', img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
];

export function LatestFurnitures() {
  const [activeCat, setActiveCat] = useState('Chair');
  const [ref, vis] = useReveal();

  return (
    <section ref={ref} className="bg-brand-beige py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col sm:flex-row items-center justify-between mb-10 gap-4 transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-text font-serif">Latest <span className="text-brand-brown">Furnitures</span></h2>
          <a href="#!" className="text-xs md:text-sm text-brand-brown font-semibold flex items-center gap-1 group hover:underline">
            View All Collection <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar - Horizontal scroll on mobile, vertical on desktop */}
          <div className="w-full lg:w-64 bg-brand-brown rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl flex-shrink-0">
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCat(cat.name)}
                  className={`flex items-center gap-3 md:gap-4 px-4 py-2.5 md:py-3.5 rounded-xl text-xs md:text-sm font-medium transition-all min-w-[120px] lg:w-full text-left whitespace-nowrap ${
                    activeCat === cat.name ? 'bg-white text-brand-brown shadow-lg scale-[1.02]' : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
                  </svg>
                  {cat.name}
                  {activeCat === cat.name && <span className="ml-auto hidden lg:block text-lg">›</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid - Responsive columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {PRODUCTS.map((p, i) => (
              <div key={p.id} className="card-3d bg-white rounded-[2rem] p-5 flex flex-col justify-between shadow-card hover:shadow-card-hover group cursor-pointer">
                <div className="w-full h-44 sm:h-40 bg-brand-light rounded-[1.5rem] mb-5 overflow-hidden flex items-center justify-center p-6 relative">
                  <img src={p.img} alt={p.name} className="object-contain h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="px-1 pb-1">
                  <h3 className="font-bold text-brand-text text-sm md:text-base mb-1">{p.name}</h3>
                  <p className="text-[11px] text-brand-muted mb-4 leading-relaxed">{p.desc}</p>
                  <div className="flex items-center justify-between border-t border-brand-beige pt-4">
                    <span className="font-bold text-brand-brown text-base md:text-lg">{p.price}</span>
                    <button className="w-8 h-8 md:w-10 md:h-10 bg-brand-brown text-white rounded-full flex items-center justify-center hover:bg-brand-brown-dark transition-all active:scale-90">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FEATURE BANNER ── */
export function FeatureBanner() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="bg-brand-cream py-16 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Arch Image - Floating animation */}
        <div className={`relative transition-all duration-1000 ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="w-64 h-80 sm:w-72 sm:h-96 bg-brand-beige rounded-t-[150px] rounded-b-3xl overflow-hidden flex items-center justify-center p-8 shadow-3d float-anim">
            <img
              src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"
              alt="Floor Lamp"
              className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl"
            />
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-accent/20 rounded-full blur-2xl animate-pulse" />
        </div>

        {/* Text - Responsive spacing */}
        <div className={`max-w-xl text-center lg:text-left transition-all duration-1000 delay-200 ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <span className="text-xs md:text-sm font-bold text-brand-brown tracking-widest uppercase mb-4 block">Our Commitment</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text leading-tight mb-6 font-serif">
            Elevating Homes with <span className="text-brand-brown italic">Modern,</span><br className="hidden md:block" />
            Elegant & Timeless Decor
          </h2>
          <p className="text-brand-muted text-sm md:text-base leading-relaxed mb-6">
            Curate your space with pieces that tell a story. Discover items crafted with passion and designed for comfort. Let your home express your unique style.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
            <button className="btn-3d bg-brand-brown text-white px-8 py-4 rounded-full font-semibold text-sm shadow-xl w-full sm:w-auto">
              Learn More →
            </button>
            <button className="text-brand-text font-bold text-sm hover:text-brand-brown transition-colors">
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
export function Testimonials() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="bg-[#fbf8f6] pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-[#f5ece8] rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
        {/* Testimonial Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10 transition-all duration-1000 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {[
            { name: 'Adam Zachary', role: 'Interior Designer', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'Sarah Mitchell', role: 'Home Owner', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { name: 'David Thompson', role: 'Architect', img: 'https://randomuser.me/api/portraits/men/67.jpg' }
          ].map((t, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-[#1a1b35] text-sm">{t.name}</h4>
                    <p className="text-[10px] text-gray-500">{t.role}</p>
                  </div>
                </div>
                <span className="text-[#7b4831] text-3xl font-serif">“</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                "Absolutely love the quality! The furniture I ordered exceeded all my expectations. The craftsmanship is superb and fits perfectly."
              </p>
            </div>
          ))}
        </div>

        {/* Sofa & Plant Image Showcase */}
        <div className={`relative flex justify-center items-end mt-10 transition-all duration-1000 delay-300 ${vis ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Plant on Stand */}
          <div className="absolute left-0 bottom-0 hidden lg:block">
            <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&q=80" alt="Plant on stand" className="w-48 h-auto mix-blend-multiply opacity-90" />
          </div>
          {/* White Sofa */}
          <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80" alt="White Sofa" className="w-[600px] object-contain drop-shadow-2xl z-10 rounded-xl" />
          
          {/* Dot Nav */}
          <div className="absolute right-0 bottom-1/2 translate-y-1/2 flex flex-col gap-2">
            <button className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-400 hover:text-[#1a1b35]">↑</button>
            <button className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-400 hover:text-[#1a1b35]">↓</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
const FAQS = [
  { q: 'How can I place my order?' },
  { q: 'Can I pay by installments?' },
  { q: 'What is the return policy?' },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  const [ref, vis] = useReveal();

  return (
    <section ref={ref} className="bg-[#fbf8f6] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className={`text-3xl font-bold text-center text-[#1a1b35] mb-12 transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Frequently Asked <span className="text-[#7b4831]">Questions</span> (FAQ)
        </h2>
        
        <div className="space-y-0">
          {FAQS.map((f, i) => (
            <div key={i} className={`border-b border-gray-200 transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <span className="text-sm font-semibold text-[#1a1b35]">{f.q}</span>
                <span className="text-gray-400 text-xl font-light">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${open === i ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We aim to provide a seamless experience. For this specific inquiry, our standard procedures guarantee your satisfaction with clear guidelines and dedicated support.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SALE BANNER ── */
export function SaleBanner() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-[#fbf8f6]">
      <div className="max-w-7xl mx-auto">
        <div className={`bg-[#f3f5f6] rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-12 transition-all duration-1000 ${vis ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="max-w-md">
            <p className="text-sm font-semibold text-[#1a1b35] mb-2">Sale Off</p>
            <h2 className="text-5xl font-bold text-[#1a1b35] mb-6">Decors</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Up to 40% off on our premium decor collection. Transform your space with handpicked items at unbeatable prices. Limited time offer!
            </p>
            <button className="bg-[#7b4831] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#633a27] transition-colors">
              Learn More
            </button>
          </div>
          
          <div className="relative w-full max-w-[300px] h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=500&q=80"
              alt="Decorative vases"
              className="absolute right-0 bottom-0 w-full h-full object-contain mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

