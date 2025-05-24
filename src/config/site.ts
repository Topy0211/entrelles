import type { LucideIcon } from 'lucide-react';
import { Search, PlusCircle, MessageSquare, FileText, Calculator, Car, LayoutGrid } from 'lucide-react';

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
    // "Proposer un trajet" button is removed from here as it's part of the features page.
    // Other global buttons like Login/Profile can be added here if needed,
    // but for now, Login is handled directly in Header.tsx
  ] as NavItem[],
  secondaryNav: [
    // All items moved to the /features page
  ] as NavItem[],
  mobileNav: [
    { title: "Accueil", href: "/", icon: Car },
    { title: "Fonctionnalités", href: "/features", icon: LayoutGrid },
    // Login/Register will still be shown via Header's direct button logic for mobile
  ] as NavItem[],
  footerNav: [
     { title: "Mentions Légales", href: "/mentions-legales" },
     { title: "Estimation Tarifaire", href: "/estimation-tarifaire" },
     { title: "Nous contacter", href: "mailto:contact@entrelles.com" },
  ]
};
