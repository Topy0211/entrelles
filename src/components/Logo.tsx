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
        src="/logo-entrelles.png" // Assumes logo-entrelles.png is in the /public folder
        alt="Entrelles Logo"
        width={width}
        height={height}
        priority
        className="object-contain"
      />
    </Link>
  );
}
