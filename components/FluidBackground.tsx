import React, { useEffect, useRef } from 'react';

const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    
    // Mouse state
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 150 // Interaction radius
    };

    // Handle Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    // Handle Mouse Move
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    // Handle Touch Move
    const handleTouchMove = (e: TouchEvent) => {
      if(e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Check Theme for Colors
    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return {
        particleColor: isDark ? 'rgba(0, 243, 255, 0.8)' : 'rgba(217, 119, 6, 0.8)', // Neon Cyan vs Accent Day
        lineColor: isDark ? 'rgba(189, 0, 255,' : 'rgba(100, 116, 139,', // Neon Purple vs Slate
      };
    };

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      density: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 1;
      }

      draw(colors: { particleColor: string }) {
        if (!ctx) return;
        ctx.fillStyle = colors.particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouse.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          // Push away from mouse (fluid displacement)
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Return to original position (elasticity)
          if (this.x !== this.baseX) {
            const dxMove = this.x - this.baseX;
            this.x -= dxMove / 10;
          }
          if (this.y !== this.baseY) {
            const dyMove = this.y - this.baseY;
            this.y -= dyMove / 10;
          }
        }
      }
    }

    function init() {
      particlesArray = [];
      const numberOfParticles = (canvas!.width * canvas!.height) / 9000; // Density
      
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas!.width;
        const y = Math.random() * canvas!.height;
        particlesArray.push(new Particle(x, y));
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const colors = getThemeColors();

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw(colors);
        particlesArray[i].update();
        connect(i, particlesArray, colors);
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    function connect(index: number, particles: Particle[], colors: { lineColor: string }) {
      if (!ctx) return;
      for (let j = index; j < particles.length; j++) {
        const dx = particles[index].x - particles[j].x;
        const dy = particles[index].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Draw lines between close particles
        if (distance < 110) {
          ctx.beginPath();
          // Dynamic opacity based on distance
          const opacity = 1 - (distance / 110);
          ctx.strokeStyle = `${colors.lineColor} ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[index].x, particles[index].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }

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
      className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30"
    />
  );
};

export default FluidBackground;
