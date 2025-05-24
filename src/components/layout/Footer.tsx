import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-8 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo width={120} height={40} />
            <p className="mt-4 text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Navigation</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/home" className="text-muted-foreground hover:text-primary">Accueil</Link></li> 
              <li><Link href="/features" className="text-muted-foreground hover:text-primary">Fonctionnalités</Link></li>
              <li><Link href="/chercher-trajet" className="text-muted-foreground hover:text-primary">Chercher un trajet</Link></li>
              <li><Link href="/proposer-trajet" className="text-muted-foreground hover:text-primary">Proposer un trajet</Link></li>
              <li><Link href="/chatbot" className="text-muted-foreground hover:text-primary">Chatbot</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Légal & Contact</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {siteConfig.footerNav.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
