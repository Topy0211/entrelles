
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldQuestion, Calculator, MessageSquare } from "lucide-react";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';

// Metadata will be handled by src/app/home/layout.tsx

export default function HomePageContent() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{backgroundImage: "url('https://placehold.co/1920x1080/F8E4E9/C73053.png?text=.')"}}
            data-ai-hint="subtle background"
          ></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Entrelles
            </h1>
            <p className="text-lg md:text-2xl text-foreground/80 mb-10 max-w-2xl mx-auto">
              Le covoiturage au féminin en toute confiance. Voyagez sereinement entre femmes.
            </p>
            <div className="flex justify-center items-center">
              <Button asChild size="lg" className="text-xl px-10 py-7 shadow-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/features">
                  COMMENCER
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
                <div className="max-w-2xl mx-auto">
                    <div className="space-y-8">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-md">1</div>
                            <div className="ml-6">
                                <h3 className="text-2xl font-semibold text-primary mb-1">Créez votre profil</h3>
                                <p className="text-muted-foreground text-lg mt-1">Inscrivez-vous et complétez votre profil en quelques étapes simples.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-md">2</div>
                            <div className="ml-6">
                                <h3 className="text-2xl font-semibold text-primary mb-1">Cherchez ou proposez</h3>
                                <p className="text-muted-foreground text-lg mt-1">Trouvez un trajet qui vous convient ou proposez vos places disponibles.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-md">3</div>
                            <div className="ml-6">
                                <h3 className="text-2xl font-semibold text-primary mb-1">Voyagez ensemble</h3>
                                <p className="text-muted-foreground text-lg mt-1">Mettez-vous d'accord sur les détails et profitez d'un trajet convivial et sécurisé.</p>
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
