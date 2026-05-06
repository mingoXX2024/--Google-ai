import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Play, 
  X, 
  ChevronRight, 
  Share2, 
  Heart, 
  MessageCircle, 
  Eye,
  Instagram,
  Clapperboard,
  Youtube,
  Twitter,
  Music,
  Send,
  Linkedin,
  Gamepad2,
  Sparkles,
  Search,
  Menu
} from 'lucide-react';

// --- Types ---
interface VideoItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  stats: {
    views: string;
    likes: string;
    comments: string;
  };
  description: string;
}

// --- Mock Data ---
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
      views: `${(Math.random() * 10 + 15).toFixed(1)}M`, // Above 15M
      likes: `${Math.floor(Math.random() * 800 + 400)}K`, 
      comments: `${Math.floor(Math.random() * 100 + 10)}K` 
    },
    description: '通过高频次的视觉刺激与精准的内容切入点，打造极具社媒传播力的竖屏创意内容。'
  }));
};

const PORTFOLIO_ITEMS: VideoItem[] = generateMockItems(24);

export default function SocialMedia() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  
  // Mouse movement tracking for parallax effect
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Floating hearts state
  const [hearts, setHearts] = useState<{ id: number, x: number, y: number, size: number, duration: number }[]>([]);
  const heartIdCounter = useRef(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const rawMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let interval: any;
    // Don't generate hearts if the modal is open
    if (isHoveringHero && currentIndex === null) {
      interval = setInterval(() => {
        const newHeart = {
          id: heartIdCounter.current++,
          x: rawMousePos.current.x,
          y: rawMousePos.current.y,
          size: Math.random() * 20 + 10, // 10px to 30px
          duration: Math.random() * 0.8 + 0.6, // Faster float up
        };
        setHearts(prev => [...prev.slice(-40), newHeart]);
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isHoveringHero, currentIndex]);

  // Clear hearts instantly when modal opens to avoid delay/stutter
  useEffect(() => {
    if (currentIndex !== null) {
      setHearts([]);
      setIsHoveringHero(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Parallax logic
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 50;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 50;
      setParallax({ x: mouseX.current, y: mouseY.current });

      // Raw position for hearts
      rawMousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredItems = PORTFOLIO_ITEMS;

  const handleItemClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex !== null && currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      {/* --- Hero Section --- */}
      <header 
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
        className="relative pt-20 pb-10 px-6 lg:px-12 flex flex-col items-center text-center overflow-hidden min-h-[40vh] justify-center"
      >
        {/* Heart Particles - Global Overlay (No AnimatePresence for faster cleanup) */}
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ 
                x: heart.x - heart.size / 2, 
                y: heart.y - heart.size / 2, 
                opacity: 1, 
                scale: 0.2 
              }}
              animate={{ 
                y: heart.y - 150, 
                x: heart.x + (Math.random() * 60 - 30), 
                opacity: 0, 
                scale: 1.5,
                rotate: Math.random() * 40 - 20
              }}
              transition={{ duration: heart.duration, ease: "easeOut" }}
              className="absolute text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
            >
              <Heart size={heart.size} className="fill-current" />
            </motion.div>
          ))}
        </div>

        {/* Background Mosaic Decorations */}
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
            <motion.span 
              className="inline-block cursor-default select-none relative"
              whileHover={{ 
                rotateY: 10,
                rotateX: -5,
                color: "#ffd700",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              社媒
            </motion.span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-white to-white drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]">之镜</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-xl mx-auto text-white/70 text-base md:text-xl font-extralight leading-relaxed tracking-wider italic"
          >
            "方寸之间，万象共鸣。在 9:16 的叙事里，我们捕捉时代的每一束流光。"
          </motion.p>
        </motion.div>

        {/* Floating Icons - Parallax Managed */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ 
              x: parallax.x * 0.4, 
              y: (parallax.y * 0.4) - 20,
              rotate: parallax.x * 0.1 
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="absolute top-[15%] left-[12%] text-[#ffd700] opacity-20"
          >
            <Instagram size={80} strokeWidth={1} />
          </motion.div>
          
          <motion.div 
             animate={{ 
               x: -parallax.x * 0.6, 
               y: -parallax.y * 0.6 + 40,
               rotate: -parallax.x * 0.2
             }}
             transition={{ type: "spring", stiffness: 40, damping: 25 }}
             className="absolute bottom-[20%] right-[12%] text-white opacity-20"
          >
            <Clapperboard size={70} strokeWidth={1} />
          </motion.div>

          <motion.div 
             animate={{ x: parallax.x * 0.2, y: parallax.y * 0.8 }}
             className="absolute top-[35%] right-[20%] text-red-500 opacity-15"
          >
            <Youtube size={50} strokeWidth={1} />
          </motion.div>

          <motion.div 
             animate={{ x: -parallax.x * 0.3, y: -parallax.y * 0.3 }}
             className="absolute bottom-[35%] left-[20%] text-blue-400 opacity-15"
          >
            <Twitter size={45} strokeWidth={1} />
          </motion.div>

          <motion.div 
             animate={{ x: parallax.x * 0.7, y: -parallax.y * 0.7 }}
             className="absolute top-[55%] left-[15%] text-pink-500 opacity-10"
          >
            <Music size={55} strokeWidth={1} />
          </motion.div>

          <motion.div 
             animate={{ x: -parallax.x * 0.5, y: parallax.y * 0.5 }}
             className="absolute top-[20%] right-[30%] text-white opacity-10"
          >
            <Send size={40} strokeWidth={1} />
          </motion.div>
        </div>
      </header>

      {/* --- Portfolio Grid (9:16 Focused) --- */}
      <main className="px-6 lg:px-12 py-10 pb-32">
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <PortfolioCard 
                key={item.id} 
                item={item} 
                index={index} 
                onClick={() => handleItemClick(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* --- Footer --- */}
      <footer className="py-20 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-10">
             {[Instagram, Share2, MessageCircle].map((Icon, i) => (
               <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ffd700] hover:text-[#0a101e] transition-all">
                 <Icon size={20} />
               </a>
             ))}
          </div>
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase">
            © 2026 Davis Creative Studio. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* --- Video Modal --- */}
      <AnimatePresence>
        {currentIndex !== null && (
          <VideoModal 
            items={filteredItems} 
            initialIndex={currentIndex}
            onClose={() => setCurrentIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// --- Components ---

interface PortfolioCardProps {
  item: VideoItem;
  index: number;
  onClick: () => void;
  key?: React.Key;
}

function PortfolioCard({ item, index, onClick }: PortfolioCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      {/* 9:16 Aspect Ratio Wrapper */}
      <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-white/5 border-2 border-white/10 group-hover:border-[#ffd700]/40 transition-all duration-500 shadow-2xl">
        {/* Thumbnail */}
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
        />

        {/* Overlay Gradients */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content Overlay - Simplified */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="flex items-center justify-end">
              <div className="flex items-center gap-1 text-white/70 text-[9px]">
                 <Eye size={10} /> {item.stats.views}
              </div>
           </div>
        </div>

        {/* Play Button Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 bg-black/20 backdrop-blur-sm">
          <Play size={20} className="fill-white text-white ml-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

interface VideoModalProps {
  items: VideoItem[];
  initialIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function VideoModal({ items, initialIndex, onClose }: VideoModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const currentItem = items[index];
  const lastScrollTime = useRef(0);
  const [direction, setDirection] = useState(0); 
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Attempt auto-play when content changes
    setIsPlaying(true);
    const timeout = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
          console.log("Autoplay blocked or failed");
        });
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [index]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowUp') {
        if (index > 0) {
          setDirection(-1);
          setIndex(p => p - 1);
        }
      }
      if (e.key === 'ArrowDown') {
        if (index < items.length - 1) {
          setDirection(1);
          setIndex(p => p + 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, items.length, onClose]);

  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 800) return; 

    if (e.deltaY > 20) { 
      if (index < items.length - 1) {
        setDirection(1);
        setIndex(p => p + 1);
        lastScrollTime.current = now;
      }
    } else if (e.deltaY < -20) { 
      if (index > 0) {
        setDirection(-1);
        setIndex(p => p - 1);
        lastScrollTime.current = now;
      }
    }
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0.5,
      scale: 1
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      y: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.4 }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center overflow-hidden touch-none"
      onWheel={handleWheel}
      onClick={onClose}
    >
      <AnimatePresence initial={false}>
        <motion.img 
          key={`bg-${currentItem.id}`}
          src={currentItem.thumbnail} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          alt="" 
          className="absolute inset-0 w-full h-full object-cover blur-[100px] pointer-events-none"
        />
      </AnimatePresence>

      <div className="relative h-[92vh] aspect-[9/16] bg-black shadow-[0_0_120px_rgba(0,0,0,1)] border-2 border-white/10 rounded-3xl overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentItem.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 300, damping: 35 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full"
            onClick={(e) => {
              e.stopPropagation();
              if (videoRef.current) {
                if (isPlaying) {
                  videoRef.current.pause();
                } else {
                  videoRef.current.play();
                }
                setIsPlaying(!isPlaying);
              }
            }}
          >
            <div className="relative w-full h-full bg-[#080808]">
              <video 
                ref={videoRef}
                src={currentItem.videoUrl === '#' ? "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-dancing-40030-large.mp4" : currentItem.videoUrl} 
                poster={currentItem.thumbnail}
                className="w-full h-full object-cover select-none" 
                playsInline
                autoPlay={isPlaying}
                loop
                muted={false}
              />
              
              {/* Interaction Bar (TikTok Style) */}
              <div className="absolute right-3 md:right-5 bottom-24 md:bottom-32 flex flex-col items-center gap-6 z-30" onClick={(e) => e.stopPropagation()}>
                 {/* Profile/Avatar */}
                 <div className="relative mb-3">
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-black flex items-center justify-center">
                       <img 
                          src="/mingo_logo.png" 
                          alt="MINGO Logo" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                             // Fallback to the letter 'D' if image is missing
                             const target = e.target as HTMLImageElement;
                             target.style.display = 'none';
                             const parent = target.parentElement;
                             if (parent) {
                                const span = document.createElement('span');
                                span.className = "text-white text-lg font-black italic";
                                span.innerText = "D";
                                parent.appendChild(span);
                             }
                          }}
                       />
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-red-500 rounded-full border-2 border-black flex items-center justify-center">
                       <span className="text-white text-xs font-bold leading-none">+</span>
                    </div>
                 </div>

                 {/* Like */}
                 <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center transition-all group-hover:scale-110 active:scale-90">
                       <Heart size={26} className="text-white fill-white/10 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-white tracking-widest">{currentItem.stats.likes}</span>
                 </div>

                 {/* Comment */}
                 <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center transition-all group-hover:scale-110 active:scale-90">
                       <MessageCircle size={26} className="text-white fill-white/10" />
                    </div>
                    <span className="text-[10px] font-bold text-white tracking-widest">{currentItem.stats.comments}</span>
                 </div>

                 {/* Views/Favorite */}
                 <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center transition-all group-hover:scale-110 active:scale-90">
                       <Eye size={26} className="text-white fill-white/10 group-hover:text-[#ffd700] transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-white tracking-widest">{currentItem.stats.views}</span>
                 </div>

                 {/* Share */}
                 <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center transition-all group-hover:scale-110 active:scale-90">
                       <Share2 size={24} className="text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">分享</span>
                 </div>
              </div>

              {/* Bottom Decoration Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none opacity-60" />
              
              {/* Play Indicator Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 z-40 pointer-events-none"
                  >
                    <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center backdrop-blur-md">
                       <Play size={48} className="fill-white text-white ml-2" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button 
        onClick={onClose} 
        className="fixed top-8 left-8 w-12 h-12 rounded-full border-2 border-white/10 bg-black/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/10 transition-all z-[250]"
      >
        <X size={24} />
      </button>
    </motion.div>
  );
}

