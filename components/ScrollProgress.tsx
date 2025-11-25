import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent-day dark:bg-neon-cyan origin-left z-50 shadow-[0_0_15px_rgba(217,119,6,0.5)] dark:shadow-[0_0_15px_rgba(0,243,255,0.5)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;