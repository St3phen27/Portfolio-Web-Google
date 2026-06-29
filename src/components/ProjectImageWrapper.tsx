import React, { useState } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ParallaxCard } from "./ParallaxCard";

export const ProjectImageWrapper = ({ src, alt, className }: { src: string, alt: string, className: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <ParallaxCard className="absolute inset-0">
      {isLoading && <LoadingSkeleton className={className} />}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'hidden' : 'block'}`}
        onLoad={() => setIsLoading(false)}
        referrerPolicy="no-referrer"
      />
    </ParallaxCard>
  );
};
