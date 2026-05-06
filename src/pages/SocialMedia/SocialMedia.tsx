import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Instagram,
  Clapperboard,
  Youtube,
  Twitter,
  Music,
  Send,
  MessageCircle,
  Share2
} from 'lucide-react';
import { VideoItem } from '../../types/video';
import PortfolioCard from './components/PortfolioCard';
import VideoModal from './components/VideoModal';
import { useParallax } from '../../hooks/useParallax';
import { useHearts } from '../../hooks/useHearts';

// --- Mock Data Generator ---
const generateMockItems = (count: number): VideoItem[] => {
  const categories = ['品牌创意', '时尚生活', '3D动态', '叙事短片'];
  const thumbnails = [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070',
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071',
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964',
    'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=1974',
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974',
    'https://images.unsplash.com/photo-1558591710-4b4a1ad0f048?q=80&w=1974',
  ];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `${i + 1}`,
    title: `创意社媒案例 ${i + 1}`,
    category: categories[i % categories.length],
    thumbnail: thumbnails[i % thumbnails.length],
    videoUrl: '#',
    stats: { 
      views: `${(Math.random() * 10 + 15).toFixed(1)}M`,
      likes: `${Math.floor(Math.random() * 800 + 400)}K`, 
      comments: `${Math.floor(Math.random() * 100 + 10)}K` 
    },
    description: '通过高频次的视觉刺激与精准的内容切入点，打造极具社媒传播力的竖屏创意内容。'
  }));
};

const PORTFOLIO_ITEMS: VideoItem[] = generateMockItems(24);

export default function SocialMedia() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  
  const parallax = useParallax();
  const hearts = useHearts(isHoveringHero && currentIndex === null, currentIndex);

  const handleItemClick = (index: number) => setCurrentIndex(index);
  const handlePrev = () => currentIndex !== null && currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const handleNext = () => currentIndex !== null && currentIndex < PORTFOLIO_ITEMS.length - 1 && setCurrentIndex(currentIndex + 1);

  return (
    <>
      <header 
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
        className="relative pt-20 pb-10 px-6 lg:px-12 flex flex-col items-center text-center overflow-hidden min-h-[40vh] justify-center"
      >
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ x: heart.x - heart.size / 2, y: heart.y - heart.size / 2, opacity: 1, scale: 0.2 }}
              animate={{ y: heart.y - 150, x: heart.x + (Math.random() * 60 - 30), opacity: 0, scale: 1.5, rotate: Math.random() * 40 - 20 }}
              transition={{ duration: heart.duration, ease: "easeOut" }}
              className="absolute text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
            >
              <Heart size={heart.size} className="fill-current" />
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <div className="flex gap-12 justify-center h-full">
             {Array.from({ length: 7 }).map((_, i) => (
               <div key={i} className={`flex flex-col gap-6 animate-scroll-y ${i % 2 === 0 ? '' : 'direction-reverse text-right'}`} style={{ animationDuration: `${25 + i * 5}s` }}>
                  {PORTFOLIO_ITEMS.slice(0, 10).map((item, j) => (
                    <div key={j} className="w-36 aspect-[9/16] bg-white/20 rounded-2xl shadow-inner" />
                  ))}
               </div>
             ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-20 relative group"
        >
          <motion.span 
            whileHover={{ scale: 1.05, letterSpacing: "0.4em" }}
            className="inline-block px-6 py-1.5 bg-yellow-500/10 border-2 border-yellow-500/20 text-[#ffd700] text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] rounded-full mb-6 transition-all cursor-default"
          >
            Social Media Creativity
          </motion.span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter uppercase text-white leading-none perspective-1000 relative">
            <motion.span className="inline-block cursor-default select-none relative" whileHover={{ rotateY: 10, rotateX: -5, color: "#ffd700" }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>社媒</motion.span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-white to-white drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]">之镜</span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="max-w-xl mx-auto text-white/70 text-base md:text-xl font-extralight leading-relaxed tracking-wider italic">
            "方寸之间，万象共鸣。在 9:16 的叙事里，我们捕捉时代的每一束流光。"
          </motion.p>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x: parallax.x * 0.4, y: (parallax.y * 0.4) - 20, rotate: parallax.x * 0.1 }} transition={{ type: "spring", stiffness: 50, damping: 20 }} className="absolute top-[15%] left-[12%] text-[#ffd700] opacity-20"><Instagram size={80} strokeWidth={1} /></motion.div>
          <motion.div animate={{ x: -parallax.x * 0.6, y: -parallax.y * 0.6 + 40, rotate: -parallax.x * 0.2 }} transition={{ type: "spring", stiffness: 40, damping: 25 }} className="absolute bottom-[20%] right-[12%] text-white opacity-20"><Clapperboard size={70} strokeWidth={1} /></motion.div>
          <motion.div animate={{ x: parallax.x * 0.2, y: parallax.y * 0.8 }} className="absolute top-[35%] right-[20%] text-red-500 opacity-15"><Youtube size={50} strokeWidth={1} /></motion.div>
          <motion.div animate={{ x: -parallax.x * 0.3, y: -parallax.y * 0.3 }} className="absolute bottom-[35%] left-[20%] text-blue-400 opacity-15"><Twitter size={45} strokeWidth={1} /></motion.div>
          <motion.div animate={{ x: parallax.x * 0.7, y: -parallax.y * 0.7 }} className="absolute top-[55%] left-[15%] text-pink-500 opacity-10"><Music size={55} strokeWidth={1} /></motion.div>
          <motion.div animate={{ x: -parallax.x * 0.5, y: parallax.y * 0.5 }} className="absolute top-[20%] right-[30%] text-white opacity-10"><Send size={40} strokeWidth={1} /></motion.div>
        </div>
      </header>

      <main className="px-6 lg:px-12 py-10 pb-32">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {PORTFOLIO_ITEMS.map((item, index) => (
              <PortfolioCard key={item.id} item={item} index={index} onClick={() => handleItemClick(index)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <footer className="py-20 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-10">
             {[Instagram, Share2, MessageCircle].map((Icon, i) => (
               <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ffd700] hover:text-[#0a101e] transition-all"><Icon size={20} /></a>
             ))}
          </div>
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase">© 2026 Davis Creative Studio. All Rights Reserved.</p>
        </div>
      </footer>

      <AnimatePresence>
        {currentIndex !== null && (
          <VideoModal items={PORTFOLIO_ITEMS} initialIndex={currentIndex} onClose={() => setCurrentIndex(null)} onPrev={handlePrev} onNext={handleNext} />
        )}
      </AnimatePresence>
    </>
  );
}
