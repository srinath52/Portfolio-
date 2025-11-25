import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import HackerText from './HackerText';
import { Sparkles, Cpu, ScanLine } from 'lucide-react';

const Hero: React.FC = () => {
  const [imgSrc, setImgSrc] = useState("https://lh3.googleusercontent.com/d/1J3mIINjzKX2Eb7AaxlStPM76sWIr35Ny=s1000");
  const fallbackSrc = "https://avatars.githubusercontent.com/srinath52";
  const [isLoaded, setIsLoaded] = useState(false);

  // Text for streaming effect
  const descriptionText = "Specializing in deploying LLMs, Stable Diffusion, and creating user-centered AI solutions. Innovating at the intersection of Design and Artificial Intelligence.";
  const [streamedText, setStreamedText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setStreamedText(descriptionText.slice(0, index));
      index++;
      if (index > descriptionText.length) {
        clearInterval(intervalId);
      }
    }, 30); // Speed of typing
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20 pb-10 theme-transition">
      
      {/* Background Grid Animation */}
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-grid-pattern-light dark:bg-grid-pattern bg-[size:30px_30px] md:bg-[size:40px_40px] opacity-[0.1] dark:opacity-[0.05]" />
      
      <SectionWrapper className="z-10 flex flex-col items-center text-center px-4 w-full max-w-7xl">
        
        {/* Gen AI Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 relative"
        >
           <div className="absolute inset-0 bg-neon-cyan/20 blur-md rounded-full animate-pulse-fast"></div>
           <div className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-void/50 border border-neon-cyan/50 text-neon-cyan text-[10px] md:text-sm font-mono tracking-widest backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_#00f3ff]" />
            <Cpu size={14} className="inline-block" />
            <span>SYSTEM ONLINE: GEN_AI_MODULE_ACTIVE</span>
           </div>
        </motion.div>

        {/* Profile Image Container with Tech Scanner */}
        <div className="relative w-32 h-32 md:w-56 md:h-56 mb-8 md:mb-12 flex items-center justify-center group cursor-pointer">
          
          {/* Rotating Rings - Adjusted for Mobile */}
          <div aria-hidden="true" className="absolute inset-0 rounded-full border border-neon-cyan/30 animate-spin-slow" />
          <div aria-hidden="true" className="absolute -inset-2 rounded-full border border-neon-purple/20 animate-spin-slow shadow-[0_0_15px_rgba(189,0,255,0.1)]" style={{ animationDirection: 'reverse' }} />
          
          {/* Static Tech Ring */}
          <div aria-hidden="true" className="absolute -inset-4 rounded-full border border-dashed border-gray-400/20 dark:border-white/10 animate-[spin_20s_linear_infinite]" />

          {/* Image Container */}
          <motion.div 
            className="w-28 h-28 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-gray-200 dark:border-white/10 relative z-10 bg-gray-100 dark:bg-zinc-900 shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
             {/* Tech Scanner Effect */}
             <div aria-hidden="true" className="absolute inset-0 z-30 pointer-events-none opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-neon-cyan/40 animate-scan border-b-2 border-neon-cyan shadow-[0_0_10px_#00f3ff]" />
             </div>

             <img 
               src={imgSrc}
               onError={() => setImgSrc(fallbackSrc)}
               onLoad={() => setIsLoaded(true)}
               alt="Mohanasrinath K - Profile" 
               className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
               loading="eager"
               width={224} 
               height={224}
             />
          </motion.div>
          
          {/* Mobile "Tap" Hint */}
           <div className="absolute -bottom-8 md:hidden text-[10px] text-gray-500 font-mono animate-pulse">
              TAP FOR SCAN
           </div>
        </div>

        {/* Text Content with Hacker Effect - Responsive Typography */}
        <div className="relative z-10 w-full max-w-[90vw] md:max-w-4xl mx-auto break-words">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 md:mb-6 font-mono leading-tight">
            <HackerText 
              text="MOHANASRINATH K" 
              className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-100 dark:to-gray-500 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] block"
            />
          </h1>
        </div>

        <div className="h-px w-24 md:w-32 bg-gradient-to-r from-neon-cyan via-accent-day dark:via-neon-gold to-neon-purple my-4 md:my-6" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-lg md:text-2xl text-gray-700 dark:text-gray-300 font-mono tracking-wide max-w-4xl px-2 text-center"
        >
          <span className="whitespace-nowrap flex items-center gap-2">
            <span className="text-neon-cyan">&lt;</span> Prompt Engineer
          </span>
          <span className="hidden sm:inline text-accent-day dark:text-neon-gold">+</span>
          <span className="whitespace-nowrap flex items-center gap-2">
            UI/UX Designer <span className="text-neon-cyan">/&gt;</span>
          </span>
        </motion.div>
        
        {/* AI Streaming Description */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 relative group cursor-default w-full max-w-2xl"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-20 group-hover:opacity-40 blur transition-opacity duration-500 rounded-xl" />
          <div className="relative border border-gray-200 dark:border-white/10 p-6 rounded-xl bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-sm dark:shadow-none min-h-[120px] md:min-h-[100px] flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-mono">
              <span className="mr-2 inline-block"><Sparkles size={14} className="text-accent-day dark:text-neon-gold" /></span>
              {streamedText}
              <span className="inline-block w-2 h-4 bg-neon-cyan ml-1 animate-pulse align-middle" />
            </p>
          </div>
        </motion.div>

      </SectionWrapper>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-accent-day dark:text-neon-gold">Scroll</span>
        <div className="w-px h-8 md:h-12 bg-gradient-to-b from-transparent via-accent-day dark:via-neon-gold to-transparent" />
      </motion.div>

    </section>
  );
};

export default Hero;