import { useState, useEffect, useRef } from 'react';

export function useHearts(isActive: boolean, clearTrigger: any) {
  const [hearts, setHearts] = useState<{ id: number, x: number, y: number, size: number, duration: number }[]>([]);
  const heartIdCounter = useRef(0);
  const rawMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawMousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        const newHeart = {
          id: heartIdCounter.current++,
          x: rawMousePos.current.x,
          y: rawMousePos.current.y,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 0.8 + 0.6,
        };
        setHearts(prev => [...prev.slice(-40), newHeart]);
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (clearTrigger !== null) {
      setHearts([]);
    }
  }, [clearTrigger]);

  return hearts;
}
