
import Link from 'next/link';
import { siteConfig, type NavItem } from '@/config/site';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Menu, Car, Bell, Calculator, FileText, MapPin, Star, Search, PlusCircle, MessageSquare as MessageSquareIcon } from 'lucide-react'; // Renamed MessageSquare to avoid conflict
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from './NavLink';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Logo width={100} height={35} />
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {/* Desktop navigation removed as per previous requests */}
        </nav>

        <div className="flex items-center space-x-1"> {/* Reduced space-x for more icons */}
          <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
           <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
            <Link href="/chat">
              <MessageSquareIcon className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Link>
          </Button>
           <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/login">Connexion</Link>
          </Button>
        
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background p-6">
              <div className="mb-8">
                <Logo width={120} height={40} />
              </div>
              <nav className="flex flex-col space-y-1">
                {siteConfig.mobileNav.map((item) => { 
                  const IconComponent = item.icon;
                  return (
                    <NavLink 
                      key={item.href} 
                      href={item.href} 
                      title={item.title} 
                      isMobile
                      icon={IconComponent && <IconComponent className="h-5 w-5 text-primary" />}
                    />
                  );
                })}
                 <NavLink href="/notifications" title="Notifications" isMobile icon={<Bell className="h-5 w-5 text-primary" />} />
                 <NavLink href="/chat" title="Messages" isMobile icon={<MessageSquareIcon className="h-5 w-5 text-primary" />} />
                 <NavLink href="/features" title="Fonctionnalités" isMobile icon={<Star className="h-5 w-5 text-primary" />} />
                 <NavLink href="/chercher-trajet" title="Chercher un trajet" isMobile icon={<Search className="h-5 w-5 text-primary" />} />
                 <NavLink href="/proposer-trajet" title="Proposer un trajet" isMobile icon={<PlusCircle className="h-5 w-5 text-primary" />} />
                 <NavLink href="/estimation-tarifaire" title="Estimation Tarifaire" isMobile icon={<Calculator className="h-5 w-5 text-primary" />} />
                 <NavLink href="/geolocalisation" title="Géolocalisation" isMobile icon={<MapPin className="h-5 w-5 text-primary" />} />
                 <NavLink href="/noter-une-utilisatrice" title="Noter une Utilisatrice" isMobile icon={<Star className="h-5 w-5 text-primary" />} />
                 <NavLink href="/mentions-legales" title="Mentions Légales" isMobile icon={<FileText className="h-5 w-5 text-primary" />} />
              </nav>
              <div className="mt-8 flex flex-col space-y-3">
                <Button variant="outline" size="lg" asChild className="w-full">
                  <Link href="/login">Connexion / Inscription</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
