import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Icons imported with correct standard Lucide names
import { 
  X, 
  User, 
  MapPin, 
  CalendarDays, 
  MessageCircle, 
  SendHorizonal,
  CakeSlice 
} from 'lucide-react';

const OrderModal = ({ product, isOpen, onClose }) => {
  const [form, setForm] = useState({ 
    name: '', 
    location: '', 
    date: '', 
    comments: '' 
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = "911234567890"; // Your actual business number
    
    const message = `*New Order Request - RP Baking Treats*%0A` +
                    `----------------------------------%0A` +
                    `*Product:* ${product.name}%0A` +
                    `*Customer:* ${form.name}%0A` +
                    `*Delivery Location:* ${form.location}%0A` +
                    `*Expected Date:* ${form.date}%0A` +
                    `*Instructions/Occasion:* ${form.comments || 'None'}%0A` +
                    `----------------------------------`;

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-amber-950/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative overflow-hidden z-10"
        >
          {/* Header Section */}
          <div className="bg-amber-800 h-28 flex items-center px-8 text-white relative">
            <div className="absolute top-2 right-4 opacity-10">
                <CakeSlice size={120} />
            </div>
            <div className="relative z-10">
                <h2 className="text-2xl font-serif font-bold tracking-tight">Complete Your Order</h2>
                <p className="text-amber-100/80 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">RP Baking Treats Signature</p>
            </div>
            <button 
              onClick={onClose} 
              className="ml-auto relative z-20 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Product Summary */}
            <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                <div>
                    <h4 className="font-bold text-amber-950">{product.name}</h4>
                    <p className="text-amber-700 font-bold">{product.price}</p>
                </div>
            </div>

            <div className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-800/40" size={18} />
                <input 
                    required 
                    type="text" 
                    placeholder="Your Full Name" 
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all font-medium text-amber-950"
                    onChange={e => setForm({...form, name: e.target.value})} 
                />
              </div>

              {/* Location Field */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-800/40" size={18} />
                <input 
                    required 
                    type="text" 
                    placeholder="Delivery Location (Area/Building)" 
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all font-medium text-amber-950"
                    onChange={e => setForm({...form, location: e.target.value})} 
                />
              </div>

              {/* Date Field */}
              <div className="relative">
                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-800/40" size={18} />
                <input 
                    required 
                    type="date" 
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-gray-500 font-medium cursor-pointer"
                    onChange={e => setForm({...form, date: e.target.value})} 
                />
              </div>

              {/* Comments Field */}
              <div className="relative">
                <MessageCircle className="absolute left-4 top-4 text-amber-800/40" size={18} />
                <textarea 
                    rows="3"
                    placeholder="Occasion or Note (e.g. Happy Birthday, Anniversary, less sugar...)" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none font-medium text-amber-950"
                    onChange={e => setForm({...form, comments: e.target.value})} 
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#20bd5a] transition-all transform hover:-translate-y-1 shadow-xl shadow-green-200 cursor-pointer active:scale-95"
            >
              <SendHorizonal size={20} />
              Place Order on WhatsApp
            </button>
            
            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                RP Baking Treats • Secure Order
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderModal;