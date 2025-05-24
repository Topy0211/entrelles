import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 120, height = 40, className }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <Image
        src="https://placehold.co/240x80/c73053/ffffff.png?text=Entrelles" // Placeholder for logo-entrelles.png
        alt="Entrelles Logo"
        width={width}
        height={height}
        priority
        data-ai-hint="logo entrelles brand"
        className="object-contain"
      />
    </Link>
  );
}
