import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, PlusCircle, MessageSquare, Calculator, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fonctionnalités - Entrelles',
  description: 'Découvrez toutes les fonctionnalités proposées par Entrelles pour un covoiturage serein.',
};

const featuresList = [
  {
    title: 'Chercher un trajet',
    description: 'Trouvez un covoiturage adapté à vos besoins, en toute sécurité.',
    href: '/chercher-trajet',
    icon: <Search className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Proposer un trajet',
    description: 'Partagez votre itinéraire et vos frais avec d\'autres femmes.',
    href: '/proposer-trajet',
    icon: <PlusCircle className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Chatbot d\'assistance',
    description: 'Notre assistant virtuel répond à vos questions fréquentes 24/7.',
    href: '/chatbot',
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Estimation Tarifaire',
    description: 'Calculez facilement une estimation du coût de votre trajet.',
    href: '/estimation-tarifaire',
    icon: <Calculator className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Mentions Légales',
    description: 'Consultez nos informations légales et notre politique de confidentialité.',
    href: '/mentions-legales',
    icon: <FileText className="h-10 w-10 text-primary" />,
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nos Fonctionnalités
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            Entrelles vous offre une gamme d'outils pour rendre vos covoiturages simples, sûrs et agréables. Explorez ce que nous proposons :
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuresList.map((feature) => (
            <Card key={feature.href} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card rounded-xl overflow-hidden">
              <CardHeader className="items-center text-center pt-8 pb-4">
                <div className="p-4 bg-primary/10 rounded-full w-fit mb-5">
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl font-semibold text-primary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center px-6 pb-6">
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
              <CardFooter className="p-6 bg-muted/30">
                <Button asChild className="w-full text-base py-3 h-auto">
                  <Link href={feature.href}>
                    Accéder à la fonctionnalité
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
