import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export default function LoginButton() {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!isHovered) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const orbitRadius = 26;

    const colors = ['#fde047', '#f97316', '#fb923c', '#ea580c', '#ffffff'];
    const particles: Particle[] = [];
    let angle = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Advance orbit rotation
      angle += 0.12;

      // Spawn spark particles around the perimeter
      for (let i = 0; i < 3; i++) {
        const sparkAngle = angle + (Math.random() - 0.5) * 0.8;
        const speed = 1.2 + Math.random() * 2.4;
        const spread = (Math.random() - 0.5) * 0.9;

        // Tangential + radial outward velocity
        const vx = Math.cos(sparkAngle + Math.PI / 2) * speed * 0.7 + Math.cos(sparkAngle) * (speed * 0.6);
        const vy = Math.sin(sparkAngle + Math.PI / 2) * speed * 0.7 + Math.sin(sparkAngle) * (speed * 0.6);

        particles.push({
          x: centerX + Math.cos(sparkAngle) * orbitRadius + (Math.random() - 0.5) * 4,
          y: centerY + Math.sin(sparkAngle) * orbitRadius + (Math.random() - 0.5) * 4,
          vx: vx + spread,
          vy: vy + spread,
          size: 1.5 + Math.random() * 2.5,
          alpha: 1,
          decay: 0.035 + Math.random() * 0.04,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      // Draw and update sparks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ctx.clearRect(0, 0, width, height);
    };
  }, [isHovered]);

  return (
    <a
      href="https://ailms.vabsgen.com/login"
      aria-label="Login to Platform"
      className="fixed top-8 right-8 md:right-16 z-[100] pointer-events-auto flex items-center justify-center select-none"
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 800)}
    >
      <div className="relative flex items-center justify-center w-16 h-16">
        
        {/* Dynamic Sparks & Firecracker Particles Canvas */}
        <canvas
          ref={canvasRef}
          width={128}
          height={128}
          className="absolute -inset-4 w-24 h-24 pointer-events-none z-10"
        />

        {/* Outer Rotating Glowing Trail Ring */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              rotate: { repeat: Infinity, duration: 1.2, ease: 'linear' },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            className="absolute inset-1 rounded-full border-2 border-dashed border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.9),inset_0_0_12px_rgba(251,146,60,0.6)] pointer-events-none"
          />
        )}

        {/* Ambient Glow Aura */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-orange-600/40 via-amber-500/30 to-orange-400/40 blur-md transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
          }`}
        />

        {/* Main Icon Button Container */}
        <div
          className={`relative z-20 flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${
            isHovered
              ? 'bg-gradient-to-br from-orange-500 to-amber-600 border-orange-300 shadow-[0_0_24px_rgba(249,115,22,0.85)] scale-105'
              : 'bg-black/80 backdrop-blur-md border-orange-500/40 shadow-[0_2px_12px_rgba(249,115,22,0.25)] hover:border-orange-500 scale-100'
          }`}
        >
          {/* Animated Spinning Icon */}
          <motion.div
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isHovered
                ? { repeat: Infinity, duration: 0.9, ease: 'linear' }
                : { duration: 0.25, ease: 'easeOut' }
            }
            className="flex items-center justify-center"
          >
            <LogIn
              className={`w-5 h-5 transition-colors duration-200 ${
                isHovered ? 'text-white' : 'text-[#f97316]'
              }`}
              strokeWidth={2.5}
            />
          </motion.div>
        </div>

      </div>
    </a>
  );
}

