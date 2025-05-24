'use client'; // Needed for useState and form handling

import { useState, type FormEvent } from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Euro } from 'lucide-react';

// export const metadata: Metadata = { // Metadata should be in server components or page.tsx files, not client ones directly
//   title: 'Estimation Tarifaire - Entrelles',
//   description: 'Estimez le coût de votre covoiturage sur Entrelles.',
// };
// For client components, manage title using useEffect if needed, or keep metadata in a parent server component.
// Or, create a server component wrapper for this page if metadata is crucial.

const COMMISSION = 3; // 3€
const PRICE_PER_KM = 0.20; // 0.20€/km

export default function EstimationTarifairePage() {
  const [distance, setDistance] = useState<string>('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const handleEstimate = (e: FormEvent) => {
    e.preventDefault();
    const numDistance = parseFloat(distance);
    if (!isNaN(numDistance) && numDistance > 0) {
      const price = (numDistance * PRICE_PER_KM) + COMMISSION;
      setEstimatedPrice(price);
    } else {
      setEstimatedPrice(null);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <Calculator className="mx-auto h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-3xl md:text-4xl font-semibold text-primary">Estimation Tarifaire</CardTitle>
              <CardDescription className="mt-2 text-lg text-foreground/80">
                Calculez une estimation du coût de votre trajet.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-primary/10 rounded-lg text-center">
                <p className="text-xl font-medium text-primary">
                  Formule de calcul : <strong className="font-semibold">0.20€/km + 3€ de commission</strong>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  La commission de 3€ est fixe par trajet et par personne.
                </p>
              </div>
              
              <form onSubmit={handleEstimate} className="space-y-4">
                <div>
                  <Label htmlFor="distance" className="text-base font-medium">Distance du trajet (en km)</Label>
                  <Input
                    id="distance"
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="Ex: 150"
                    required
                    min="1"
                    className="mt-1 text-base p-3 h-12"
                  />
                </div>
                <Button type="submit" className="w-full text-lg py-3 h-auto">
                  Estimer le prix
                </Button>
              </form>

              {estimatedPrice !== null && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-lg font-medium text-green-700">Prix estimé du trajet :</p>
                  <p className="text-3xl font-bold text-green-600">
                    {estimatedPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ceci est une estimation. Le prix final peut varier.
                  </p>
                </div>
              )}
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground text-center w-full">
                    Les paiements sont gérés de manière sécurisée. La devise utilisée est l'Euro (EUR).
                    Notre clé publique Stripe pour référence : {process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "pk_live_0gpJqhiGj7kddNqIOvAvH0YE00mJRAYH0q"} (Note: ceci est une clé publique de test).
                </p>
             </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
