import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Edit3, LogOut, ImageIcon, Save, X, 
  Loader2, Lock, Mail, Eye, EyeOff, LayoutDashboard, 
  ChevronRight, CakeSlice 
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('adminToken') === 'true');
  const [showPassword, setShowPassword] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Form States
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [formData, setFormData] = useState({
    name: '', price: '', category: 'Signature Cakes', desc: '', imageFile: null
  });

  const ADMIN_CREDENTIALS = { email: 'admin@rpbakingtreats.com', password: 'RPBakingTreats' };

  useEffect(() => {
    if (isLoggedIn) fetchProducts();
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) { toast.error("Error loading inventory"); }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    
    // Simulate high-end processing delay
    setTimeout(() => {
      if (loginData.email === ADMIN_CREDENTIALS.email && loginData.password === ADMIN_CREDENTIALS.password) {
        setIsLoggedIn(true);
        localStorage.setItem('adminToken', 'true');
        toast.success("Welcome back, RP Baking Admin", { icon: '🍫' });
      } else {
        toast.error("Invalid credentials");
      }
      setLoginLoading(false);
    }, 1000);
  };

  const openEdit = (product) => {
    setEditingId(product._id);
    setFormData({ 
        name: product.name, 
        price: product.price, 
        category: product.category, 
        desc: product.desc, 
        imageFile: null 
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('desc', formData.desc);
    if (formData.imageFile) data.append('image', formData.imageFile);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/products/${editingId}`, data);
        toast.success("Product Updated");
      } else {
        await axios.post(`${API_URL}/api/products`, data);
        toast.success("New Treat Added!");
      }
      setModalOpen(false);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this treat from the menu?")) return;
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      toast.success("Product Deleted");
    } catch (err) { toast.error("Delete failed"); }
  };

  // --- SUB-COMPONENT: LOGIN PAGE ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#fffcf7] flex items-center justify-center p-6 relative overflow-hidden">
        <Toaster position="top-center" />
        
        {/* Background Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-[100px]" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-md z-10"
        >
          <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl shadow-amber-900/10 border border-white">
            <div className="text-center mb-10">
              <div className="inline-flex p-4 bg-amber-950 rounded-2xl text-amber-50 mb-4 shadow-xl rotate-3">
                <CakeSlice size={32} />
              </div>
              <h1 className="text-3xl font-serif font-black text-amber-950">Admin Access</h1>
              <p className="text-amber-800/40 text-xs font-bold uppercase tracking-widest mt-2">Authorized Personnel Only</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="group">
                <label className="text-[10px] font-black uppercase text-amber-900/60 ml-2 mb-1 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-300" size={18} />
                  <input 
                    type="email" required 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-amber-50/50 border border-amber-100 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all cursor-text" 
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
                  />
                </div>
              </div>

              <div className="group">
                <label className="text-[10px] font-black uppercase text-amber-900/60 ml-2 mb-1 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-300" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} required 
                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-amber-50/50 border border-amber-100 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all cursor-text" 
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-300 hover:text-amber-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                disabled={loginLoading}
                className="w-full bg-amber-950 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-amber-900 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70"
              >
                {loginLoading ? <Loader2 className="animate-spin" /> : "Unlock Dashboard"}
                {!loginLoading && <ChevronRight size={18} />}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- SUB-COMPONENT: DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-amber-100/50">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-2xl text-amber-900">
                <LayoutDashboard size={28} />
            </div>
            <div>
                <h1 className="text-3xl font-serif font-black text-amber-950 leading-tight">Menu Management</h1>
                <p className="text-amber-800/40 font-bold uppercase tracking-widest text-[10px]">RP Baking Treats Inventory</p>
            </div>
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <button 
                onClick={() => { setEditingId(null); setFormData({name:'', price:'', category:'Signature Cakes', desc:'', imageFile:null}); setModalOpen(true); }} 
                className="flex-1 lg:flex-none bg-amber-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 cursor-pointer hover:bg-amber-800 transition-all"
            >
              <Plus size={20} /> New Treat
            </button>
            <button 
                onClick={() => { setIsLoggedIn(false); localStorage.removeItem('adminToken'); }} 
                className="p-4 bg-amber-50 text-amber-900 rounded-2xl border border-amber-100 cursor-pointer hover:bg-amber-100 transition-colors"
                title="Logout"
            >
                <LogOut size={24} />
            </button>
          </div>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {products.map((p) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={p._id} 
                className="bg-white rounded-[2.5rem] border border-amber-50 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={p.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={p.name} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-[10px] font-black text-amber-900 uppercase tracking-tighter">{p.category}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl text-amber-950 mb-2">{p.name}</h3>
                  <p className="text-amber-900/50 text-sm line-clamp-2 mb-6 h-10">{p.desc}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-amber-50">
                    <span className="font-black text-2xl text-amber-900">{p.price}</span>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="p-3 text-blue-500 bg-blue-50 hover:bg-blue-500 hover:text-white rounded-xl transition-all cursor-pointer"><Edit3 size={18} /></button>
                      <button onClick={() => handleDelete(p._id)} className="p-3 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all cursor-pointer"><Trash2 size={18} /></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} className="absolute inset-0 bg-amber-950/60 backdrop-blur-md" />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="p-10 md:p-12">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-amber-100 p-2 rounded-xl text-amber-900"><ImageIcon size={20} /></div>
                        <h2 className="text-3xl font-serif font-bold text-amber-950">{editingId ? 'Edit Treat' : 'New Treat'}</h2>
                    </div>
                    <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-amber-50 rounded-full cursor-pointer"><X /></button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] font-black uppercase text-amber-900/40 ml-2 mb-1 block">Treat Name</label>
                      <input required value={formData.name} className="w-full p-4 rounded-2xl bg-amber-50/50 outline-none border border-transparent focus:border-amber-300 transition-all" onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-amber-900/40 ml-2 mb-1 block">Category</label>
                      <select className="w-full p-4 rounded-2xl bg-amber-50/50 outline-none border border-transparent focus:border-amber-300" onChange={e => setFormData({...formData, category: e.target.value})} value={formData.category}>
                        <option>Signature Cakes</option><option>Handmade</option><option>Premium Cakes</option><option>Small Bites</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-amber-900/40 ml-2 mb-1 block">Price Tag</label>
                      <input required value={formData.price} placeholder="₹ 250/-" className="w-full p-4 rounded-2xl bg-amber-50/50 outline-none border border-transparent focus:border-amber-300" onChange={e => setFormData({...formData, price: e.target.value})} />
                    </div>
                  </div>

                  

                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] font-black uppercase text-amber-900/40 ml-2 mb-1 block">Short Description</label>
                      <textarea rows="2" className="w-full p-4 rounded-2xl bg-amber-50/50 outline-none border border-transparent focus:border-amber-300 resize-none" onChange={e => setFormData({...formData, desc: e.target.value})} value={formData.desc} />
                    </div>
                    <div>
                       <label className="text-[10px] font-black uppercase text-amber-900/40 ml-2 mb-1 block">Visual (Image)</label>
                       <div className="relative h-32 border-2 border-dashed border-amber-200 rounded-2xl flex flex-col items-center justify-center hover:bg-amber-50 transition-all cursor-pointer overflow-hidden">
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={e => setFormData({...formData, imageFile: e.target.files[0]})} />
                          {formData.imageFile ? (
                              <p className="text-xs font-bold text-amber-800 p-4 text-center">{formData.imageFile.name}</p>
                          ) : (
                            <div className="text-center">
                                <ImageIcon size={24} className="mx-auto text-amber-200 mb-2" />
                                <span className="text-[10px] font-bold text-amber-800/40 uppercase">Upload Media</span>
                            </div>
                          )}
                       </div>
                    </div>
                    <button disabled={isSubmitting} className="w-full bg-amber-900 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-amber-800 shadow-xl shadow-amber-900/10 transition-all cursor-pointer">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                      {editingId ? 'Update Menu' : 'List Item'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;