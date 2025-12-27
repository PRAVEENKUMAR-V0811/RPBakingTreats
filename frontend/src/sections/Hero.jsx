import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Star, 
  Clock, 
  Heart, 
  ChevronRight, 
  CakeSlice, 
  Award, 
  Leaf 
} from 'lucide-react';

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#fffdfa] overflow-hidden pt-20">
      
      {/* Refined Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-50/50 -skew-x-12 translate-x-1/4 z-0" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          {/* Badge: Glassmorphism Style */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-amber-200 shadow-sm">
            <Award size={16} className="text-amber-600" />
            <span className="text-xs font-bold text-amber-900 uppercase tracking-[0.2em]">
              Premium Artisanal Bakery
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-black text-amber-950 leading-[1.1] mb-8">
            Taste the <br />
            <span className="text-amber-700 relative">
              Magic
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="none" className="text-amber-200" />
              </svg>
            </span> <br />
            of Cacao.
          </h1>

          <p className="text-lg md:text-xl text-amber-900/70 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Handcrafting moments of joy with organic ingredients and traditional recipes. 
            Your destination for the world's finest homemade chocolates.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
            <button 
              onClick={scrollToProducts}
              className="group bg-amber-800 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-amber-900 transition-all transform hover:-translate-y-1 cursor-pointer shadow-2xl shadow-amber-900/20"
            >
              <ShoppingBag size={20} />
              <span>Order Now</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex flex-col items-start gap-1">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img 
                      key={i} 
                      className="w-12 h-12 rounded-full border-4 border-[#fffdfa] object-cover" 
                      src={`https://i.pravatar.cc/100?u=bakery${i}`} 
                      alt="Customer" 
                    />
                  ))}
               </div>
               <div className="flex items-center gap-2 ml-1">
                 <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                 </div>
                 <span className="text-sm font-bold text-amber-900/80">1.2k+ Reviews</span>
               </div>
            </div>
          </div>

          {/* Icon Highlights Layout */}
          <div className="grid grid-cols-3 gap-8 mt-16 border-t border-amber-100 pt-10">
            <div className="group cursor-pointer">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-800 mb-4 group-hover:bg-amber-800 group-hover:text-white transition-colors duration-300">
                <Clock size={24} />
              </div>
              <p className="font-bold text-amber-950 text-sm">Fast Delivery</p>
              <p className="text-xs text-amber-800/50 mt-1">Within 24 Hours</p>
            </div>
            <div className="group cursor-pointer">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-800 mb-4 group-hover:bg-amber-800 group-hover:text-white transition-colors duration-300">
                <Leaf size={24} />
              </div>
              <p className="font-bold text-amber-950 text-sm">100% Organic</p>
              <p className="text-xs text-amber-800/50 mt-1">Natural Cocoa</p>
            </div>
            <div className="group cursor-pointer">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-800 mb-4 group-hover:bg-amber-800 group-hover:text-white transition-colors duration-300">
                <Heart size={24} />
              </div>
              <p className="font-bold text-amber-950 text-sm">Homemade</p>
              <p className="text-xs text-amber-800/50 mt-1">Baked with Love</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Image Showcase with Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Animated Glow behind the image */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-amber-400 blur-[100px] rounded-full z-0"
          />

          {/* Main Hero Image */}
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(120,53,15,0.3)] border-[16px] border-white transform lg:rotate-2 hover:rotate-0 transition-all duration-700 cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop" 
              alt="Artisan Chocolate Cake"
              className="w-full h-[500px] md:h-[650px] object-cover"
            />
          </div>

          {/* Floating Info Card 1 - Icon Based */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 z-20 bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-amber-100 flex items-center gap-4 cursor-pointer hover:bg-white transition-colors"
          >
            <div className="bg-amber-800 p-3 rounded-2xl text-white shadow-lg shadow-amber-900/30">
              <CakeSlice size={24} />
            </div>
            <div>
              <p className="text-sm font-black text-amber-950 leading-none">Signature Cake</p>
              <p className="text-[10px] font-bold text-amber-600 mt-1 tracking-wider uppercase">Dark Ganache</p>
            </div>
          </motion.div>

          {/* Floating Info Card 2 - Stats Based */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 z-20 bg-amber-950 p-6 rounded-[2rem] shadow-2xl text-white border border-white/10 hidden md:block cursor-pointer"
          >
             <div className="flex items-center gap-2 mb-1">
               <Star size={12} className="fill-amber-400 text-amber-400" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">Quality Certified</span>
             </div>
             <p className="text-3xl font-serif font-bold italic">Top Choice</p>
             <p className="text-[10px] mt-2 text-white/60">Winner of City Bakery Award 2024</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;