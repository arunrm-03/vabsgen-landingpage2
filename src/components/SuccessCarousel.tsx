import { useState, useRef, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    title: "Attract & Discover",
    desc: <>Identify innate strengths and hidden potential. We comprehensively <strong>map each student's unique capabilities</strong> against real-time industry demands to find where they truly belong.</>,
    subtitle: "Deep Profiling Algorithm",
    subtext: "Map True Potential //",
    img: "/coursel-img/slide1.png"
  },
  {
    title: "Bridge the Gap",
    desc: <>Eliminate the void between academic curriculum and corporate expectations through <strong>highly personalized, AI-driven learning paths</strong> designed for rapid skill acquisition.</>,
    subtitle: "Adaptive Learning",
    subtext: "Accelerate Skill Growth //",
    img: "/coursel-img/slide2.png"
  },
  {
    title: "Elevate Talent",
    desc: <>Transform theoretical knowledge into practical expertise. Our intelligent guidance system provides <strong>continuous, real-world coaching</strong> and immersive interview preparation.</>,
    subtitle: "Intelligent Coaching",
    subtext: "Master The Interview //",
    img: "/coursel-img/slide3.png"
  },
  {
    title: "Launch Careers",
    desc: <>Connect perfectly-prepared students with <strong>exclusive, top-tier corporate opportunities</strong>. We bypass traditional placement models to architect <strong>sustainable, high-growth careers</strong> for every individual.</>,
    subtitle: "Strategic Placements",
    subtext: "Secure Top Roles //",
    img: "/coursel-img/slide4.png"
  }
];

export default function SuccessCarousel() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      
      // Calculate how far we've scrolled into the container (0 to 1)
      const scrollProgress = -top / (height - window.innerHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Divide progress into chunks based on number of slides
      const newIndex = Math.min(
        slides.length - 1, 
        Math.floor(clampedProgress * slides.length)
      );
      
      setCurrent(newIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger immediately to set correct initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const activeSlide = slides[current];

  return (
    <section ref={containerRef} className="h-[400vh] bg-black text-white relative">
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
            
            <p className="text-[#a1a1aa] text-[16px] leading-[1.6] max-w-md mb-12 flex flex-wrap gap-2">
              <span>AI Profiling</span> &rarr;
              <span>Skill Gap Analysis</span> &rarr;
              <span>Custom Learning Paths</span> &rarr;
              <span>Interview Prep</span> &rarr;
              <span>Top-Tier Placements</span>
            </p>


          </div>

          {/* Right Carousel Card */}
          <div className="lg:col-span-8 relative h-[450px] w-full">
            <div className="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
              
              {/* Image Half */}
              <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-black md:border-r border-white/5">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeSlide.img}
                    src={activeSlide.img} 
                    alt={activeSlide.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Text Half */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeSlide.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
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
                      <div className="text-gray-600 font-medium text-sm mt-2">
                        {current + 1} / {slides.length}
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
