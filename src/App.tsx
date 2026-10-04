import { useEffect } from 'react';
import ScrollAnimation from './components/ScrollAnimation';

import SuccessCarousel from './components/SuccessCarousel';
import ContentSection from './components/ContentSection';
import Lenis from 'lenis';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initialize Intersection Observer for reveal animations (.rv -> .in)
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // trigger when 15% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          // Optional: stop observing once revealed
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.rv');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <main style={{ backgroundColor: 'black' }}>
      <ScrollAnimation />

      <SuccessCarousel />
      <ContentSection />
    </main>
  );
}

export default App;
