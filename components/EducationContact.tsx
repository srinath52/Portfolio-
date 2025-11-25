import React from 'react';
import SectionWrapper from './SectionWrapper';
import { Mail, MapPin, Award, Briefcase, GraduationCap, RotateCcw, Power } from 'lucide-react';
import { motion } from 'framer-motion';

interface EducationContactProps {
  onScrollTop: () => void;
}

const EducationContact: React.FC<EducationContactProps> = ({ onScrollTop }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 md:py-32 relative bg-gradient-to-b from-day to-gray-200 dark:from-void dark:to-black theme-transition overflow-hidden">
      <SectionWrapper className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Internship Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
                 <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-accent-day dark:text-neon-gold">
                    <Briefcase className="text-neon-cyan" aria-hidden="true" /> EXPERIENCE
                 </h3>
                 <motion.div 
                    variants={itemVariants}
                    className="p-6 border border-gray-300 dark:border-white/10 bg-white/50 dark:bg-white/5 rounded-xl hover:border-accent-day/30 dark:hover:border-neon-gold/30 transition-colors shadow-sm dark:shadow-none"
                 >
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">UI/UX Design Intern</h4>
                    <p className="text-neon-cyan font-mono text-xs md:text-sm mb-2 font-semibold">Maxbyte Technologies, Coimbatore</p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                        <li>Contributed to real-world projects and design workflows.</li>
                        <li>Collaborated with senior designers on wireframes & prototypes.</li>
                        <li>Tools Used: Figma, Photoshop, After Effects.</li>
                    </ul>
                 </motion.div>
            </motion.div>

            {/* Education Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
                <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-accent-day dark:text-neon-gold">
                    <GraduationCap className="text-neon-cyan" aria-hidden="true" /> EDUCATION
                </h3>
                <div className="space-y-6">
                    <motion.div variants={itemVariants} className="relative pl-6 border-l border-gray-300 dark:border-white/20">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-neon-purple" aria-hidden="true" />
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">BE CSE</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Mount Zion College of Engineering (2019-2023)</p>
                        <p className="text-accent-day dark:text-neon-gold text-xs font-mono">CGPA: 7.5</p>
                    </motion.div>
                     <motion.div variants={itemVariants} className="relative pl-6 border-l border-gray-300 dark:border-white/20">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-400 dark:bg-gray-600" aria-hidden="true" />
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">HSC</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Sudharsan Vidya Mandir (2018-2019)</p>
                        <p className="text-gray-500 text-xs font-mono">Percentage: 53%</p>
                    </motion.div>
                     <motion.div variants={itemVariants} className="relative pl-6 border-l border-gray-300 dark:border-white/20">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-400 dark:bg-gray-600" aria-hidden="true" />
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">SSLC</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Sudharsan Vidya Mandir (2016-2017)</p>
                        <p className="text-accent-day dark:text-neon-gold text-xs font-mono">Percentage: 74%</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>

        {/* Certificates */}
        <div className="mb-20 text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3 text-accent-day dark:text-neon-gold justify-center">
                <Award className="text-neon-cyan" aria-hidden="true" /> CERTIFICATIONS
            </h3>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                {["GUVI Certification on UX Fundamentals", "GUVI Certification on UI/UX Design"].map((cert, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="px-6 py-3 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-neon-cyan/20 rounded-full text-sm text-gray-800 dark:text-white hover:bg-neon-cyan/10 transition-colors shadow-sm dark:shadow-none cursor-default"
                    >
                        {cert}
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left border-t border-gray-300 dark:border-white/10 pt-16">
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-mono">INITIATE<br/><span className="text-neon-purple">CONTACT</span></h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              Ready to collaborate on the future of AI & Design? Open a communication channel below.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-6 md:pl-12">
             <motion.a 
                href="mailto:srinath52437@gmail.com"
                whileHover={{ x: 10 }}
                className="group flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition-colors cursor-pointer w-full max-w-sm md:max-w-none justify-center md:justify-start bg-white/20 dark:bg-white/5 p-4 rounded-xl md:bg-transparent md:p-0"
                aria-label="Send email to srinath52437@gmail.com"
             >
                <div className="p-3 bg-white dark:bg-white/5 rounded-full group-hover:bg-neon-cyan/10 transition-colors shadow-md dark:shadow-none shrink-0">
                  <Mail size={20} aria-hidden="true" />
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-[10px] md:text-xs font-mono text-gray-500 uppercase">EMAIL TRANSMISSION</p>
                  <p className="text-sm md:text-lg font-medium truncate">srinath52437@gmail.com</p>
                </div>
             </motion.a>

             <motion.div 
                whileHover={{ x: 10 }}
                className="group flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-accent-day dark:hover:text-neon-gold transition-colors cursor-pointer w-full max-w-sm md:max-w-none justify-center md:justify-start bg-white/20 dark:bg-white/5 p-4 rounded-xl md:bg-transparent md:p-0"
             >
                <div className="p-3 bg-white dark:bg-white/5 rounded-full group-hover:bg-accent-day/10 dark:group-hover:bg-neon-gold/10 transition-colors shadow-md dark:shadow-none shrink-0">
                  <MapPin size={20} aria-hidden="true" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] md:text-xs font-mono text-gray-500 uppercase">BASE OF OPERATIONS</p>
                  <p className="text-sm md:text-lg font-medium">Pudukkottai, Tamil Nadu</p>
                </div>
             </motion.div>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center gap-8 pb-10">
            {/* System Reset Button - Enhanced Tech Look */}
            <motion.button
                onClick={onScrollTop}
                whileHover="hover"
                whileTap="tap"
                initial="initial"
                variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.05 },
                    tap: { scale: 0.95 }
                }}
                className="group relative flex flex-col items-center justify-center p-0 bg-transparent border border-accent-day dark:border-neon-gold/50 rounded-full overflow-hidden transition-all duration-300 hover:border-accent-day hover:shadow-[0_0_30px_rgba(217,119,6,0.3)] dark:hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] w-24 h-24 md:w-32 md:h-32"
                aria-label="System Reboot: Returns to top of page and refreshes animation"
            >
                <div className="absolute inset-0 bg-accent-day/5 dark:bg-neon-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <motion.div 
                    className="relative z-10 text-accent-day dark:text-neon-gold mb-2"
                    variants={{
                        initial: { rotate: 0 },
                        hover: { 
                            rotate: -180, 
                            transition: { 
                                duration: 0.8, 
                                ease: "easeInOut" 
                            } 
                        }
                    }}
                >
                    <Power size={32} strokeWidth={2} aria-hidden="true" />
                </motion.div>
                <span className="text-[10px] font-mono tracking-widest text-accent-day dark:text-neon-gold opacity-70">REBOOT</span>
            </motion.button>

            <p className="text-xs font-mono text-gray-500 dark:text-gray-600 tracking-[0.2em] uppercase">
                SYSTEM ID: MK-2024 // END OF LINE
            </p>
        </div>

      </SectionWrapper>
    </section>
  );
};

export default EducationContact;