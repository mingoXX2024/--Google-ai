import { useState, useEffect, useRef } from 'react';

export function useParallax() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 50;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 50;
      setParallax({ x: mouseX.current, y: mouseY.current });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return parallax;
}
