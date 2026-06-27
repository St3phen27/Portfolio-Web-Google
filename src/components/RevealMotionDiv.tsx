import React, { useRef, useState, useEffect } from "react";
import { motion, HTMLMotionProps, useInView } from "motion/react";


interface RevealMotionDivProps extends HTMLMotionProps<"div"> {
  amount?: number;
  isMobile: boolean;
  activeCondition?: boolean | string | Record<string, any>;
  mobileAnimateState?: string | Record<string, any>;
}

export const RevealMotionDiv = ({ 
  amount = 0.3, 
  isMobile, 
  activeCondition,
  mobileAnimateState,
  ...props 
}: RevealMotionDivProps) => {
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
        // If the element leaves the viewport from the bottom (meaning we scrolled up), reset it
        if (rect.top > 0) {
          setIsVisible(false);
        }
      }
    }
  }, [isInView, isMobile]);

  let animateState;
  
  if (isMobile) {
    if (mobileAnimateState) {
       animateState = isVisible ? mobileAnimateState : "hidden";
    } else {
       animateState = isVisible ? "visible" : "hidden";
    }
  } else {
    animateState = activeCondition === true ? "visible" 
      : activeCondition === false ? "hidden" 
      : activeCondition;
  }

  // Handle the case where activeCondition is an object (like { scaleX: 1 })
  if (!isMobile && typeof activeCondition === "object") {
     animateState = activeCondition;
  }

  return (
    <motion.div
      ref={ref}
      animate={animateState}
      {...props}
    />
  );
};
