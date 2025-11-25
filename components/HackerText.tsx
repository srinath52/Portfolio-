import React, { useState, useEffect, useRef } from 'react';

interface HackerTextProps {
  text: string;
  className?: string;
  speed?: number;
}

const HackerText: React.FC<HackerTextProps> = ({ text, className = "", speed = 40 }) => {
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  const intervalRef = useRef<number | null>(null);

  const animate = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = window.setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) { 
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    // Initial animation delay
    const timeout = setTimeout(animate, 500);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span 
      className={`${className}`}
      onMouseEnter={animate}
    >
      {displayText}
    </span>
  );
};

export default HackerText;