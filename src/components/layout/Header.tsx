import Link from 'next/link';
import { siteConfig, type NavItem } from '@/config/site';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
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
        <Logo width={100} height={35} /> {/* Logo now links to /home */}
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {siteConfig.mainNav.filter(item => !item.isButton).map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink 
                key={item.href} 
                href={item.href} 
                title={item.title}
                icon={IconComponent && <IconComponent className="mr-0 h-4 w-4" />}
              />
            );
          })}
           <NavLink href="/features" title="Fonctionnalités" />
           <NavLink href="/chercher-trajet" title="Chercher un trajet" />
           <NavLink href="/proposer-trajet" title="Proposer un trajet" />
           <NavLink href="/chatbot" title="Chatbot" />

          {siteConfig.secondaryNav.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink 
                key={item.href} 
                href={item.href} 
                title={item.title}
                icon={IconComponent && <IconComponent className="mr-0 h-4 w-4" />}
              />
            );
          })}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          {siteConfig.mainNav.filter(item => item.isButton).map((item) => (
             <Button key={item.href} asChild variant={item.variant || 'default'} size="sm">
               <Link href={item.href}>
                 {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                 {item.title}
               </Link>
             </Button>
          ))}
           <Button variant="outline" size="sm" asChild>
            <Link href="/login">Connexion</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background p-6">
              <div className="mb-8">
                <Logo width={120} height={40} /> {/* Logo now links to /home */}
              </div>
              <nav className="flex flex-col space-y-4">
                {siteConfig.mobileNav.map((item) => { // mobileNav items link to /home and /features
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
                 <NavLink href="/chercher-trajet" title="Chercher un trajet" isMobile icon={<Menu className="h-5 w-5 text-primary" />} />
                 <NavLink href="/proposer-trajet" title="Proposer un trajet" isMobile icon={<Menu className="h-5 w-5 text-primary" />} />
                 <NavLink href="/chatbot" title="Chatbot" isMobile icon={<Menu className="h-5 w-5 text-primary" />} />
                 <NavLink href="/estimation-tarifaire" title="Estimation Tarifaire" isMobile icon={<Menu className="h-5 w-5 text-primary" />} />
                 <NavLink href="/mentions-legales" title="Mentions Légales" isMobile icon={<Menu className="h-5 w-5 text-primary" />} />
                 <NavLink href="/geolocalisation" title="Géolocalisation" isMobile icon={<Menu className="h-5 w-5 text-primary" />} />
                 <NavLink href="/noter-une-utilisatrice" title="Noter une Utilisatrice" isMobile icon={<Menu className="h-5 w-5 text-primary" />} />
              </nav>
              <div className="mt-8 flex flex-col space-y-3">
                {siteConfig.mainNav.filter(item => item.isButton).map((item) => (
                   <Button key={item.href} asChild variant={item.variant || 'default'} size="lg" className="w-full">
                     <Link href={item.href}>
                       {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                       {item.title}
                     </Link>
                   </Button>
                ))}
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
