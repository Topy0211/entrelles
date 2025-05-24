'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  title: string; // Title is now a direct prop
  icon?: React.ReactNode; // Rendered icon JSX, optional
  isMobile?: boolean;
  className?: string; // Allow additional class names
}

export function NavLink({ href, title, icon, isMobile = false, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-primary",
        isActive ? "text-primary font-semibold" : "text-foreground/70",
        "flex items-center gap-2", // Add gap for spacing between icon and title
        isMobile ? "py-2 text-lg" : "text-sm font-medium", // Apply specific styles for mobile/desktop
        className
      )}
    >
      {icon}
      {title}
    </Link>
  );
}
