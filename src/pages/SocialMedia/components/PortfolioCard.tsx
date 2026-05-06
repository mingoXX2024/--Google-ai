import React from 'react';
import { motion } from 'motion/react';
import { Eye, Play } from 'lucide-react';
import { VideoItem } from '../../../types/video';

interface PortfolioCardProps {
  item: VideoItem;
  index: number;
  onClick: () => void;
  key?: React.Key;
}

export default function PortfolioCard({ item, index, onClick }: PortfolioCardProps) {
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
      <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-white/5 border-2 border-white/10 group-hover:border-[#ffd700]/40 transition-all duration-500 shadow-2xl">
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="flex items-center justify-end">
              <div className="flex items-center gap-1 text-white/70 text-[9px]">
                 <Eye size={10} /> {item.stats.views}
              </div>
           </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 bg-black/20 backdrop-blur-sm">
          <Play size={20} className="fill-white text-white ml-0.5" />
        </div>
      </div>
    </motion.div>
  );
}
