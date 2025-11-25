import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  onScrollTop: () => void;
}

const BackToTop: React.FC<BackToTopProps> = ({ onScrollTop }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.2, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          onClick={onScrollTop}
          // Strictly no background, clean icon style
          className="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-40 text-accent-day dark:text-neon-gold drop-shadow-none dark:drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"
          aria-label="Back to top"
        >
          <ArrowUp size={32} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;