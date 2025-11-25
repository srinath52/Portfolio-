import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

const projects: Project[] = [
  {
    title: "Car Price Prediction",
    tech: "Machine Learning (Main Project)",
    description: "Developed a predictive model to estimate pre-owned car prices using advanced ML algorithms."
  },
  {
    title: "Pose Estimation",
    tech: "Computer Vision (Mini Project)",
    description: "Implemented real-time human pose estimation for motion analysis using OpenCV."
  },
  {
    title: "AI Communication System",
    tech: "IBM Project",
    description: "Real-time communication system powered by AI designed for specially abled individuals."
  },
  {
    title: "Polio Landing Page",
    tech: "UI/UX Design",
    description: "Designed a comprehensive, accessible landing page for Polio awareness campaigns (2024)."
  },
  {
    title: "Levieditor",
    tech: "Product Design",
    description: "Created visually engaging interfaces and workflows for web-based editing software."
  },
  {
    title: "Circle",
    tech: "App Design",
    description: "Mobile application interface design focusing on community interaction and social connectivity."
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Scroll Animations
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  
  // 3D Tilt Effect logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = (mouseXPos / width) - 0.5;
    const yPct = (mouseYPos / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y: scrollY, opacity: scrollOpacity }}
      className={`relative w-full md:w-[45%] mb-12 md:mb-24 ${
        isEven ? 'md:mr-auto md:text-right md:pr-12' : 'md:ml-auto md:text-left md:pl-12'
      } text-left perspective-1000`}
    >
      {/* Connector Line to Center - Hidden on Mobile */}
      <div 
        className={`hidden md:block absolute top-6 h-px w-12 ${
          isEven ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'
        } from-accent-day/50 dark:from-neon-gold/50 to-transparent`} 
      />
      <div 
        className={`hidden md:block absolute top-5 w-3 h-3 rounded-full bg-gray-900 dark:bg-black border-2 border-accent-day dark:border-neon-gold ${
          isEven ? '-right-[7px]' : '-left-[7px]'
        }`} 
      />

      {/* Tilt Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="group relative p-6 md:p-8 rounded-xl bg-white/50 dark:bg-glass-start backdrop-blur-lg border border-gray-200 dark:border-white/5 transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-2xl hover:shadow-accent-day/10 dark:hover:shadow-neon-gold/10 overflow-hidden min-h-[180px] cursor-pointer"
      >
        {/* Dynamic Glare Effect */}
        <motion.div 
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15), transparent 60%)`
          }}
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-accent-day/5 dark:from-neon-gold/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        
        {/* Top Right Interaction Icon */}
        <div className="absolute top-6 right-6 z-30 pointer-events-none">
           <ArrowUpRight 
             size={24} 
             className="text-gray-300 dark:text-white/20 transition-all duration-300 group-hover:text-accent-day dark:group-hover:text-neon-gold group-hover:translate-x-1 group-hover:-translate-y-1 scale-90 group-hover:scale-110" 
           />
        </div>

        {/* Content with subtle Z-index lift */}
        <div style={{ transform: "translateZ(20px)" }} className="flex flex-col h-full relative z-20 pointer-events-none">
            <h3 className="text-xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-accent-day dark:group-hover:text-neon-gold transition-colors pr-8">
              {project.title}
            </h3>
            <p className="text-xs md:text-sm font-mono text-neon-cyan mb-4 font-semibold uppercase tracking-wider">{project.tech}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base flex-grow">
              {project.description}
            </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 px-4 max-w-7xl mx-auto min-h-screen theme-transition overflow-hidden">
      <div className="text-center mb-16 md:mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white font-mono"
        >
          PROJECT <span className="text-accent-day dark:text-neon-gold">PROTOCOLS</span>
        </motion.h2>
        <div className="h-1 w-20 bg-neon-purple mx-auto rounded-full" />
      </div>

      <div className="relative">
        {/* Central Line Background */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-white/10 -translate-x-1/2" />
        
        {/* Active Liquid Line Fill */}
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan via-accent-day dark:via-neon-gold to-neon-purple -translate-x-1/2 shadow-[0_0_15px_rgba(217,119,6,0.5)] dark:shadow-[0_0_15px_rgba(255,215,0,0.5)] rounded-full liquid-filter" 
        />

        {/* Project Cards Container - Padded left on mobile to clear the timeline line */}
        <div className="flex flex-col pl-10 md:pl-0">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectTimeline;