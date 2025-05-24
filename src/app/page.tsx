import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Search, PlusCircle } from "lucide-react";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Accueil - Entrelles',
  description: 'Bienvenue sur Entrelles. Trouvez ou proposez un trajet en toute confiance.',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 to-accent/10">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{backgroundImage: "url('https://placehold.co/1920x1080/F8E4E9/C73053.png?text=.')"}}
            data-ai-hint="map pattern"
          ></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Entrelles
            </h1>
            <p className="text-lg md:text-2xl text-foreground/80 mb-10 max-w-2xl mx-auto">
              Le covoiturage au féminin en toute confiance. Voyagez sereinement entre femmes.
            p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild size="lg" className="text-lg px-8 py-6 shadow-lg">
                <Link href="/chercher-trajet">
                  <Search className="mr-2 h-5 w-5" /> Chercher un trajet
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 shadow-lg border-primary text-primary hover:bg-primary/10">
                <Link href="/proposer-trajet">
                  <PlusCircle className="mr-2 h-5 w-5" /> Proposer un trajet
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center text-foreground mb-12">
              Pourquoi choisir Entrelles ?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                    <ShieldQuestion className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Sécurité et Confiance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Une communauté de femmes pour des trajets en toute sérénité. Profils vérifiés pour plus de sécurité.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                    <Calculator className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Tarifs Justes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Des estimations claires et des prix équitables pour conductrices et passagères.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                   <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Support Dédié</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Notre chatbot et équipe support sont là pour répondre à toutes vos questions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-semibold text-center text-foreground mb-12">Comment ça marche ?</h2>
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <Image 
                            src="https://placehold.co/600x400/F8E4E9/C73053.png?text=Illustration"
                            alt="Illustration covoiturage"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-xl"
                            data-ai-hint="women carpooling travel"
                        />
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">1</div>
                            <div className="ml-4">
                                <h3 className="text-xl font-semibold text-primary">Créez votre profil</h3>
                                <p className="text-muted-foreground mt-1">Inscrivez-vous et complétez votre profil en quelques étapes simples.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">2</div>
                            <div className="ml-4">
                                <h3 className="text-xl font-semibold text-primary">Cherchez ou proposez</h3>
                                <p className="text-muted-foreground mt-1">Trouvez un trajet qui vous convient ou proposez vos places disponibles.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">3</div>
                            <div className="ml-4">
                                <h3 className="text-xl font-semibold text-primary">Voyagez ensemble</h3>
                                <p className="text-muted-foreground mt-1">Mettez-vous d'accord sur les détails et profitez d'un trajet convivial et sécurisé.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
