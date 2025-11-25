import React from 'react';
import SectionWrapper from './SectionWrapper';
import { Mail, MapPin, Award, Briefcase, GraduationCap, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface EducationContactProps {
  onScrollTop: () => void;
}

const EducationContact: React.FC<EducationContactProps> = ({ onScrollTop }) => {
  return (
    <section className="py-20 md:py-32 relative bg-gradient-to-b from-day to-gray-200 dark:from-void dark:to-black theme-transition">
      <SectionWrapper className="max-w-5xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Internship Section */}
            <div>
                 <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-accent-day dark:text-neon-gold">
                    <Briefcase className="text-neon-cyan" /> EXPERIENCE
                 </h3>
                 <div className="p-6 border border-gray-300 dark:border-white/10 bg-white/50 dark:bg-white/5 rounded-xl hover:border-accent-day/30 dark:hover:border-neon-gold/30 transition-colors shadow-sm dark:shadow-none">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">UI/UX Design Intern</h4>
                    <p className="text-neon-cyan font-mono text-sm mb-2 font-semibold">Maxbyte Technologies, Coimbatore</p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                        <li>Contributed to real-world projects and design workflows.</li>
                        <li>Collaborated with senior designers on wireframes & prototypes.</li>
                        <li>Tools Used: Figma, Photoshop, After Effects.</li>
                    </ul>
                 </div>
            </div>

            {/* Education Section */}
            <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-accent-day dark:text-neon-gold">
                    <GraduationCap className="text-neon-cyan" /> EDUCATION
                </h3>
                <div className="space-y-6">
                    <div className="relative pl-6 border-l border-gray-300 dark:border-white/20">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-neon-purple" />
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">BE CSE</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Mount Zion College of Engineering (2019-2023)</p>
                        <p className="text-accent-day dark:text-neon-gold text-xs font-mono">CGPA: 7.5</p>
                    </div>
                     <div className="relative pl-6 border-l border-gray-300 dark:border-white/20">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-400 dark:bg-gray-600" />
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">HSC</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Sudharsan Vidya Mandir (2018-2019)</p>
                        <p className="text-gray-500 text-xs font-mono">Percentage: 53%</p>
                    </div>
                     <div className="relative pl-6 border-l border-gray-300 dark:border-white/20">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-400 dark:bg-gray-600" />
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">SSLC</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Sudharsan Vidya Mandir (2016-2017)</p>
                        <p className="text-accent-day dark:text-neon-gold text-xs font-mono">Percentage: 74%</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Certificates */}
        <div className="mb-20">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-accent-day dark:text-neon-gold justify-center">
                <Award className="text-neon-cyan" /> CERTIFICATIONS
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
                <div className="px-6 py-3 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-neon-cyan/20 rounded-full text-sm text-gray-800 dark:text-white hover:bg-neon-cyan/10 transition-colors shadow-sm dark:shadow-none">
                    GUVI Certification on UX Fundamentals
                </div>
                <div className="px-6 py-3 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-neon-cyan/20 rounded-full text-sm text-gray-800 dark:text-white hover:bg-neon-cyan/10 transition-colors shadow-sm dark:shadow-none">
                    GUVI Certification on UI/UX Design
                </div>
            </div>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-8 text-center md:text-left border-t border-gray-300 dark:border-white/10 pt-16">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">INITIATE<br/><span className="text-neon-purple">CONTACT</span></h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto md:mx-0">
              Ready to collaborate on the future of AI & Design? Open a communication channel below.
            </p>
          </div>

          <div className="flex flex-col justify-center space-y-6 md:pl-12">
             <div className="group flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition-colors cursor-pointer justify-center md:justify-start">
                <div className="p-3 bg-white dark:bg-white/5 rounded-full group-hover:bg-neon-cyan/10 transition-colors shadow-md dark:shadow-none">
                  <Mail size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-mono text-gray-500">EMAIL TRANSMISSION</p>
                  <p className="text-base md:text-lg font-medium">srinath52437@gmail.com</p>
                </div>
             </div>

             <div className="group flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-accent-day dark:hover:text-neon-gold transition-colors cursor-pointer justify-center md:justify-start">
                <div className="p-3 bg-white dark:bg-white/5 rounded-full group-hover:bg-accent-day/10 dark:group-hover:bg-neon-gold/10 transition-colors shadow-md dark:shadow-none">
                  <MapPin size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-mono text-gray-500">BASE OF OPERATIONS</p>
                  <p className="text-base md:text-lg font-medium">Pudukkottai, Tamil Nadu</p>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center gap-8">
            {/* System Reset Button - Minimal Icon Version */}
            <motion.button
                onClick={onScrollTop}
                whileHover="hover"
                whileTap="tap"
                initial="initial"
                variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.1 },
                    tap: { scale: 0.9 }
                }}
                className="group relative p-6 bg-transparent border-2 border-accent-day dark:border-neon-gold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                aria-label="System Reboot"
            >
                <motion.div 
                    className="relative z-10 text-accent-day dark:text-neon-gold"
                    variants={{
                        initial: { rotate: 0 },
                        hover: { 
                            rotate: -360, 
                            transition: { 
                                duration: 1, 
                                repeat: Infinity, 
                                ease: "linear" 
                            } 
                        }
                    }}
                >
                    <RotateCcw size={32} strokeWidth={2} />
                </motion.div>
            </motion.button>

            <p className="text-xs font-mono text-gray-500 dark:text-gray-600">
                SYSTEM ID: MK-2024 // END OF LINE
            </p>
        </div>

      </SectionWrapper>
    </section>
  );
};

export default EducationContact;