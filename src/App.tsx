import { useEffect } from 'react';
import ScrollAnimation from './components/ScrollAnimation';
import Storytelling3D from './components/Storytelling3D';
import SuccessCarousel from './components/SuccessCarousel';
import ContentSection from './components/ContentSection';
import LoginButton from './components/LoginButton';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll with natural, free momentum
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.75,
      syncTouch: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    // Initialize Intersection Observer for reveal animations (.rv -> .in)
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const attachObservers = () => {
      const revealElements = document.querySelectorAll('.rv:not(.in)');
      revealElements.forEach(el => observer.observe(el));
    };

    attachObservers();
    const timeoutId = setTimeout(attachObservers, 350);

    return () => {
      clearTimeout(timeoutId);
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <main style={{ backgroundColor: 'black' }}>
      <LoginButton />

      {/* 1. Preserved Initial Landing Hero Screen (character image, orange hoodie, laptop, desk, white background, Login button) */}
      <ScrollAnimation />

      {/* 2, 3, 4. 3D Book, Realistic Butterfly & Brand Reveal Animation */}
      <Storytelling3D />

      {/* 5. Scroll Storytelling: Success Systems Carousel & Content Sections */}
      <SuccessCarousel />
      <ContentSection />
    </main>
  );
}

export default App;
