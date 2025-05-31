
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapPin, AlertTriangle, Sparkles } from 'lucide-react';
import { GOOGLE_API_KEY } from '@/config/keys';
import { Skeleton } from '@/components/ui/skeleton';

// Metadata defined in layout.tsx

export default function GeolocalisationPage() {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);

  useEffect(() => {
    const subscriptionStatus = localStorage.getItem('entrelles-subscription-status');
    setIsSubscribed(subscriptionStatus === 'active');
  }, []);

  const defaultCenterLat = 48.8566; // Paris latitude
  const defaultCenterLng = 2.3522; // Paris longitude
  const defaultZoom = 12;

  const iframeSrc = `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_API_KEY}&center=${defaultCenterLat},${defaultCenterLng}&zoom=${defaultZoom}&maptype=roadmap`;

  if (isSubscribed === null) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <Skeleton className="mx-auto h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="w-full aspect-video rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isSubscribed) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex items-center justify-center">
          <Card className="max-w-md mx-auto shadow-xl p-8 text-center">
             <AlertTriangle className="h-16 w-16 text-primary mx-auto mb-6" />
            <AlertTitle className="text-2xl font-semibold text-primary mb-3">Fonctionnalité Premium</AlertTitle>
            <AlertDescription className="text-lg text-foreground/80 mb-8">
              La carte de géolocalisation est disponible pour nos abonnées.
            </AlertDescription>
            <Button asChild size="lg" className="text-lg py-3 h-auto">
              <Link href="/home#abonnement">
                <Sparkles className="mr-2 h-5 w-5" />
                Découvrir l'abonnement
              </Link>
            </Button>
          </Card>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-3xl md:text-4xl font-semibold text-primary">Géolocalisation</CardTitle>
              <CardDescription className="mt-2 text-lg text-foreground/80">
                Explorez les trajets et les conductrices/passagères proches de vous sur la carte.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <p className="text-center text-muted-foreground">
                La carte interactive ci-dessous vous permet de visualiser les informations en temps réel.
              </p>
              <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden shadow-inner">
                {GOOGLE_API_KEY ? (
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={iframeSrc}
                    title="Carte de géolocalisation"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <p className="text-muted-foreground">
                      La clé API Google Maps n'est pas configurée. Impossible d'afficher la carte.
                    </p>
                  </div>
                )}
              </div>
               <p className="text-xs text-muted-foreground text-center">
                Les fonctionnalités de géolocalisation respectent la vie privée des utilisatrices. Le partage de position est optionnel et contrôlé par chaque utilisatrice.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
