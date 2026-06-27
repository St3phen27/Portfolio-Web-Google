import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  amount?: number;
  isMobile: boolean;
}

export const ScrollReveal = ({ children, amount = 0.3, isMobile }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isMobile) return;
    
    if (isInView) {
      setIsVisible(true);
    } else {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        // If the element has gone below the viewport (user scrolled up)
        if (rect.top >= window.innerHeight * 0.8) {
          setIsVisible(false);
        }
      }
    }
  }, [isInView, isMobile]);
  
  if (!isMobile) {
    return <>{children}</>;
  }

  // Inject the animate state into the child motion component
  const wrappedChild = React.isValidElement(children) 
    ? React.cloneElement(children as React.ReactElement<any>, {
        animate: isVisible ? "visible" : "hidden",
        whileInView: undefined,
        viewport: undefined
      })
    : children;

  return (
    <div ref={ref} className="w-full h-full flex flex-col justify-start">
      {wrappedChild}
    </div>
  );
};
