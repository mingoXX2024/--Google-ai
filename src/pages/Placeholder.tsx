import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
      <Sparkles size={64} className="text-[#ffd700] mb-8 animate-pulse" />
      <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
        {title}
      </h1>
      <p className="text-white/50 text-xl font-light italic max-w-lg">
        正在创作中，更多精彩内容即将呈现...
      </p>
    </div>
  );
}
