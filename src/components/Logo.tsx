import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width?: number; // Desired width for the clickable Link area
  height?: number; // Desired height for the clickable Link area.
                   // This will also be used as the dimension for the square Image component.
  className?: string; // Applied to the Link container
}

export function Logo({ width: containerWidth = 120, height: containerHeight = 40, className }: LogoProps) {
  const imageSquareSize = containerHeight;

  return (
    <Link
      href="/home" // Updated to link to /home, the main application page
      className={className}
      style={{
        display: 'inline-flex', 
        alignItems: 'center',
        justifyContent: 'center', 
        width: containerWidth,
        height: containerHeight,
      }}
      data-testid="app-logo-link"
    >
      <Image
        src="/logo-entrelles.png" // Ensure this file exists at 'public/logo-entrelles.png'
        alt="Logo Entrelles" 
        width={imageSquareSize}
        height={imageSquareSize}
        priority 
        className="object-contain" 
        data-testid="app-logo-image"
      />
    </Link>
  );
}
