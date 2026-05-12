import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, MessageCircle, Globe, Share2 } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-[#FAF9F6] selection:bg-brand-brown selection:text-white pt-20">
      {/* ── HERO HEADER ── */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Office" 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-cream via-transparent to-brand-cream" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <p className="text-brand-brown font-bold text-xs uppercase tracking-[0.4em] mb-6">Contact Us</p>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-brand-text mb-8 leading-tight">
            Let's Start a <br />
            <span className="text-brand-brown italic">Conversation</span>
          </h1>
          <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about our collection or need help with a custom project, 
            our team of design experts is ready to assist you.
          </p>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-brand-beige shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center mb-8 text-brand-brown group-hover:bg-brand-brown group-hover:text-white transition-all duration-500">
                <Phone size={24} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-text mb-2">Phone Support</h3>
              <p className="text-brand-muted text-sm mb-6">Mon-Fri from 9am to 6pm.</p>
              <a href="tel:+1234567890" className="text-brand-brown font-bold text-lg hover:underline">+1 (234) 567-8910</a>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-brand-beige shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center mb-8 text-brand-brown group-hover:bg-brand-brown group-hover:text-white transition-all duration-500">
                <Mail size={24} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-text mb-2">Email Inquiries</h3>
              <p className="text-brand-muted text-sm mb-6">We respond within 24 hours.</p>
              <a href="mailto:hello@myhomeshope.com" className="text-brand-brown font-bold text-lg hover:underline">hello@myhomeshope.com</a>
            </div>

            <div className="bg-brand-text p-10 rounded-[3rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-brown/20 rounded-full -mr-16 -mt-16 blur-3xl" />
              <h3 className="text-2xl font-serif font-bold mb-6 relative z-10">Visit Our Studio</h3>
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <MapPin className="text-brand-brown shrink-0" size={20} />
                  <p className="text-gray-400 text-sm leading-relaxed">
                    123 Design District, Modern Avenue<br />
                    New York, NY 10001, USA
                  </p>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-brand-brown shrink-0" size={20} />
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Sat-Sun: 10am - 4pm<br />
                    (By Appointment Only)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-16 rounded-[4rem] border border-brand-beige shadow-2xl relative overflow-hidden">
             <div className="absolute top-10 right-10 opacity-5 text-brand-brown">
                <MessageSquare size={200} />
             </div>
             
             <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text mb-4">Send a <span className="text-brand-brown">Message</span></h2>
                <p className="text-brand-muted mb-12 max-w-lg">Fill out the form below and our design consultants will get back to you shortly.</p>
                
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-2">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full px-8 py-5 rounded-3xl border border-brand-beige focus:outline-none focus:ring-4 focus:ring-brand-brown/5 bg-brand-light/20 transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-2">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full px-8 py-5 rounded-3xl border border-brand-beige focus:outline-none focus:ring-4 focus:ring-brand-brown/5 bg-brand-light/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-2">Subject</label>
                    <select className="w-full px-8 py-5 rounded-3xl border border-brand-beige focus:outline-none focus:ring-4 focus:ring-brand-brown/5 bg-brand-light/20 transition-all appearance-none cursor-pointer">
                      <option>Product Inquiry</option>
                      <option>Custom Project</option>
                      <option>Shipping & Delivery</option>
                      <option>Partnership</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-2">Your Message</label>
                    <textarea 
                      rows="5" 
                      placeholder="Tell us about your requirements..." 
                      className="w-full px-8 py-5 rounded-3xl border border-brand-beige focus:outline-none focus:ring-4 focus:ring-brand-brown/5 bg-brand-light/20 transition-all"
                    ></textarea>
                  </div>

                  <button className="btn-3d w-full bg-brand-brown text-white py-6 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-2xl flex items-center justify-center gap-4 hover:bg-brand-brown-dark transition-all">
                    Send Message <Send size={20} />
                  </button>
                </form>
             </div>
          </div>
        </div>
      </section>



      {/* ── SOCIAL CONNECT ── */}
      <section className="bg-brand-text py-20 text-white text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl md:text-4xl font-serif font-bold mb-10">Connect with us on <span className="text-brand-brown">Social Media</span></h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: MessageCircle, label: 'Chat' },
              { icon: Share2, label: 'Share' },
              { icon: Globe, label: 'Website' }
            ].map((social, i) => (
              <a key={i} href="/" className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-brand-brown group-hover:border-brand-brown transition-all duration-500 scale-100 group-hover:scale-110">
                  <social.icon size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
