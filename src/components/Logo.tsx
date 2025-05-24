import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width?: number; // Desired width for the clickable area
  height?: number; // Desired height for the clickable area, also used as the dimension for the square image
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
    >
      <Image
        src="/logo-entrelles.png" // This component displays the Entrelles logo, expecting logo-entrelles.png in the /public folder
        alt="Entrelles Logo"
        width={imageSquareSize}  // Use a square dimension for the Image component
        height={imageSquareSize} // Use a square dimension for the Image component
        priority
        className="object-contain" // Ensures the square image fits and maintains aspect ratio within the Link area.
                                   // It will be constrained by the smaller of its width/height (imageSquareSize)
                                   // and the container's dimensions.
      />
    </Link>
  );
}
