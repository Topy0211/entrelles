'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/config/site';

interface NavLinkProps {
  href: string;
  item: NavItem;
  children?: React.ReactNode;
  isMobile?: boolean;
}

export function NavLink({ href, item, children, isMobile = false }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-primary",
        isActive ? "text-primary font-semibold" : "text-foreground/70",
        isMobile && "flex items-center py-2 text-lg"
      )}
    >
      {children || item.title}
    </Link>
  );
}
