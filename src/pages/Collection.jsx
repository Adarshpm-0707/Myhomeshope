import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  PRODUCTS_CACHE_KEY,
  PRODUCT_IMAGE_COUNT,
  fallbackProducts,
  mergeLocalProducts,
} from '../data/products';

const FETCH_TIMEOUT_MS = 2500;

const getCachedProducts = () => {
  try {
    const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
    return cached ? mergeLocalProducts(JSON.parse(cached)) : null;
  } catch (error) {
    return null;
  }
};

const withTimeout = (promise) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Product request timed out')), FETCH_TIMEOUT_MS)
    ),
  ]);

export default function Collection() {
  const [products, setProducts] = useState(() => getCachedProducts() || fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category).filter(Boolean))],
    [products]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      const firebaseOptions = db.app?.options;
      const hasFirebaseConfig =
        firebaseOptions?.apiKey &&
        firebaseOptions.apiKey !== 'YOUR_API_KEY' &&
        firebaseOptions.projectId &&
        firebaseOptions.projectId !== 'YOUR_PROJECT_ID';

      if (!hasFirebaseConfig) {
        return;
      }

      setLoading(true);
      try {
        const q = query(collection(db, 'products'), orderBy('name'));
        const querySnapshot = await withTimeout(getDocs(q));
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (isMounted && fetchedProducts.length > 0) {
          const localImageProducts = mergeLocalProducts(fetchedProducts);
          setProducts(localImageProducts);
          localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(localImageProducts));
        }
      } catch (error) {
        console.warn("Using local products because Firebase products could not be loaded: ", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = filter === 'All' || product.category === filter;
      const matchesSearch =
        !normalizedSearch ||
        product.name?.toLowerCase().includes(normalizedSearch) ||
        product.description?.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [filter, products, searchTerm]);

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
            Explore all {PRODUCT_IMAGE_COUNT} furniture and decor images from the assets folder.
          </p>
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
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
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
      {loading && products.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-[4/5] rounded-2xl md:rounded-3xl product-shimmer" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
