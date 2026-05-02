import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Hero, LatestFurnitures, FeatureBanner, Testimonials, FAQ, SaleBanner } from './pages/Home';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Navbar />
      <div className="flex-1">
        <Hero />
        <LatestFurnitures />
        <FeatureBanner />
        <Testimonials />
        <FAQ />
        <SaleBanner />
      </div>
      <Footer />
    </div>
  );
}

export default App;
