import { useState, useEffect, useRef } from "react";

export function useScrollReveal(threshold = 0.2) {
  const ref = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the element is visible
      const elementHeight = rect.height;
      
      // If the element is above the screen (scrolled past), keep it visible
      if (rect.bottom < windowHeight * threshold) {
        setIsVisible(true);
        return;
      }
      
      // If it's entering from bottom
      if (rect.top < windowHeight - (elementHeight * threshold)) {
        setIsVisible(true);
      } else if (rect.top > windowHeight - (elementHeight * (threshold / 2))) {
        // Reset when it goes below the screen
        setIsVisible(false);
      }
    };

    // Use intersection observer as a base to trigger the scroll check
    const observer = new IntersectionObserver(
      (entries) => {
        handleScroll();
      },
      { threshold: [0, threshold] }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const container = document.querySelector('main');
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    setTimeout(handleScroll, 100);

    return () => {
      observer.disconnect();
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { ref, isVisible };
}
