import React from 'react';
import { motion } from 'framer-motion';
import { CakeSlice, Sparkles } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fffdfa]">
      
      {/* Decorative Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-64 h-64 bg-amber-200/40 rounded-full blur-[80px]"
      />

      <div className="relative flex flex-col items-center">
        
        {/* Animated Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-8 border-t-2 border-b-2 border-amber-800/20 rounded-full"
        />

        {/* Central Icon Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.1, 1],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 bg-amber-800 p-6 rounded-3xl shadow-2xl shadow-amber-900/30 text-white"
        >
          <CakeSlice size={48} strokeWidth={1.5} />
          
          {/* Sparkle Icons */}
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-2 -right-2 text-amber-400"
          >
            <Sparkles size={20} fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Brand Name Animation */}
        <div className="mt-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-serif font-black text-amber-950 tracking-tight"
          >
            RP Baking Treats
          </motion.h1>
          
          <div className="flex items-center justify-center gap-2 mt-3">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[1px] bg-amber-800/30"
            />
            <motion.p 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-800"
            >
              Baking Wonders
            </motion.p>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[1px] bg-amber-800/30"
            />
          </div>
        </div>
      </div>

      {/* Progress Bar (Subtle) */}
      <div className="absolute bottom-12 w-48 h-[2px] bg-amber-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full bg-amber-800"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;