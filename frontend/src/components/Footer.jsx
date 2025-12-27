import React from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Phone, 
  CakeSlice,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#120a06] text-amber-50 pt-20 pb-10 px-6 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* 1. Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-amber-800 p-2 rounded-xl">
                <CakeSlice size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-serif font-black tracking-tight">
                RP Baking <span className="text-amber-500">Treats</span>
              </h3>
            </div>
            <p className="text-amber-200/60 leading-relaxed text-sm font-medium">
              Crafting premium artisanal chocolates and custom cakes that turn every ordinary moment into a sweet celebration. 100% homemade, 100% with love.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, color: 'hover:text-pink-500', link: '#' },
                { icon: Facebook, color: 'hover:text-blue-500', link: '#' },
                { icon: MessageCircle, color: 'hover:text-green-500', link: '#' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer ${social.color} hover:bg-white/10 hover:-translate-y-1`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Exploration */}
          <div>
            <h4 className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs mb-8">
              Exploration
            </h4>
            <ul className="space-y-4">
              {['Home', 'Products', 'Reviews', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-amber-200/50 hover:text-white transition-colors cursor-pointer text-sm font-bold flex items-center group"
                  >
                    <div className="w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-4 group-hover:mr-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Details */}
          <div>
            <h4 className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs mb-8">
              Contact Us
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-600 shrink-0" />
                <p className="text-sm text-amber-200/60 leading-tight">
                  Thiruvallur, Tamil Nadu
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-amber-600 shrink-0" />
                <p className="text-sm text-amber-200/60 font-bold">+91 95661 77090</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-amber-600 shrink-0" />
                <p className="text-sm text-amber-200/60 font-bold">rpbakingtreats@gmail.com</p>
              </div>
            </div>
          </div>

          {/* 4. Business Hours */}
          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
            <h4 className="text-white font-bold text-sm mb-4">Working Hours</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-amber-200/40 uppercase">Mon - Sat</span>
                <span className="text-amber-200 font-bold tracking-widest">09:00 - 20:00</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-amber-200/40 uppercase">Sunday</span>
                <span className="text-amber-500 font-bold tracking-widest uppercase italic">By Order Only</span>
              </div>
            </div>
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full mt-6 bg-amber-800 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-700 transition-all cursor-pointer"
            >
              Order Now
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-amber-200/20 text-[10px] font-bold tracking-[0.3em] text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} RP Baking Treats Homemade Wonders.<br /> 
            Crafted with passion for chocolate lovers.
          </p>
          
          {/* Scroll to top button */}
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white transition-all cursor-pointer group shadow-2xl"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;