import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CakeSlice, ShoppingCart, Lock } from 'lucide-react';
// import { Link } from 'react-router-dom'; // Uncomment if using React Router

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed w-full top-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-lg py-3 shadow-lg border-b border-amber-50' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-amber-800 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-md"><CakeSlice className="text-amber-50" size={24} /></div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-serif font-black text-amber-950 leading-none">RP Baking</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-700 mt-1">Treats</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-xs font-bold text-amber-900/70 hover:text-amber-900 transition-colors uppercase tracking-widest relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-800 transition-all group-hover:w-full" />
              </a>
            ))}
            
            {/* Admin Link - Subtle Icon */}
            <a href="/admin" title="Admin Login" className="p-2 text-amber-900/40 hover:text-amber-800 transition-colors cursor-pointer">
              <Lock size={18} />
            </a>

            <button className="flex items-center gap-2 bg-amber-950 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-amber-800 transition-all shadow-xl shadow-amber-950/20 active:scale-95 cursor-pointer">
              <ShoppingCart size={18} /> Order Now
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-amber-950 cursor-pointer">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden bg-white border-t border-amber-50 p-8 shadow-2xl">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl font-serif font-bold text-amber-950">{link.name}</a>
              ))}
              <hr className="border-amber-50" />
              <a href="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-amber-800 font-bold"><Lock size={18}/> Admin Portal</a>
              <button className="w-full bg-amber-950 text-white py-5 rounded-2xl font-black text-lg">Order Your Treat</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;