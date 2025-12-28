import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Clock, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://rpbakingtreats.onrender.com';

const Products = ({ onOpenOrder }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from MongoDB
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      // Ensure data is an array
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="products" className="py-24 px-6 bg-[#fffcf9]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="h-[1px] w-8 bg-amber-300"></div>
            <span className="text-amber-700 font-bold tracking-[0.2em] text-xs uppercase">Premium Menu</span>
            <div className="h-[1px] w-8 bg-amber-300"></div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-black text-amber-950 mb-6">
            Signature Creations from <br /> 
            <span className="text-amber-800">RP Baking Treats</span>
          </h2>
          <p className="max-w-xl mx-auto text-amber-900/60 leading-relaxed font-medium">
            Explore our collection of freshly baked wonders, crafted daily with the finest ingredients to satisfy your sweet cravings.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-amber-800/40">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-bold tracking-widest uppercase text-xs">Preparing the Menu...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-amber-200">
             <p className="text-amber-900/40 italic">Our kitchen is busy preparing new treats. Check back soon!</p>
          </div>
        ) : (
          /* Products Grid (DYNAMIC) */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {products.map((product) => (
              <motion.div 
                key={product._id} // Using MongoDB _id
                variants={itemVariants}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-amber-50"
              >
                {/* Image Container */}
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={product.image} // Cloudinary URL from DB
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Floating Category Tag */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                     <p className="text-[10px] font-black text-amber-900 uppercase tracking-tighter">{product.category}</p>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-amber-950 text-white px-4 py-2 rounded-2xl font-bold shadow-xl flex items-center whitespace-nowrap">
                    ₹ {Number(product.price).toFixed(2)}/-
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-amber-950 group-hover:text-amber-800 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  
                  <p className="text-amber-900/60 text-sm mb-8 leading-relaxed line-clamp-2">
                    {product.desc}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-amber-50">
                     <div className="flex items-center gap-2 text-amber-700/50">
                        <Clock size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Fresh Daily</span>
                     </div>
                     
                     <button 
                      onClick={() => onOpenOrder(product)}
                      className="flex items-center gap-2 bg-amber-100/50 text-amber-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-amber-800 hover:text-white transition-all duration-300 cursor-pointer group/btn"
                    >
                      Order Now
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom Call to Action */}
        <div className="mt-20 text-center">
          <p className="text-amber-900/40 text-sm font-medium italic">
            * Custom designs and bulk orders available on request.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Products;