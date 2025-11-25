import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.group') || // Detect project cards
        target.classList.contains('hover-target') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Central Dot - AI Core */}
      <motion.div
        className="cursor-dot hidden md:block fixed pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY }}
        animate={{
          scale: isHovered ? 0 : 1, // Disappear into the brackets on hover
        }}
      >
        <div className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_10px_#00f3ff]" />
      </motion.div>

      {/* HUD Reticle / Brackets */}
      <motion.div
        className="cursor-outline hidden md:flex fixed pointer-events-none z-[9999] items-center justify-center"
        style={{ 
          x: springX, 
          y: springY,
          transform: "translate(-50%, -50%)" 
        }}
        animate={{
          width: isHovered ? 60 : 20,
          height: isHovered ? 60 : 20,
          opacity: 1
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Top Left Bracket */}
        <motion.div 
            className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2"
            animate={{ 
                borderColor: isHovered ? "#d97706" : "rgba(0, 243, 255, 0.5)",
                x: isHovered ? 0 : 8,
                y: isHovered ? 0 : 8
            }}
            transition={{ duration: 0.2 }}
        />
        {/* Top Right Bracket */}
        <motion.div 
            className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2"
            animate={{ 
                borderColor: isHovered ? "#d97706" : "rgba(0, 243, 255, 0.5)",
                x: isHovered ? 0 : -8,
                y: isHovered ? 0 : 8
            }}
            transition={{ duration: 0.2 }}
        />
        {/* Bottom Left Bracket */}
        <motion.div 
            className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2"
            animate={{ 
                borderColor: isHovered ? "#d97706" : "rgba(0, 243, 255, 0.5)",
                x: isHovered ? 0 : 8,
                y: isHovered ? 0 : -8
            }}
            transition={{ duration: 0.2 }}
        />
        {/* Bottom Right Bracket */}
        <motion.div 
            className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2"
            animate={{ 
                borderColor: isHovered ? "#d97706" : "rgba(0, 243, 255, 0.5)",
                x: isHovered ? 0 : -8,
                y: isHovered ? 0 : -8
            }}
            transition={{ duration: 0.2 }}
        />
        
        {/* Center Crosshair (Only visible on hover) */}
        <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0,
                rotate: isHovered ? 90 : 0
            }}
        >
            <div className="w-1 h-3 bg-accent-day dark:bg-neon-gold" />
            <div className="absolute w-3 h-1 bg-accent-day dark:bg-neon-gold" />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;