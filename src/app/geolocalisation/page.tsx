import { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

// Metadata defined in layout.tsx

export default function GeolocalisationPage() {
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
                Explorez les trajets et les conductrices/passagères proches de vous.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <p className="text-center text-muted-foreground">
                La carte interactive ci-dessous vous permet de visualiser les informations en temps réel.
                (Note: Ceci est une représentation. Une intégration réelle nécessiterait un service de cartographie.)
              </p>
              <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden shadow-inner">
                <Image
                  src="https://placehold.co/800x450/e2e8f0/94a3b8.png?text=Carte+Interactive+Placeholder"
                  alt="Carte de géolocalisation placeholder"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  data-ai-hint="interactive map"
                  priority
                />
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
