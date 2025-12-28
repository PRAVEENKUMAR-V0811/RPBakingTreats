import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Star, MessageSquare, User, Send, Quote } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const API_URL = import.meta.env.VITE_API_URL || 'https://rpbakingtreats.vercel.app';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [hoverRating, setHoverRating] = useState(0);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/reviews`);
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      return toast.error("Please fill all fields");
    }
    
    const loadingToast = toast.loading("Sending your review...");

    try {
      await axios.post(`${API_URL}/api/reviews`, newReview);
      setNewReview({ name: '', rating: 5, comment: '' });
      fetchReviews();
      
      toast.success("Thank you! Your sweet feedback made our day! 🍫", {
        id: loadingToast,
        duration: 5000,
        icon: '✨',
      });
    } catch (err) {
      toast.error('Could not post review. Please try again.', { id: loadingToast });
    }
  };

  return (
    <section id="reviews" className="py-24 bg-[#fffaf0] px-6 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-amber-950 mb-4"
          >
            Customer Stories
          </motion.h2>
          <p className="text-amber-800/70 italic">Real feedback from our chocolate lovers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form: Occupies 4 columns */}
          <div className="lg:col-span-4">
            <form
              onSubmit={submitReview}
              className="bg-white p-8 rounded-3xl shadow-xl border border-amber-100"
            >
              <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <MessageSquare size={20} className="text-amber-600" /> Share your experience
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-900/60 mb-1 block">Your Name</label>
                  <input
                    required
                    value={newReview.name}
                    placeholder="E.g. Jane Doe"
                    className="w-full p-3 rounded-xl bg-amber-50/50 border border-amber-100 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-900/60 mb-1 block">Rating</label>
                  <div className="flex gap-1 bg-amber-50/50 p-2 rounded-xl w-fit">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star
                        key={num}
                        size={22}
                        className={`cursor-pointer transition-all ${
                          num <= (hoverRating || newReview.rating) 
                          ? 'fill-amber-500 text-amber-500 scale-110' 
                          : 'text-amber-200'
                        }`}
                        onMouseEnter={() => setHoverRating(num)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setNewReview({ ...newReview, rating: num })}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-900/60 mb-1 block">Message</label>
                  <textarea
                    required
                    rows="3"
                    value={newReview.comment}
                    placeholder="How was the chocolate?"
                    className="w-full p-3 rounded-xl bg-amber-50/50 border border-amber-100 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  />
                </div>

                <button className="cursor-pointer w-full bg-amber-900 text-white font-bold py-4 rounded-xl hover:bg-amber-800 transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                  <Send size={18} /> Post Review
                </button>
              </div>
            </form>
          </div>

          {/* Carousel: Occupies 8 columns */}
          <div className="lg:col-span-8 w-full min-w-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-amber-800/40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-800 mb-4"></div>
                <p>Loading sweetness...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-amber-200">
                <p className="text-amber-800/50 text-lg italic">No reviews yet. Be the first!</p>
              </div>
            ) : (
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                breakpoints={{
                  768: { slidesPerView: 2 },
                }}
                className="pb-14 review-swiper"
              >
                {reviews.map((r, i) => (
                  <SwiperSlide key={r._id || i}>
                    <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm h-full flex flex-col relative group overflow-hidden">
                      <Quote className="absolute top-4 right-4 text-amber-50 group-hover:text-amber-100 transition-colors" size={60} />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex gap-0.5 mb-4">
                          {[...Array(5)].map((_, starI) => (
                            <Star 
                              key={starI} 
                              size={16} 
                              className={starI < r.rating ? "fill-amber-500 text-amber-500" : "text-gray-200"} 
                            />
                          ))}
                        </div>

                        <p className="text-amber-900/80 text-lg leading-relaxed italic mb-6 flex-grow">
                          "{r.comment}"
                        </p>

                        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-amber-50">
                          <div className="bg-amber-100 h-12 w-12 rounded-full flex items-center justify-center text-amber-800">
                            <User size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-amber-950">{r.name}</h4>
                            <p className="text-[10px] uppercase font-bold text-amber-800/40 tracking-widest">
                              {new Date(r.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .review-swiper .swiper-pagination-bullet-active {
          background: #78350f !important;
        }
        .review-swiper .swiper-pagination-bullet {
          background: #d97706;
        }
      `}</style>
    </section>
  );
};

export default Reviews;