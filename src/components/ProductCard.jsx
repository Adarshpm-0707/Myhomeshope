import React from 'react';
import { Plus, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const fallbackImage = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80';

  const handleClick = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div 
      onClick={handleClick}
      className="group bg-white rounded-2xl md:rounded-[2rem] border border-brand-beige overflow-hidden hover:shadow-3d-hover transition-all duration-500 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-light">
        <img
          src={product.image || fallbackImage}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-brand-brown text-white text-[8px] md:text-[9px] font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-widest shadow-lg z-10">
            New Arrival
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-text/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm text-brand-text px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl border border-white/50">
            Add to Bag
          </div>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 md:p-6 flex-1 flex flex-col justify-between gap-3 md:gap-4">
        <div className="space-y-1 md:space-y-2">
          <div className="flex justify-between items-start">
            <p className="text-[8px] md:text-[9px] text-brand-brown font-bold uppercase tracking-[0.2em]">
              {product.category || 'Furniture'}
            </p>
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-brand-accent text-brand-accent" />
                <span className="text-[10px] font-bold text-brand-text">{product.rating}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-serif text-sm md:text-lg text-brand-text font-bold leading-tight line-clamp-1 group-hover:text-brand-brown transition-colors">
              {product.name}
            </h3>
            <p className="text-[10px] text-brand-muted line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-brand-beige">
          <div className="space-y-0">
            <p className="text-[9px] text-brand-muted font-medium uppercase tracking-wider">Price</p>
            <p className="font-serif text-base md:text-xl text-brand-text font-bold">
              ₹{product.price}
            </p>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-light rounded-xl md:rounded-2xl flex items-center justify-center text-brand-brown group-hover:bg-brand-brown group-hover:text-white transition-all duration-300 shadow-sm">
            <Plus size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
