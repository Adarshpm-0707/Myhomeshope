import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const SAMPLE_PRODUCTS = [
  { name: 'Velvet Royal Sofa', price: 1299, category: 'Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000', isNew: true },
  { name: 'Minimalist Oak Chair', price: 245, category: 'Dining', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000', isNew: false },
  { name: 'Marbled Coffee Table', price: 450, category: 'Living Room', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000', isNew: true },
  { name: 'Geometric Floor Lamp', price: 180, category: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1000', isNew: false },
  { name: 'Golden Accent Mirror', price: 320, category: 'Decor', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1000', isNew: true },
  { name: 'Bohemian Area Rug', price: 580, category: 'Textiles', image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?auto=format&fit=crop&q=80&w=1000', isNew: false },
];

export default function Collection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Living Room', 'Dining', 'Lighting', 'Decor', 'Textiles'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const fetchedProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (fetchedProducts.length === 0) {
        // If DB is empty, show sample products and offer to seed
        setProducts(SAMPLE_PRODUCTS.map((p, i) => ({ ...p, id: `sample-${i}` })));
      } else {
        setProducts(fetchedProducts);
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
      // Fallback to sample data for preview
      setProducts(SAMPLE_PRODUCTS.map((p, i) => ({ ...p, id: `sample-${i}` })));
    } finally {
      setLoading(false);
    }
  };

  const seedData = async () => {
    try {
      setLoading(true);
      for (const product of SAMPLE_PRODUCTS) {
        await addDoc(collection(db, 'products'), product);
      }
      fetchProducts();
      alert('Sample products added to your Firebase!');
    } catch (error) {
      console.error("Error seeding data: ", error);
      alert('Failed to seed data. Make sure your Firebase config is correct and Firestore is enabled.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
        <div className="max-w-2xl">
          <p className="text-brand-brown font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3 md:mb-4">Our Catalog</p>
          <h1 className="font-serif text-3xl md:text-6xl text-brand-text font-bold mb-4 md:mb-6 leading-tight">
            The <span className="text-brand-brown">Collection</span>
          </h1>
          <p className="text-brand-muted text-sm md:text-lg leading-relaxed">
            Explore our curated selection of premium furniture and home decor designed to elevate your living space.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={seedData}
            className="text-[10px] md:text-xs font-bold text-brand-brown border-b-2 border-brand-brown/30 hover:border-brand-brown transition-all py-1 tracking-widest"
          >
            SEED SAMPLE DATA
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="mb-10 md:mb-16 flex flex-col lg:flex-row gap-6 md:gap-8 items-start lg:items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-3 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 md:px-8 py-2.5 md:py-3.5 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                filter === cat
                  ? 'bg-brand-brown text-white shadow-xl scale-105'
                  : 'bg-white text-brand-text hover:bg-brand-beige border border-brand-beige'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-72 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-brown transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 md:py-4 bg-white border border-brand-beige rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-brown/20 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 bg-white px-5 md:px-6 py-3 md:py-4 rounded-2xl border border-brand-beige text-xs md:text-sm font-bold text-brand-text hover:bg-brand-beige transition-all active:scale-95 shadow-sm">
            <SlidersHorizontal size={18} />
            <span className="hidden sm:inline">Sort</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[4/5] rounded-3xl product-shimmer" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20 md:py-32">
          <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-brand-muted" />
          </div>
          <p className="text-brand-muted text-lg font-serif">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
