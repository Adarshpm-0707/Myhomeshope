import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div 
      onClick={handleClick}
      className="group bg-white rounded-2xl md:rounded-[2.5rem] border border-brand-beige overflow-hidden hover:shadow-card-3d transition-all duration-500 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-light">
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 md:top-5 md:left-5 bg-brand-brown text-white text-[8px] md:text-[10px] font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-widest shadow-lg">
            New Arrival
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-text/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="bg-white text-brand-text px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
            Add to Bag
          </div>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 md:p-8 flex-1 flex flex-col justify-between gap-3 md:gap-4">
        <div className="space-y-1 md:space-y-2">
          <p className="text-[8px] md:text-[10px] text-brand-brown font-bold uppercase tracking-[0.2em]">
            {product.category || 'Furniture'}
          </p>
          <h3 className="font-serif text-sm md:text-xl text-brand-text font-bold leading-tight line-clamp-1 group-hover:text-brand-brown transition-colors">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-brand-beige">
          <p className="font-serif text-base md:text-2xl text-brand-text font-bold">
            ₹{product.price}
          </p>
          <div className="w-8 h-8 md:w-12 md:h-12 bg-brand-light rounded-xl md:rounded-2xl flex items-center justify-center text-brand-brown group-hover:bg-brand-brown group-hover:text-white transition-all duration-300">
            <Plus size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
