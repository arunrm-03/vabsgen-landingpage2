import { useState, useRef, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    title: "AI Career Roadmap & Profiling",
    desc: <>Identify innate strengths and hidden potential. We comprehensively <strong>map each student's unique capabilities</strong> against real-time industry demands to architect a personalized AI Career Roadmap.</>,
    subtitle: "Deep Profiling Algorithm",
    subtext: "Map True Potential //",
    img: "/coursel-img/slide1.webp"
  },
  {
    title: "AI Learning Platform & Skill Paths",
    desc: <>Eliminate the void between academic curriculum and corporate expectations through <strong>highly personalized, AI-driven learning paths</strong> designed for rapid skill acquisition.</>,
    subtitle: "Adaptive Learning",
    subtext: "Accelerate Skill Growth //",
    img: "/coursel-img/slide2.webp"
  },
  {
    title: "AI Mock Interview & Voice Practice",
    desc: <>Transform theoretical knowledge into practical expertise. Our intelligent system provides <strong>continuous, conversational AI voice interviews</strong> and immersive real-world coaching.</>,
    subtitle: "Intelligent Coaching",
    subtext: "Master The Interview //",
    img: "/coursel-img/slide3.webp"
  },
  {
    title: "Student Placement Training & Job Readiness",
    desc: <>Connect perfectly-prepared students with <strong>exclusive, top-tier corporate opportunities</strong>. We bypass traditional placement models to architect <strong>sustainable, high-growth careers</strong> for every individual.</>,
    subtitle: "Strategic Placements",
    subtext: "Secure Top Roles //",
    img: "/coursel-img/slide4.webp"
  }
];

export default function SuccessCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLElement>(null);
  const currentRef = useRef(0);

  useEffect(() => {
    // Preload carousel images once for instant zero-lag switching
    slides.forEach((s) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = s.img;
    });

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const { top, height } = containerRef.current.getBoundingClientRect();
            const scrollProgress = -top / (height - window.innerHeight);
            const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
            const newIndex = Math.min(
              slides.length - 1,
              Math.floor(clampedProgress * slides.length)
            );
              if (newIndex !== currentRef.current) {
                setDirection(newIndex > currentRef.current ? 1 : -1);
                currentRef.current = newIndex;
                setCurrent(newIndex);
              }
            }
            ticking = false;
          });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

const activeSlide = slides[current];

return (
  <section ref={containerRef} className="h-[280vh] bg-black text-white relative">
    <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

        {/* Left Content */}
        <div className="lg:col-span-4 flex flex-col pr-0 lg:pr-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="tag">How we Solve</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-10 tracking-tight">
            The Student Success <br />
            Systems We Use
          </h2>

          <p className="text-[#a1a1aa] text-[15px] leading-[1.6] max-w-md mb-12 flex flex-wrap gap-2">
            <span>AI Profiling</span> &rarr;
            <span>AI Career Roadmap</span> &rarr;
            <span>AI Learning Platform</span> &rarr;
            <span>AI Voice Interview</span> &rarr;
            <span>Placement Training</span>
          </p>


        </div>

        {/* Right Carousel Card */}
        <div className="lg:col-span-8 relative h-[450px] w-full">
          <div className="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">

            {/* Image Half */}
            <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-black md:border-r border-white/5">
              <AnimatePresence custom={direction} initial={false}>
                <motion.img
                  key={activeSlide.img}
                  src={activeSlide.img}
                  alt={activeSlide.title}
                  custom={direction}
                  initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
                  animate={{ x: '0%', opacity: 1 }}
                  exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
                  transition={{
                    x: { type: 'spring', stiffness: 260, damping: 28 },
                    opacity: { duration: 0.3 }
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Text Half */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative z-10 overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={activeSlide.title}
                  custom={direction}
                  initial={{ y: direction > 0 ? 16 : -16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: direction > 0 ? -16 : 16, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="flex flex-col h-full justify-center py-2 text-center items-center"
                >
                  <div className="flex flex-col items-center">
                    <h3 className="text-[18px] font-bold text-white mb-2 tracking-tight">{activeSlide.title}</h3>
                    <p className="text-[#a1a1aa] text-[15px] leading-[1.6]">
                      {activeSlide.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center justify-center w-full">
                    <div className="mb-3">
                      <h4 className="text-[16px] font-bold text-white mb-1">{activeSlide.subtitle}</h4>
                      <p className="text-[#a1a1aa] text-[14.5px]">{activeSlide.subtext}</p>
                    </div>

                    {/* Professional slide indicator pills */}
                    <div className="flex items-center gap-2 mt-2">
                      {slides.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${idx === current
                              ? 'w-8 bg-gradient-to-r from-[#f97316] to-[#fb923c]'
                              : 'w-2 bg-white/20'
                            }`}
                        />
                      ))}
                    </div>

                    <div className="text-gray-500 font-medium text-xs mt-2 tracking-wider">
                      0{current + 1} / 0{slides.length}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
);
}
