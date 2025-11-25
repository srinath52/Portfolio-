import React, { useEffect, useRef } from 'react';

const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let clouds: Cloud[] = [];
    let resizeTimeout: ReturnType<typeof setTimeout>;
    let isPageVisible = true;
    
    // Mouse state
    const mouse = { x: -1000, y: -1000 };

    // Configuration
    const STAR_COUNT = window.innerWidth < 768 ? 50 : 150;
    const CLOUD_COUNT = 5;
    const CONNECTION_DISTANCE = 120; // Distance to connect stars
    const MOUSE_INFLUENCE_RADIUS = 200; // Radius where mouse affects stars

    const init = () => {
      if (!canvas) return;
      stars = [];
      clouds = [];
      
      // Initialize Stars
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star(canvas.width, canvas.height));
      }

      // Initialize Nebula Clouds
      for (let i = 0; i < CLOUD_COUNT; i++) {
        clouds.push(new Cloud(canvas.width, canvas.height));
      }
    };

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
        if (prefersReducedMotion) {
             drawStatic();
        }
      }, 200);
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

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && !prefersReducedMotion) {
        animate();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    // Event Listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // --- Particle Classes ---

    class Star {
      x: number;
      y: number;
      baseX: number; // Original position for spring back
      baseY: number;
      z: number; // Depth for parallax (0.5 to 2.5)
      size: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinkleOffset: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.baseX = this.x;
        this.baseY = this.y;
        this.z = Math.random() * 2 + 0.5; 
        this.size = Math.random() * 1.5;
        this.baseAlpha = Math.random() * 0.5 + 0.2; // Opacity 0.2 to 0.7
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
        this.twinkleOffset = Math.random() * Math.PI * 2;
      }

      update(w: number, h: number) {
        // Slow vertical drift mimicking galaxy rotation/movement
        this.baseY -= 0.15 * this.z; 
        
        // Wrap around
        if (this.baseY < 0) {
            this.baseY = h;
            this.baseX = Math.random() * w;
            // Reset current pos to avoid snapping
            this.x = this.baseX;
            this.y = this.baseY; 
        }

        // --- Interaction Logic ---
        // Calculate distance to mouse
        const dx = mouse.x - this.baseX;
        const dy = mouse.y - this.baseY;
        const dist = Math.hypot(dx, dy);

        // Magnetic Pull / Repulsion
        // Stars close to mouse get pulled slightly towards it
        if (dist < MOUSE_INFLUENCE_RADIUS) {
            const force = (MOUSE_INFLUENCE_RADIUS - dist) / MOUSE_INFLUENCE_RADIUS;
            // Gentle attraction
            this.x += (mouse.x - this.x) * force * 0.05;
            this.y += (mouse.y - this.y) * force * 0.05;
        } else {
            // Spring back to base position
            this.x += (this.baseX - this.x) * 0.05;
            this.y += (this.baseY - this.y) * 0.05;
        }
      }

      draw(ctx: CanvasRenderingContext2D, w: number, h: number, isDark: boolean) {
        const centerX = w / 2;
        const centerY = h / 2;
        
        // Parallax Offset Calculation
        let offsetX = 0;
        let offsetY = 0;
        if (mouse.x > -100) {
            offsetX = (centerX - mouse.x) * 0.02 * this.z;
            offsetY = (centerY - mouse.y) * 0.02 * this.z;
        }

        const finalX = this.x + offsetX;
        const finalY = this.y + offsetY;

        // Interactive Glow: Distance to mouse
        const dx = finalX - mouse.x;
        const dy = finalY - mouse.y;
        const dist = Math.hypot(dx, dy);
        let hoverAlpha = 0;
        
        if (dist < MOUSE_INFLUENCE_RADIUS) {
            hoverAlpha = (1 - dist / MOUSE_INFLUENCE_RADIUS) * 0.6; // Boost opacity when near mouse
        }

        // Twinkle
        const twinkle = Math.sin(Date.now() * 0.002 + this.twinkleOffset * 100 * this.twinkleSpeed);
        // Base alpha varies + twinkle effect + proximity hover effect
        const alpha = Math.max(0.1, Math.min(1, this.baseAlpha + twinkle * 0.15 + hoverAlpha));

        ctx.beginPath();
        ctx.arc(finalX, finalY, this.size * (1 + hoverAlpha * 0.5), 0, Math.PI * 2);
        
        // Color logic
        if (isDark) {
            // White/Cyan tint in dark mode
            ctx.fillStyle = `rgba(220, 255, 255, ${alpha})`;
        } else {
            // Dark gray in light mode
            ctx.fillStyle = `rgba(50, 60, 80, ${alpha})`;
        }
        ctx.fill();

        // Save calculated screen position for connector lines
        return { x: finalX, y: finalY, alpha: alpha };
      }
    }

    class Cloud {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.radius = Math.random() * 300 + 200; // Large nebula clouds
        this.vx = (Math.random() - 0.5) * 0.1; // Very slow drift
        this.vy = (Math.random() - 0.5) * 0.1;
        
        const colors = [
            'rgba(0, 243, 255, 0.04)', // Cyan
            'rgba(189, 0, 255, 0.03)', // Purple
            'rgba(76, 29, 149, 0.04)', // Deep Violet
            'rgba(56, 189, 248, 0.03)', // Light Blue
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Interaction: Move clouds slightly away from mouse (Repel)
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < 400) {
            const force = (400 - dist) / 400;
            this.x += dx * force * 0.002;
            this.y += dy * force * 0.002;
        }

        if (this.x < -this.radius) this.x = w + this.radius;
        if (this.x > w + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = h + this.radius;
        if (this.y > h + this.radius) this.y = -this.radius;
      }

      draw(ctx: CanvasRenderingContext2D, w: number, h: number, isDark: boolean) {
        if (!isDark) return;

        const centerX = w / 2;
        const centerY = h / 2;
        let offsetX = 0;
        let offsetY = 0;
        if (mouse.x > -100) {
            offsetX = (centerX - mouse.x) * 0.01;
            offsetY = (centerY - mouse.y) * 0.01;
        }

        ctx.beginPath();
        const g = ctx.createRadialGradient(
            this.x + offsetX, 
            this.y + offsetY, 
            0, 
            this.x + offsetX, 
            this.y + offsetY, 
            this.radius
        );
        
        g.addColorStop(0, this.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = g;
        ctx.arc(this.x + offsetX, this.y + offsetY, this.radius, 0, Math.PI*2);
        ctx.fill();
      }
    }

    // --- Animation Loop ---

    const drawStatic = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isDark = document.documentElement.classList.contains('dark');
        
        clouds.forEach(c => c.draw(ctx, canvas.width, canvas.height, isDark));
        stars.forEach(s => s.draw(ctx, canvas.width, canvas.height, isDark));
    }

    const animate = () => {
      if (!ctx || !canvas || !isPageVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');

      // 1. Draw Nebula Clouds
      clouds.forEach(cloud => {
        cloud.update(canvas.width, canvas.height);
        cloud.draw(ctx, canvas.width, canvas.height, isDark);
      });

      // 2. Mouse "Flashlight" Effect
      if (isDark && mouse.x > -100) {
          ctx.globalCompositeOperation = 'screen'; 
          const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
          g.addColorStop(0, 'rgba(0, 243, 255, 0.05)');
          g.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalCompositeOperation = 'source-over'; 
      }

      // 3. Update & Draw Stars + Constellation Logic
      const starPositions: {x: number, y: number, alpha: number}[] = [];
      
      stars.forEach(star => {
        star.update(canvas.width, canvas.height);
        const pos = star.draw(ctx, canvas.width, canvas.height, isDark);
        // Only consider stars near mouse for connections to save performance
        const dx = pos.x - mouse.x;
        const dy = pos.y - mouse.y;
        if (Math.hypot(dx, dy) < MOUSE_INFLUENCE_RADIUS) {
            starPositions.push(pos);
        }
      });

      // 4. Draw Constellation Connections
      if (isDark) {
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)'; // Cyan lines

          // Only loop through stars that are already determined to be near the mouse
          for (let i = 0; i < starPositions.length; i++) {
              for (let j = i + 1; j < starPositions.length; j++) {
                  const s1 = starPositions[i];
                  const s2 = starPositions[j];
                  const dx = s1.x - s2.x;
                  const dy = s1.y - s2.y;
                  const dist = Math.hypot(dx, dy);

                  if (dist < CONNECTION_DISTANCE) {
                      ctx.beginPath();
                      ctx.moveTo(s1.x, s1.y);
                      ctx.lineTo(s2.x, s2.y);
                      // Fade out line based on distance
                      const opacity = 1 - (dist / CONNECTION_DISTANCE);
                      ctx.strokeStyle = `rgba(0, 243, 255, ${opacity * 0.2})`;
                      ctx.stroke();
                  }
              }
          }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialization
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();

    if (prefersReducedMotion) {
        drawStatic();
    } else {
        animate();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default FluidBackground;