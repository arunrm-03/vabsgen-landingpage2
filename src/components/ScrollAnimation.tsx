import { useEffect, useRef, useState } from 'react';
const frameCount = 200;

const currentFrame = (index: number) =>
  `/animation-picture/ezgif-frame-${index.toString().padStart(3, '0')}.png`;

export default function ScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const blackTextRef = useRef<HTMLDivElement>(null);
  const orangeTextRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Refs for smooth scroll interpolation
  const targetFraction = useRef(0);
  const currentFraction = useRef(0);

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    // Preload images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imagesRef.current[i] = img;
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    const drawImageProp = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
      if (!img.complete || img.naturalWidth === 0) return; // ensure image is loaded

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let renderWidth = canvas.width;
      let renderHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        renderHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - renderWidth) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    const updateImage = (index: number) => {
      const img = imagesRef.current[index];
      if (img) {
        if (img.complete) {
          drawImageProp(context, img);
        } else {
          img.onload = () => drawImageProp(context, img);
        }
      }
    };

    // Draw first frame
    const firstImg = new Image();
    firstImg.src = currentFrame(1);
    firstImg.onload = () => {
      drawImageProp(context, firstImg);
    };

    let animationFrameId: number;

    const renderLoop = () => {
      // Lerp (smoothly interpolate) current fraction towards target fraction
      currentFraction.current += (targetFraction.current - currentFraction.current) * 0.1;

      const scrollFraction = currentFraction.current;

      let frameIndex = 1;
      // Text animation happens in the first 40% of scroll. Picture stays on frame 1.
      // After 40% (scrollFraction > 0.4), the picture animation begins playing.
      if (scrollFraction > 0.4) {
        const pictureProgress = (scrollFraction - 0.4) / 0.6;
        frameIndex = Math.min(frameCount, Math.max(1, Math.floor(pictureProgress * frameCount) + 1));
      }

      updateImage(frameIndex);

      if (blackTextRef.current) {
        // Fade out black text between 5% and 15% scroll
        const fadeOutProgress = Math.max(0, Math.min(1, (scrollFraction - 0.05) * 10));
        blackTextRef.current.style.opacity = (1 - fadeOutProgress).toString();
      }

      if (orangeTextRef.current) {
        // Fade in orange text between 15% and 25% scroll
        const fadeInProgress = Math.max(0, Math.min(1, (scrollFraction - 0.15) * 10));
        // Fade out orange text between 40% and 50% scroll (when logo comes in)
        const fadeOutProgress = Math.max(0, Math.min(1, (scrollFraction - 0.40) * 10));
        
        orangeTextRef.current.style.opacity = Math.max(0, fadeInProgress - fadeOutProgress).toString();
      }

      if (logoRef.current) {
        // Logo animates in between 40% and 50% scroll
        const logoProgress = Math.max(0, Math.min(1, (scrollFraction - 0.4) * 10));

        // Smooth ease out easing
        const easeOut = 1 - Math.pow(1 - logoProgress, 3);

        // Translate from 50vw offscreen to 0
        const translateX = (1 - easeOut) * 50;

        // Fade out the logo earlier (around the 2nd/3rd scroll transition, scroll > 55%)
        const fadeOutProgress = Math.max(0, Math.min(1, (scrollFraction - 0.55) * 10));

        // Final opacity: animate in, then animate out
        const finalOpacity = Math.max(0, logoProgress - fadeOutProgress);

        logoRef.current.style.opacity = finalOpacity.toString();
        logoRef.current.style.transform = `translateX(${translateX}vw)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Start the render loop
    renderLoop();

    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY - containerRef.current.offsetTop;
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight;

      // Update target, but let the renderLoop handle the actual drawing
      targetFraction.current = Math.max(0, Math.min(1, scrollTop / maxScroll));
    };

    // Trigger an initial scroll calculation to set correct target
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      setCanvasSize();
      handleScroll(); // re-draw current frame
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Black Text (Initial) */}
      <div className="fixed top-6 left-8 z-50 pointer-events-none">
        <div 
          ref={blackTextRef}
          className="text-black text-4xl md:text-6xl font-extrabold leading-tight w-[90vw] sm:w-[600px] will-change-[opacity]"
        >
          Build Career-Ready <br /> Students With <br /> AI Powered Learning
        </div>
      </div>

      {/* Orange Text (After scroll) */}
      <div 
        ref={orangeTextRef}
        className="fixed top-1/2 left-8 -translate-y-1/2 z-50 pointer-events-none text-left text-orange-500 text-4xl md:text-6xl font-extrabold leading-tight w-[90vw] sm:w-[800px] opacity-0 will-change-[opacity]"
        style={{ textShadow: '0 2px 10px rgba(234,88,12,0.3)' }}
      >
        Start Your Career with Vabsgen <br /> Take Your First Step Toward Success.
      </div>
      <div
        ref={containerRef}
        style={{
          height: '500vh',
          backgroundColor: '#000',
          position: 'relative'
        }}
      >
        <div ref={triggerRef} style={{ position: 'absolute', top: '100vh', height: '100vh', width: '1px' }} />
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100vw',
            overflow: 'hidden'
          }}
        >
          <canvas ref={canvasRef} />


          <img
            ref={logoRef}
            src="/logo.png"
            alt="Logo"
            style={{
              position: 'absolute',
              top: '15%',
              right: '10%',
              transform: 'translateX(50vw)',
              opacity: 0,
              width: 'clamp(200px, 30vw, 400px)',
              pointerEvents: 'none',
              willChange: 'transform, opacity',
              filter: 'drop-shadow(0px 10px 30px rgba(251, 146, 60, 0.4))' // Added an orange glow to match the theme
            }}
          />
        </div>
      </div>
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: '60px',
          right: '100px',
          zIndex: 9999,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f97316, #fb923c)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(249,115,22,0.5)',
          opacity: showTopBtn ? 1 : 0,
          pointerEvents: showTopBtn ? 'auto' : 'none',
          transform: showTopBtn ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
        aria-label="Scroll to top"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  );
}
