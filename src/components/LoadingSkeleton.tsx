import React from "react";

export const LoadingSkeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-800 ${className}`} />
);
