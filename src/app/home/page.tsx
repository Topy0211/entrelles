
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldQuestion, Calculator, MessageSquare, CheckCircle, Sparkles, Gift } from "lucide-react";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

// Metadata will be handled by src/app/home/layout.tsx

export default function HomePageContent() {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Ensure localStorage is accessed only on the client
    if (typeof window !== 'undefined') {
      const subscriptionStatus = localStorage.getItem('entrelles-subscription-status');
      setIsSubscribed(subscriptionStatus === 'active');
      setIsLoadingSubscription(false);
    }
  }, []);

  const handleSubscribe = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('entrelles-subscription-status', 'active');
      setIsSubscribed(true);
      toast({
        title: "Abonnement activé !",
        description: "Merci de soutenir Entrelles. Vous allez être redirigé vers la page de paiement.",
      });
      // Redirect to a placeholder Stripe checkout URL.
      // For a real application, you would generate a Stripe Checkout Session on your backend
      // and redirect to session.url, or use a pre-configured Stripe Payment Link.
      // Example: window.location.href = 'https://buy.stripe.com/your_payment_link_id';
      // Using a generic Stripe domain as a placeholder:
      window.location.href = 'https://checkout.stripe.com/pay/cs_test_a1placeholder12345'; // This is a non-functional placeholder
    }
  };

  const handleUnsubscribe = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('entrelles-subscription-status');
      setIsSubscribed(false);
      toast({
        title: "Abonnement annulé",
        description: "Votre abonnement a été annulé. Certaines fonctionnalités seront limitées.",
        variant: "destructive"
      });
    }
  };


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

        {/* Subscription Section */}
        <section id="abonnement" className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center text-primary mb-4">
              Débloquez l'Expérience Complète Entrelles !
            </h2>
            <p className="text-lg text-center text-foreground/80 mb-10 max-w-2xl mx-auto">
              Soutenez Entrelles et accédez à toutes nos fonctionnalités exclusives pour seulement <strong>3€/mois</strong>.
            </p>
            <Card className="max-w-lg mx-auto shadow-xl border-2 border-primary">
              <CardHeader className="text-center">
                <Gift className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl text-primary">Abonnement Mensuel Entrelles+</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-4xl font-bold text-foreground">3€<span className="text-lg font-normal text-muted-foreground">/mois</span></p>
                <ul className="space-y-2 text-left text-muted-foreground list-disc list-inside pl-4">
                  <li><CheckCircle className="inline-block h-5 w-5 text-green-500 mr-2" /> Accès illimité à notre Chatbot IA</li>
                  <li><CheckCircle className="inline-block h-5 w-5 text-green-500 mr-2" /> Fonctionnalité de Géolocalisation avancée</li>
                  <li><CheckCircle className="inline-block h-5 w-5 text-green-500 mr-2" /> Toutes les fonctionnalités de base incluses</li>
                  <li><Sparkles className="inline-block h-5 w-5 text-yellow-500 mr-2" /> Soutenez le développement d'Entrelles</li>
                </ul>
                {isLoadingSubscription ? (
                   <Button size="lg" className="w-full mt-6 text-lg py-3 h-auto" disabled>Chargement...</Button>
                ) : isSubscribed ? (
                  <div className="mt-6 space-y-3">
                    <p className="text-green-600 font-semibold text-lg"><CheckCircle className="inline-block h-6 w-6 mr-2" /> Vous êtes abonné(e) !</p>
                    <Button onClick={handleUnsubscribe} variant="outline" size="lg" className="w-full text-lg py-3 h-auto">
                      Se désabonner
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleSubscribe} size="lg" className="w-full mt-6 text-lg py-3 h-auto">
                    S'abonner pour 3€/mois
                  </Button>
                )}
                <p className="text-xs text-muted-foreground mt-4">
                  Redirection vers une page de paiement Stripe (simulation). Pour une intégration réelle, une configuration backend ou un Lien de Paiement Stripe est nécessaire.
                </p>
              </CardContent>
            </Card>
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
                    Notre chatbot et équipe support sont là pour répondre à toutes vos questions. <span className="text-xs italic">(Chatbot IA soumis à abonnement)</span>
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

