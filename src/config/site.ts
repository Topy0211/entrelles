import type { LucideIcon } from 'lucide-react';
import { LayoutGrid, Car } from 'lucide-react'; // Simplified icons

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
    // mainNav is kept minimal, primary actions are on the features page
  ] as NavItem[],
  secondaryNav: [
    // All items moved to the /features page
  ] as NavItem[],
  mobileNav: [
    { title: "Accueil", href: "/home", icon: Car }, // Updated to /home
    { title: "Fonctionnalités", href: "/features", icon: LayoutGrid },
    // Login/Register will still be shown via Header's direct button logic for mobile
  ] as NavItem[],
  footerNav: [
     { title: "Mentions Légales", href: "/mentions-legales" },
     { title: "Estimation Tarifaire", href: "/estimation-tarifaire" },
     { title: "Nous contacter", href: "mailto:contact@entrelles.com" },
  ]
};
