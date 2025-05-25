
import type { LucideIcon } from 'lucide-react';
import { Car, Star, MessageSquare, Bell } from 'lucide-react'; // Added MessageSquare and Bell for mobile nav

export type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
  isButton?: boolean;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
};

export const siteConfig = {
  name: "Entrelles",
  description: "Le covoiturage au féminin en toute confiance.",
  mainNav: [
    // Desktop navigation is minimal as per previous requests
  ] as NavItem[],
  secondaryNav: [
    // All items moved to the /features page or accessed via icons
  ] as NavItem[],
  mobileNav: [
    { title: "Accueil", href: "/home", icon: Car },
    { title: "Fonctionnalités", href: "/features", icon: Star }, // Re-added for completeness in mobile
    // Notifications and Chat are handled by NavLink directly in Header for mobile
    // Login/Register will still be shown via Header's direct button logic for mobile
  ] as NavItem[],
  footerNav: [
     { title: "Mentions Légales", href: "/mentions-legales" },
     { title: "Estimation Tarifaire", href: "/estimation-tarifaire" },
     { title: "Nous contacter", href: "mailto:contact@entrelles.com" },
  ]
};
