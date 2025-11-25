import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for hover targets including buttons, links, and specific classes
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-target')
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
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot hidden md:block"
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <motion.div
        className={`cursor-outline hidden md:block ${isHovered ? 'hovered' : ''}`}
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
    </>
  );
};

export default CustomCursor;