import React from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Image, 
  Zap, 
  MessageSquareCode, 
  Bot, 
  Terminal, 
  Cpu, 
  PenTool, 
  Layout, 
  Sparkles, 
  Frame, 
  Github, 
  Palette,
  Layers
} from 'lucide-react';

const skills = [
  { name: "Gen AI", icon: BrainCircuit, color: "text-neon-cyan" },
  { name: "Stable Diffusion", icon: Image, color: "text-purple-500" },
  { name: "Flux", icon: Zap, color: "text-yellow-400" },
  { name: "Ollama", icon: MessageSquareCode, color: "text-orange-400" },
  { name: "LM Studio", icon: Bot, color: "text-green-400" },
  { name: "Python", icon: Terminal, color: "text-blue-500" },
  { name: "ReactJS", icon: Cpu, color: "text-cyan-400" },
  { name: "Figma", icon: PenTool, color: "text-pink-500" },
  { name: "UI/UX", icon: Layout, color: "text-indigo-400" },
  { name: "Prompt Engineering", icon: Sparkles, color: "text-neon-gold" },
  { name: "Wireframing", icon: Frame, color: "text-gray-400" },
  { name: "Prototyping", icon: Layers, color: "text-teal-400" },
  { name: "GitHub", icon: Github, color: "text-white" },
  { name: "Adobe Photoshop", icon: Palette, color: "text-blue-600" }
];

const SkillsMarquee: React.FC = () => {
  return (
    <div className="relative py-16 bg-day dark:bg-void border-y border-gray-200 dark:border-white/5 overflow-hidden theme-transition z-20">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-day via-transparent to-day dark:from-void dark:via-transparent dark:to-void z-10 pointer-events-none" />
      
      <div className="flex overflow-hidden group">
        <div 
          className="flex gap-8 px-4 animate-scroll w-max hover:[animation-play-state:paused]"
        >
          {/* Duplicate list to create seamless loop */}
          {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
            <motion.div
              key={`${skill.name}-${index}`}
              className="group/item relative flex items-center gap-3 px-6 py-3 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm cursor-pointer hover:bg-white dark:hover:bg-white/10 transition-colors"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 20px rgba(0, 243, 255, 0.2)",
                borderColor: "rgba(0, 243, 255, 0.5)",
                rotate: 2
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <skill.icon 
                size={20} 
                className={`${skill.color} transition-transform group-hover/item:rotate-12`} 
              />
              <span className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-200 font-mono whitespace-nowrap">
                {skill.name}
              </span>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-20 bg-current transition-opacity" style={{ color: skill.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsMarquee;