import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './sections/Hero';
import Products from './sections/Products';
import Reviews from './sections/Reviews';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import OrderModal from './components/OrderModal';
import Admin from './sections/Admin';

// Creating a Landing Page component to keep App.jsx clean
const LandingPage = ({ onOpenOrder }) => (
  <>
    <Header />
    <Hero />
    <Products onOpenOrder={onOpenOrder} />
    <Reviews />
    <Footer />
  </>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      <div className="min-h-screen font-sans text-gray-900 selection:bg-amber-200 selection:text-amber-900">
        
        <Routes>
          {/* Main Website Route */}
          <Route 
            path="/" 
            element={<LandingPage onOpenOrder={(p) => setSelectedProduct(p)} />} 
          />

          {/* Admin Portal Route */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
        
        {/* Global Modal - Works across the site if needed */}
        {selectedProduct && (
          <OrderModal 
            product={selectedProduct} 
            isOpen={!!selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;