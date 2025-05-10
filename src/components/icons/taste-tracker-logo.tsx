import type { SVGProps } from 'react';

export function TasteTrackerLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 125" // Adjusted viewBox for a typical pin shape with a bit more height
      fill="none"
      {...props}
    >
      {/* Pin Shape */}
      <path
        d="M50 115C50 115 85 75 85 47.5C85 22.3482 69.6518 5 50 5C30.3482 5 15 22.3482 15 47.5C15 75 50 115 50 115Z"
        fill="hsl(var(--background))" // Use background color for pin fill
        stroke="hsl(var(--foreground))" // Use foreground for pin stroke
        strokeWidth="3"
      />

      {/* Inner Circle for Quadrants */}
      <circle cx="50" cy="47.5" r="30" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />

      {/* Quadrants */}
      {/* Top-left (Red) */}
      <path d="M50 47.5 L20 47.5 A30 30 0 0 1 50 17.5 Z" fill="#FF0000" />
      {/* Top-right (Green) */}
      <path d="M50 47.5 L50 17.5 A30 30 0 0 1 80 47.5 Z" fill="#00FF00" />
      {/* Bottom-left (Yellow) */}
      <path d="M50 47.5 L20 47.5 A30 30 0 0 0 50 77.5 Z" fill="#FFFF00" />
      {/* Bottom-right (Cyan) */}
      <path d="M50 47.5 L50 77.5 A30 30 0 0 0 80 47.5 Z" fill="#00FFFF" />

      {/* Food Truck Silhouette */}
      {/* Truck Body (White) */}
      <path
        d="M35 40 Q33 38 33 35 L50 35 L70 35 Q72 38 70 40 L70 58 L65 62 L40 62 L35 58 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Window */}
      <rect x="42" y="38" width="15" height="10" fill="#000000" />
      {/* Serving hatch area */}
       <line x1="33" y1="42" x2="25" y2="38" stroke="#000000" strokeWidth="1.5" />
       <line x1="25" y1="38" x2="25" y2="48" stroke="#000000" strokeWidth="1.5" />


      {/* Lower panel (Yellow) */}
      <rect x="35" y="53" width="35" height="7" fill="#FFFF00" stroke="#000000" strokeWidth="1" />
      
      {/* Wheels (Black with white hub) */}
      <circle cx="42" cy="63" r="4" fill="#000000" />
      <circle cx="42" cy="63" r="1.5" fill="#FFFFFF" />
      <circle cx="63" cy="63" r="4" fill="#000000" />
      <circle cx="63" cy="63" r="1.5" fill="#FFFFFF" />

      {/* Pin bottom circle */}
      <circle cx="50" cy="90" r="7" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <circle cx="50" cy="90" r="3" fill="hsl(var(--foreground))" />
    </svg>
  );
}
