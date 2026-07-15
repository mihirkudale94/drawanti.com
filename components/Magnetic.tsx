'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export default function Magnetic({ children, range = 80, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 15, mass: 0.15 });
  const springY = useSpring(y, { stiffness: 120, damping: 15, mass: 0.15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Check if cursor is within magnetic range
      if (distance < range) {
        // Pull towards cursor
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        // Snap back to origin
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [range, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      style={{
        display: 'inline-flex',
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  );
}
