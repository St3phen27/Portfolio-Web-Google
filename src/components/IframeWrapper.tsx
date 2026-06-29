import React, { useState } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const IframeWrapper = ({ src, className, title }: { src: string, className: string, title: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && <LoadingSkeleton className={className} />}
      <iframe
        src={src}
        className={`${className} ${isLoading ? 'hidden' : 'block'}`}
        title={title}
        onLoad={() => setIsLoading(false)}
        allow="autoplay"
      />
    </>
  );
};
