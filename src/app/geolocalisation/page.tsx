
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { GOOGLE_API_KEY } from '@/config/keys';

// Metadata defined in layout.tsx

export default function GeolocalisationPage() {
  const defaultCenterLat = 48.8566; // Paris latitude
  const defaultCenterLng = 2.3522; // Paris longitude
  const defaultZoom = 12;

  const iframeSrc = `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_API_KEY}&center=${defaultCenterLat},${defaultCenterLng}&zoom=${defaultZoom}&maptype=roadmap`;

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
                    height="100%" // Will be constrained by aspect-video parent
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
