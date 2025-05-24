import type { LucideIcon } from 'lucide-react';
import { Search, PlusCircle, MessageSquare, FileText, Calculator, ShieldQuestion, Car } from 'lucide-react';

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
    { title: "Chercher un trajet", href: "/chercher-trajet", icon: Search },
    { title: "Proposer un trajet", href: "/proposer-trajet", icon: PlusCircle, isButton: true, variant: "default" },
  ] as NavItem[],
  secondaryNav: [
    { title: "Chatbot", href: "/chatbot", icon: MessageSquare },
    { title: "Estimation Tarifaire", href: "/estimation-tarifaire", icon: Calculator },
    { title: "Mentions Légales", href: "/mentions-legales", icon: FileText },
  ] as NavItem[],
  mobileNav: [
    { title: "Accueil", href: "/", icon: Car },
    { title: "Chercher", href: "/chercher-trajet", icon: Search },
    { title: "Proposer", href: "/proposer-trajet", icon: PlusCircle },
    { title: "Chatbot", href: "/chatbot", icon: MessageSquare },
    { title: "Tarifs", href: "/estimation-tarifaire", icon: Calculator },
    { title: "Légal", href: "/mentions-legales", icon: FileText },
  ] as NavItem[],
  footerNav: [
     { title: "Mentions Légales", href: "/mentions-legales" },
     { title: "Estimation Tarifaire", href: "/estimation-tarifaire" },
     { title: "Nous contacter", href: "mailto:contact@entrelles.com" },
  ]
};
