import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, MessageCircle, Eye, Share2, Play } from 'lucide-react';
import { VideoItem } from '../../../types/video';

interface VideoModalProps {
  items: VideoItem[];
  initialIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function VideoModal({ items, initialIndex, onClose }: VideoModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const currentItem = items[index];
  const lastScrollTime = useRef(0);
  const [direction, setDirection] = useState(0); 
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setIsPlaying(true);
    const timeout = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
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
              
              <div className="absolute right-3 md:right-5 bottom-24 md:bottom-32 flex flex-col items-center gap-6 z-30" onClick={(e) => e.stopPropagation()}>
                 <div className="relative mb-3">
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-black flex items-center justify-center">
                       <img 
                          src="/mingo_logo.png" 
                          alt="MINGO Logo" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
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

                 <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center transition-all group-hover:scale-110 active:scale-90">
                       <Heart size={26} className="text-white fill-white/10 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-white tracking-widest">{currentItem.stats.likes}</span>
                 </div>

                 <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center transition-all group-hover:scale-110 active:scale-90">
                       <MessageCircle size={26} className="text-white fill-white/10" />
                    </div>
                    <span className="text-[10px] font-bold text-white tracking-widest">{currentItem.stats.comments}</span>
                 </div>

                 <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center transition-all group-hover:scale-110 active:scale-90">
                       <Eye size={26} className="text-white fill-white/10 group-hover:text-[#ffd700] transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-white tracking-widest">{currentItem.stats.views}</span>
                 </div>

                 <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center transition-all group-hover:scale-110 active:scale-90">
                       <Share2 size={24} className="text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">分享</span>
                 </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none opacity-60" />
              
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
