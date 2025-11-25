import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [text, setText] = useState("INITIALIZING SYSTEM...");
  
  // Hero image URL to preload
  const HERO_IMAGE_URL = "https://lh3.googleusercontent.com/d/1J3mIINjzKX2Eb7AaxlStPM76sWIr35Ny=s1000";

  useEffect(() => {
    // 1. Animation Steps sequence
    const steps = [
      { t: "INITIALIZING SYSTEM...", d: 800 },
      { t: "ESTABLISHING NEURAL LINK...", d: 1500 },
      { t: "LOADING INTERFACE ASSETS...", d: 2200 },
      { t: "ACCESS GRANTED.", d: 3000 },
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    // Schedule text updates
    steps.forEach((step) => {
      const timeout = setTimeout(() => {
        setText(step.t);
      }, step.d - 800); 
      timeouts.push(timeout);
    });

    // 2. Preload the Critical Image
    const preloadImage = new Promise((resolve) => {
      const img = new Image();
      img.src = HERO_IMAGE_URL;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false); // Resolve even on error to not block app
    });

    // 3. Minimum Animation Time
    const minTime = new Promise((resolve) => setTimeout(resolve, 3500));

    // 4. Wait for BOTH (Animation done AND Image loaded)
    Promise.all([minTime, preloadImage]).then(() => {
      onLoadingComplete();
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void text-neon-cyan font-mono"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative">
        <motion.div
          className="h-1 bg-neon-cyan mb-4"
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 3 }}
        />
        <motion.p
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="tracking-widest text-sm"
        >
          {`> ${text}`}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;