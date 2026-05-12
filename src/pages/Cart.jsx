import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, MapPin, Phone, User, Mail, CreditCard, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(0); // 0: Cart, 1: Checkout Form

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 px-4 text-center min-h-screen flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-brand-beige rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-brand-brown/50" />
        </div>
        <h2 className="font-serif text-3xl text-brand-text font-bold mb-4">Your bag is empty</h2>
        <p className="text-brand-muted mb-8 max-w-xs mx-auto">
          It looks like you haven't added any items to your collection yet.
        </p>
        <Link 
          to="/collection" 
          className="btn-3d bg-brand-brown text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2"
        >
          Browse Collection <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Progress Tracker */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
        <div className={`flex items-center gap-2 ${step >= 0 ? 'text-brand-brown' : 'text-brand-muted'}`}>
          <span className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:font-bold border-2 ${step >= 0 ? 'border-brand-brown bg-brand-brown text-white' : 'border-brand-beige text-brand-muted'}`}>1</span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Cart</span>
        </div>
        <div className="h-px w-6 md:w-8 bg-brand-beige" />
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand-brown' : 'text-brand-muted'}`}>
          <span className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:font-bold border-2 ${step >= 1 ? 'border-brand-brown bg-brand-brown text-white' : 'border-brand-beige text-brand-muted'}`}>2</span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Shipping</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {step === 0 ? (
          <>
            {/* Cart Items */}
            <div className="flex-1 space-y-4 md:space-y-6">
              <h1 className="font-serif text-2xl md:text-4xl text-brand-text font-bold mb-4">
                Your Shopping <span className="text-brand-brown">Bag</span>
              </h1>
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 md:gap-6 p-3 md:p-4 bg-white rounded-2xl md:rounded-3xl border border-brand-beige group hover:shadow-card transition-all duration-300"
                >
                  <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-xl md:rounded-2xl overflow-hidden bg-brand-light flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">
                          {item.category}
                        </p>
                        <h3 className="font-serif text-sm md:text-xl text-brand-text font-bold leading-tight">
                          {item.name}
                        </h3>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 md:p-2 text-brand-muted hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3 md:gap-4 bg-brand-light px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-brand-beige">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-brand-brown transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-xs md:text-sm w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-brand-brown transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-serif text-base md:text-xl text-brand-brown font-bold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <button 
                onClick={clearCart}
                className="text-xs font-bold text-brand-muted hover:text-brand-brown flex items-center gap-2 transition-colors ml-2"
              >
                Clear Bag
              </button>
            </div>

            {/* Summary */}
            <div className="w-full lg:w-96">
              <div className="glass p-6 md:p-8 rounded-3xl border border-brand-beige shadow-xl sticky top-32">
                <h2 className="font-serif text-xl md:text-2xl text-brand-text font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 md:space-y-4 mb-6">
                  <div className="flex justify-between text-brand-muted text-sm md:text-base">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-brand-muted text-sm md:text-base">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-brand-muted text-sm md:text-base">
                    <span>Tax</span>
                    <span>₹{(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-brand-beige w-full my-4" />
                  <div className="flex justify-between text-brand-text font-bold text-lg md:text-xl">
                    <span>Total</span>
                    <span className="text-brand-brown">₹{(cartTotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(1)}
                  className="btn-3d w-full bg-brand-brown text-white py-3.5 md:py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-brown/40"
                >
                  Proceed to Checkout <ArrowRight size={20} />
                </button>

                <div className="mt-6 flex flex-col items-center gap-3">
                  <p className="text-[8px] md:text-[10px] text-brand-muted font-bold tracking-widest uppercase">
                    Secure Checkout Powered by Stripe
                  </p>
                  <div className="flex gap-2 md:gap-3 opacity-50 grayscale">
                    <div className="w-6 md:w-8 h-4 md:h-5 bg-brand-text rounded-sm" />
                    <div className="w-6 md:w-8 h-4 md:h-5 bg-brand-text rounded-sm" />
                    <div className="w-6 md:w-8 h-4 md:h-5 bg-brand-text rounded-sm" />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Checkout Form */}
            <div className="flex-1 order-2 lg:order-1">
              <button 
                onClick={() => setStep(0)}
                className="flex items-center gap-2 text-xs md:text-sm font-bold text-brand-brown mb-6 md:mb-8 hover:-translate-x-1 transition-transform"
              >
                <ChevronLeft size={18} /> Back to Bag
              </button>
              
              <h1 className="font-serif text-2xl md:text-4xl text-brand-text font-bold mb-4">
                Shipping <span className="text-brand-brown">Details</span>
              </h1>
              
              <form className="space-y-4 md:space-y-6 mt-6 md:mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/40" size={18} />
                      <input type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-brown/20 bg-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/40" size={18} />
                      <input type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-brown/20 bg-white" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/40" size={18} />
                    <input type="tel" placeholder="+91 00000 00000" className="w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-brown/20 bg-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-1">Shipping Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3 md:top-4 text-brand-brown/40" size={18} />
                    <textarea rows="3" placeholder="123 Luxury Ave, Design District..." className="w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-brown/20 bg-white"></textarea>
                  </div>
                </div>

                <div className="pt-4 pb-8 lg:pb-0">
                  <button 
                    type="button"
                    onClick={() => {
                      alert('Order Placed Successfully!');
                      clearCart();
                      window.location.href = '/';
                    }}
                    className="btn-3d w-full bg-brand-brown text-white py-4 md:py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-brand-brown/40 text-base md:text-lg"
                  >
                    Complete Order & Pay <CreditCard size={22} />
                  </button>
                </div>
              </form>
            </div>

            {/* Side Summary Mini */}
            <div className="w-full lg:w-80 order-1 lg:order-2">
              <div className="bg-white p-6 rounded-3xl border border-brand-beige shadow-sm sticky top-32">
                <h3 className="font-bold text-brand-text mb-4 uppercase tracking-widest text-[10px]">Order Details</h3>
                <div className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-xs md:text-sm">
                      <span className="text-brand-muted line-clamp-1">{item.quantity}x {item.name}</span>
                      <span className="font-bold whitespace-nowrap">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-brand-beige w-full my-4" />
                <div className="flex justify-between text-brand-text font-bold text-sm md:text-base">
                  <span>Grand Total</span>
                  <span className="text-brand-brown">₹{(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
