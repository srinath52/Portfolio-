import React, { useEffect, useRef } from 'react';

const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Mouse state initialization
    const mouse = { x: -1000, y: -1000 };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      
      constructor() {
        if (!canvas) throw new Error("Canvas not initialized");
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Very slow drift velocity for minimal feel
        this.vx = (Math.random() - 0.5) * 0.2; 
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.5 + 0.5; // Small, subtle dots
        
        // Subtle space colors
        const colors = ['#ffffff', 'rgba(0, 243, 255, 0.8)', 'rgba(189, 0, 255, 0.8)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (!canvas) return;
        
        this.x += this.vx;
        this.y += this.vy;

        // Subtle Mouse Interaction (Gentle Repulsion)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;

        if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            const angle = Math.atan2(dy, dx);
            const push = force * 1.0; // Gentle push factor
            this.x -= Math.cos(angle) * push;
            this.y -= Math.sin(angle) * push;
        }

        // Screen Wrap-around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function init() {
      if (!canvas) return;
      particles = [];
      // Minimal density: fewer particles for a cleaner look
      const particleCount = window.innerWidth < 768 ? 40 : 80;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains('dark');
      
      // 1. Draw Subtle Nebula Background
      // We use large, slowly moving radial gradients to create depth without clutter
      const time = Date.now() * 0.0002;
      const w = canvas.width;
      const h = canvas.height;

      const drawNebula = (x: number, y: number, colorStart: string, radius: number) => {
          // Safety check for radius to avoid IndexSizeError
          if (radius <= 0) return;
          const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
          g.addColorStop(0, colorStart);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.fillRect(0,0,w,h);
      };

      if (isDark) {
          // Dark mode: Deep Violet and Teal hints
          drawNebula(
              w * 0.3 + Math.sin(time) * 100, 
              h * 0.4 + Math.cos(time * 1.2) * 80, 
              'rgba(76, 29, 149, 0.05)', // Very faint violet
              600
          );
          drawNebula(
              w * 0.7 - Math.sin(time * 0.8) * 100, 
              h * 0.6 - Math.cos(time) * 80, 
              'rgba(15, 118, 110, 0.05)', // Very faint teal
              600
          );
      } else {
           // Light mode: Very faint blue/gray
           drawNebula(
              w * 0.5 + Math.sin(time) * 50, 
              h * 0.5 + Math.cos(time) * 50, 
              'rgba(56, 189, 248, 0.03)', 
              500
          );
      }

      // 2. Update & Draw Particles
      particles.forEach((p, index) => {
        p.update();
        p.draw();

        // 3. Draw Minimal Constellations
        for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const connectDistance = 120;

            if (dist < connectDistance) {
                ctx.beginPath();
                // Opacity fades out as distance increases
                const opacity = (1 - dist / connectDistance) * 0.12; // Max opacity 0.12 (very subtle)
                
                ctx.strokeStyle = isDark 
                    ? `rgba(255, 255, 255, ${opacity})` 
                    : `rgba(0, 0, 0, ${opacity})`;
                
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    // Initial setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default FluidBackground;