import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionWrapper;