import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width?: number; // Desired width for the clickable Link area
  height?: number; // Desired height for the clickable Link area.
                   // This will also be used as the dimension for the square Image component.
  className?: string; // Applied to the Link container
}

export function Logo({ width: containerWidth = 120, height: containerHeight = 40, className }: LogoProps) {
  // The logo image (/logo-entrelles.png) is expected to be square.
  // We use containerHeight as the dimension for the square Image component.
  const imageSquareSize = containerHeight;

  return (
    <Link
      href="/"
      className={className}
      style={{
        display: 'inline-flex', // Use flex to help center the image
        alignItems: 'center',
        justifyContent: 'center', // Center the image horizontally if containerWidth is > imageSquareSize
        width: containerWidth,
        height: containerHeight,
      }}
      data-testid="app-logo-link"
    >
      <Image
        src="/logo-entrelles.png" // CRITICAL: This file MUST exist at 'public/logo-entrelles.png' (in the project root's public folder)
        alt="Entrelles Application Logo" // Alt text for accessibility
        width={imageSquareSize}  // Using containerHeight for a square aspect ratio matching the logo
        height={imageSquareSize} // Using containerHeight for a square aspect ratio matching the logo
        priority // The logo is likely an LCP element, so priority is good.
        className="object-contain" // Ensures the square image fits and maintains aspect ratio.
        data-testid="app-logo-image"
      />
    </Link>
  );
}
