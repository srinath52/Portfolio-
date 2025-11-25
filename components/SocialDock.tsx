import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Globe, Github } from 'lucide-react';

const SocialDock: React.FC = () => {
  const socials = [
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/mohanasrinath', 
      icon: Linkedin,
      color: 'hover:text-blue-500'
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/srinath52', 
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    { 
      name: 'Behance', 
      url: 'https://www.behance.net/mohanasrinath', 
      icon: Globe,
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Email', 
      url: 'mailto:srinath52437@gmail.com', 
      icon: Mail,
      color: 'hover:text-red-400'
    },
  ];

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 4, duration: 1 }}
      className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="flex justify-center items-center gap-6 px-6 py-3 rounded-full bg-white/80 dark:bg-glass-start backdrop-blur-md border border-gray-200 dark:border-glass-border shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.3)] theme-transition">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 text-gray-600 dark:text-gray-400 ${social.color}`}
            aria-label={social.name}
          >
            <social.icon size={20} strokeWidth={1.5} />
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialDock;