import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "Gen AI", "Stable Diffusion", "Flux", "Ollama", "LM Studio", 
  "Python", "ReactJS", "Figma", "UI/UX", "Prompt Engineering", 
  "Wireframing", "Prototyping", "GitHub", "Adobe Photoshop"
];

const SkillsMarquee: React.FC = () => {
  return (
    <div className="relative py-12 bg-day dark:bg-void border-y border-gray-200 dark:border-white/5 overflow-hidden theme-transition">
      <div className="absolute inset-0 bg-gradient-to-r from-day via-transparent to-day dark:from-void dark:via-transparent dark:to-void z-10 pointer-events-none theme-transition" />
      
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity, 
          duration: 35, 
          ease: "linear" 
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-8 md:gap-16 px-4 md:px-8">
            {skills.map((skill, index) => (
              <span 
                key={`${skill}-${i}`} 
                className={`text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                  ${index % 3 === 0 ? 'from-accent-day dark:from-neon-gold to-yellow-600' : 
                    index % 3 === 1 ? 'from-neon-cyan to-blue-600' : 
                    'from-neon-purple to-purple-600'} 
                  hover:brightness-125 transition-all duration-500 cursor-default font-mono opacity-60 hover:opacity-100`}
              >
                {skill}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsMarquee;