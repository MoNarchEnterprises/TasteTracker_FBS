
import Image from 'next/image';
import type { HTMLAttributes } from 'react';

interface TasteTrackerLogoProps extends HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  className?: string;
}

export function TasteTrackerLogo({ width, height, className, ...props }: TasteTrackerLogoProps) {
  return (
    <div className={className} {...props}>
      <Image
        src="/images/logo.png" // Ensure your logo file is at public/images/logo.png
        alt="TasteTracker Logo"
        width={width}
        height={height}
        priority // If it's often LCP
      />
    </div>
  );
}
