import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const frameCount = 192;
const PILLARS = ['Assess', 'Align', 'Accelerate', 'Achieve'] as const;

const currentFrame = (index: number) =>
  `/animation-picture/ezgif-frame-${index.toString().padStart(3, '0')}.${index === frameCount ? 'jpg' : 'webp'}`;

export default function ScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);

  // Refs for animated elements
  const vLogoRef = useRef<HTMLDivElement>(null);
  const topLeftContentRef = useRef<HTMLDivElement>(null);

  // Refs for smooth scroll interpolation
  const targetFraction = useRef(0);
  const currentFraction = useRef(0);

  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    if (!isOverlayVisible) return;
    const timer = window.setInterval(() => {
      setActivePillar((prev) => (prev + 1) % PILLARS.length);
    }, 1400);
    return () => window.clearInterval(timer);
  }, [isOverlayVisible]);

  useEffect(() => {
    let cancelled = false;
    let nextIndex = 2;
    const concurrency = 6;

    const loadImage = (index: number, onDone?: () => void) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (!cancelled) onDone?.();
      };
      img.onerror = () => {
        if (!cancelled) onDone?.();
      };
      img.src = currentFrame(index);
      imagesRef.current[index] = img;
    };

    // Load frame 1 immediately, then stream remaining WebP/JPG frames in small batches
    loadImage(1);

    const pump = () => {
      if (cancelled || nextIndex > frameCount) return;
      const idx = nextIndex++;
      loadImage(idx, pump);
    };

    for (let c = 0; c < concurrency; c++) {
      pump();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let lastVisible = false;
    const onScroll = () => {
      const visible = window.scrollY > 300;
      if (visible !== lastVisible) {
        lastVisible = visible;
        setShowTopBtn(visible);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    let cachedTop = container.offsetTop;
    let cachedMaxScroll = Math.max(1, container.scrollHeight - window.innerHeight);

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cachedTop = container.offsetTop;
      cachedMaxScroll = Math.max(1, container.scrollHeight - window.innerHeight);
    };

    setCanvasSize();

    const drawImageProp = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
      if (!img.complete || img.naturalWidth === 0) return false;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;

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

      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
      return true;
    };

    let lastDrawnFrame = -1;
    let lastAppliedFraction = -1;
    let lastOverlayVisible = false;
    let isInView = true;
    let animationFrameId: number | null = null;

    const updateImage = (index: number) => {
      if (index === lastDrawnFrame) return;

      const img = imagesRef.current[index];
      if (img && img.complete && img.naturalWidth > 0) {
        if (drawImageProp(context, img)) {
          lastDrawnFrame = index;
        }
        return;
      }

      // If target frame is still decoding, fall back to nearest loaded frame and draw target on load
      if (img) {
        const targetIndex = index;
        img.addEventListener(
          'load',
          () => {
            if (lastDrawnFrame < targetIndex) {
              if (drawImageProp(context, img)) {
                lastDrawnFrame = targetIndex;
              }
            }
          },
          { once: true }
        );
      }

      for (let fallback = index - 1; fallback >= 1; fallback--) {
        const fbImg = imagesRef.current[fallback];
        if (fbImg && fbImg.complete && fbImg.naturalWidth > 0) {
          if (fallback !== lastDrawnFrame && drawImageProp(context, fbImg)) {
            lastDrawnFrame = fallback;
          }
          break;
        }
      }
    };

    // Draw first frame immediately if ready
    const firstImg = imagesRef.current[1];
    if (firstImg) {
      if (firstImg.complete && firstImg.naturalWidth > 0) {
        if (drawImageProp(context, firstImg)) lastDrawnFrame = 1;
      } else {
        firstImg.addEventListener(
          'load',
          () => {
            if (lastDrawnFrame === -1 && drawImageProp(context, firstImg)) {
              lastDrawnFrame = 1;
            }
          },
          { once: true }
        );
      }
    }

    const applyDOMTransforms = (scrollFraction: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMd = w >= 768;

      // Laptop origin coordinates on screen
      const laptopX = w * 0.485;
      const laptopY = h * 0.58;

      // Header target logo coordinates
      const headerX = isMd ? 64 : 32;
      const headerY = 32;

      // -----------------------------------------------------------------
      // TIMELINE 1 & 2: V Logo Reveal from Behind Laptop & Move to Header
      // -----------------------------------------------------------------
      if (vLogoRef.current) {
        if (scrollFraction <= 0.01) {
          vLogoRef.current.style.opacity = '0';
          vLogoRef.current.style.transform = `translate3d(${laptopX}px, ${laptopY + 20}px, 0) scale(0.35)`;
        } else if (scrollFraction < 0.20) {
          const riseT = scrollFraction / 0.20;
          const easeRise = 1 - Math.pow(1 - riseT, 3);
          const currentY = laptopY - easeRise * 90;
          const currentScale = 0.4 + easeRise * 0.75;
          const currentOpacity = Math.min(1, riseT * 2.5);

          vLogoRef.current.style.opacity = currentOpacity.toString();
          vLogoRef.current.style.transform = `translate3d(${laptopX}px, ${currentY}px, 0) scale(${currentScale})`;
        } else if (scrollFraction < 0.45) {
          const moveT = (scrollFraction - 0.20) / 0.25;
          const easeMove = Math.sin((moveT * Math.PI) / 2);

          const startRiseY = laptopY - 90;
          const cpX = w * 0.25;
          const cpY = h * 0.15;

          const posX = (1 - easeMove) * (1 - easeMove) * laptopX + 2 * (1 - easeMove) * easeMove * cpX + easeMove * easeMove * headerX;
          const posY = (1 - easeMove) * (1 - easeMove) * startRiseY + 2 * (1 - easeMove) * easeMove * cpY + easeMove * easeMove * headerY;
          const scaleVal = moveT > 0.85 ? 1.0 + (1 - moveT) * 0.6 : 1.15 - moveT * 0.15;

          vLogoRef.current.style.opacity = '1';
          vLogoRef.current.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(${scaleVal})`;
        } else {
          vLogoRef.current.style.opacity = '1';
          vLogoRef.current.style.transform = `translate3d(${headerX}px, ${headerY}px, 0) scale(1)`;
        }
      }

      // -----------------------------------------------------------------
      // TIMELINE 3: Application Content Reveal (Top-Left Area)
      // -----------------------------------------------------------------
      const nextOverlayVisible = scrollFraction >= 0.18 && scrollFraction < 0.56;
      if (nextOverlayVisible !== lastOverlayVisible) {
        lastOverlayVisible = nextOverlayVisible;
        setIsOverlayVisible(nextOverlayVisible);
      }

      if (topLeftContentRef.current) {
        if (scrollFraction < 0.18) {
          topLeftContentRef.current.style.opacity = '0';
          topLeftContentRef.current.style.transform = 'translate3d(0, 24px, 0)';
          topLeftContentRef.current.style.pointerEvents = 'none';
        } else if (scrollFraction < 0.32) {
          const fadeT = (scrollFraction - 0.18) / 0.14;
          const easeFade = 1 - Math.pow(1 - fadeT, 3);
          const transY = (1 - easeFade) * 20;

          topLeftContentRef.current.style.opacity = easeFade.toString();
          topLeftContentRef.current.style.transform = `translate3d(0, ${transY}px, 0)`;
          topLeftContentRef.current.style.pointerEvents = 'auto';
        } else if (scrollFraction <= 0.46) {
          topLeftContentRef.current.style.opacity = '1';
          topLeftContentRef.current.style.transform = 'translate3d(0, 0, 0)';
          topLeftContentRef.current.style.pointerEvents = 'auto';
        } else if (scrollFraction < 0.56) {
          const fadeOutT = (scrollFraction - 0.46) / 0.10;
          const easeFadeOut = Math.max(0, 1 - fadeOutT);
          const transY = -fadeOutT * 18;

          topLeftContentRef.current.style.opacity = easeFadeOut.toString();
          topLeftContentRef.current.style.transform = `translate3d(0, ${transY}px, 0)`;
          topLeftContentRef.current.style.pointerEvents = 'none';
        } else {
          topLeftContentRef.current.style.opacity = '0';
          topLeftContentRef.current.style.pointerEvents = 'none';
        }
      }
    };

    const renderLoop = () => {
      const diff = targetFraction.current - currentFraction.current;
      const isSettled = Math.abs(diff) < 0.0003;

      if (isSettled) {
        currentFraction.current = targetFraction.current;
      } else {
        currentFraction.current += diff * 0.14;
      }

      const scrollFraction = currentFraction.current;

      if (Math.abs(scrollFraction - lastAppliedFraction) > 0.0001 || lastAppliedFraction === -1) {
        lastAppliedFraction = scrollFraction;

        if (isInView) {
          let frameIndex = 1;
          if (scrollFraction > 0.35) {
            const pictureProgress = (scrollFraction - 0.35) / 0.65;
            frameIndex = Math.min(frameCount, Math.max(1, Math.floor(pictureProgress * frameCount) + 1));
          }
          updateImage(frameIndex);
        }

        applyDOMTransforms(scrollFraction);
      }

      if (!isSettled) {
        animationFrameId = requestAnimationFrame(renderLoop);
      } else {
        animationFrameId = null;
      }
    };

    const scheduleRender = () => {
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY - cachedTop;
      targetFraction.current = Math.max(0, Math.min(1, scrollTop / cachedMaxScroll));
      scheduleRender();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) {
          lastDrawnFrame = -1;
          lastAppliedFraction = -1;
          scheduleRender();
        }
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(container);

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      setCanvasSize();
      lastDrawnFrame = -1;
      lastAppliedFraction = -1;
      handleScroll();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      {/* 2. Floating Animated V Logo / Favicon (Emerges from behind laptop & docks to Header) */}
      <div
        ref={vLogoRef}
        className="fixed top-0 left-0 z-[101] pointer-events-none will-change-transform origin-top-left"
        style={{
          width: 'clamp(44px, 5vw, 56px)',
          height: 'clamp(44px, 5vw, 56px)',
          opacity: 0
        }}
      >
        <img
          src="/icon.png"
          alt="Vabsgen Logo Icon"
          className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(249,115,22,0.4)]"
        />
      </div>

      {/* 3. Application Content Reveal (Top-Left Area, under Header) */}
      <div
        ref={topLeftContentRef}
        className="fixed top-24 md:top-28 left-8 right-8 md:left-16 md:right-16 z-50 pointer-events-none max-w-[680px] lg:max-w-[760px] xl:max-w-[820px] opacity-0 will-change-transform flex flex-col items-start text-left gap-3.5"
      >
        <h2 className="w-full text-3xl sm:text-4xl lg:text-[40px] font-black text-stone-900 tracking-tight leading-[1.15] text-left">
          Bridging Education and{' '}
          <br className="hidden sm:inline" />
          <span className="text-[#f97316]">Industry Through AI</span>
        </h2>

        <p className="w-full text-stone-600 text-[15px] sm:text-base lg:text-[17px] font-normal leading-relaxed text-left">
          Empowering students with{' '}
          <span className="text-[#ea580c] font-medium">AI-powered assessments</span>,{' '}
          <span className="text-amber-600 font-medium">personalized learning</span>,{' '}
          <br className="hidden md:inline" />
          and{' '}
          <span className="text-[#f97316] font-medium">intelligent mock interviews</span>{' '}
          to build{' '}
          <span className="text-stone-800 font-semibold">career readiness</span>.
        </p>

          <div
            className="relative inline-flex flex-wrap items-center gap-1 sm:gap-1.5 rounded-2xl bg-white/85 backdrop-blur-md border border-orange-500/25 shadow-[0_8px_28px_-8px_rgba(249,115,22,0.28)] overflow-hidden"
            style={{ padding: '5px' }}
          >
            {isOverlayVisible && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-orange-400/15 to-transparent"
                animate={{ x: ['-120%', '360%'] }}
                transition={{ repeat: Infinity, duration: 3.0, ease: 'easeInOut', repeatDelay: 0.6 }}
              />
            )}

            {PILLARS.map((pillar, index) => {
              const isCurrent = activePillar === index;
              return (
                <div key={pillar} className="inline-flex items-center gap-1 sm:gap-1.5">
                  <div
                    className="relative inline-flex items-center justify-center rounded-xl text-xs sm:text-[13px] font-bold tracking-wide leading-none select-none"
                    style={{ padding: '7px 12px' }}
                  >
                    {isCurrent && (
                      <motion.span
                        layoutId="heroPillarHighlight"
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] shadow-[0_3px_12px_rgba(249,115,22,0.38)]"
                      />
                    )}
                    <span
                      className={`relative z-10 inline-flex items-center gap-1.5 transition-colors duration-300 ${isCurrent ? 'text-white' : 'text-stone-700'
                        }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isCurrent ? 'bg-white' : 'bg-orange-400/80'
                          }`}
                      />
                      <span>{pillar}</span>
                    </span>
                  </div>

                  {index < PILLARS.length - 1 && (
                    <motion.span
                      aria-hidden="true"
                      animate={
                        isOverlayVisible && activePillar === index
                          ? { x: [0, 2.5, 0], opacity: 1 }
                          : { x: 0, opacity: activePillar > index ? 0.85 : 0.45 }
                      }
                      transition={{ duration: 0.9, repeat: activePillar === index ? Infinity : 0, ease: 'easeInOut' }}
                      className="inline-flex items-center justify-center text-orange-500"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Hero Canvas Container */}
        <div
          ref={containerRef}
          style={{
            height: '420vh',
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
