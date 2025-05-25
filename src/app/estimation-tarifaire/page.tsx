
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, CreditCard, ShieldCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { STRIPE_PUBLIC_KEY } from '@/config/keys';

const PRICE_PER_KM = 0.20; // 0.20€/km

function EstimationTarifairePageContent() {
  const searchParams = useSearchParams();
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [calculationMessage, setCalculationMessage] = useState<string | null>(null);

  useEffect(() => {
    const distanceKmParam = searchParams.get('distanceKm');
    const prixParSiegeParam = searchParams.get('prixParSiege');

    if (distanceKmParam && prixParSiegeParam) {
      const numDistance = parseFloat(distanceKmParam);
      const numPrixParSiege = parseFloat(prixParSiegeParam);

      if (!isNaN(numDistance) && numDistance > 0 && !isNaN(numPrixParSiege) && numPrixParSiege >= 0) {
        const price = (numDistance * PRICE_PER_KM) + numPrixParSiege;
        setEstimatedPrice(price);
        setCalculationMessage(null);
      } else {
        setEstimatedPrice(null);
        setCalculationMessage("Les valeurs fournies pour la distance ou le prix par siège sont invalides.");
      }
    } else {
      setEstimatedPrice(null);
      setCalculationMessage("Veuillez fournir la distance du trajet (distanceKm) et le prix par siège (prixParSiege) dans l'URL pour obtenir une estimation.");
    }
  }, [searchParams]);

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
                Calculez le coût de votre trajet et procédez au paiement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-primary/10 rounded-lg text-center">
                <p className="text-xl font-medium text-primary">
                  Formule de calcul : <strong className="font-semibold">0.20€/km + Prix par siège</strong>
                </p>
              </div>
              
              {calculationMessage && !estimatedPrice && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                  <p className="text-md font-medium text-yellow-700">{calculationMessage}</p>
                </div>
              )}

              {estimatedPrice !== null && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-lg font-medium text-green-700">Prix estimé du trajet :</p>
                  <p className="text-3xl font-bold text-green-600">
                    {estimatedPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </p>
                </div>
              )}

              <Separator className="my-8" />

              <section id="facturation" className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary text-center flex items-center justify-center">
                  <CreditCard className="mr-3 h-7 w-7" /> Facturation Sécurisée
                </h2>
                <p className="text-muted-foreground text-center">
                  Procédez au paiement de votre trajet en toute sécurité via Stripe.
                </p>
                
                <div className="p-4 border border-border rounded-lg bg-background space-y-3">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-sm font-medium text-foreground">Paiement sécurisé par Stripe</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Nous utilisons Stripe pour garantir la sécurité de vos transactions. Entrelles ne stocke pas vos informations de carte bancaire.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Clé publique Stripe (test) : <code className="bg-muted px-1 py-0.5 rounded text-xs">{STRIPE_PUBLIC_KEY}</code>
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    (Zone pour l'élément de paiement Stripe - Intégration complète requise)
                  </p>
                  <Button 
                    disabled={estimatedPrice === null} 
                    className="w-full text-lg py-3 h-auto bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payer {estimatedPrice !== null ? estimatedPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : ''} avec Stripe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  En cliquant sur "Payer avec Stripe", vous serez redirigé vers l'interface de paiement sécurisée de Stripe.
                </p>
              </section>
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground text-center w-full">
                    Les paiements sont gérés de manière sécurisée. La devise utilisée est l'Euro (EUR).
                </p>
             </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

function EstimationTarifaireLoading() {
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
                Chargement des détails du tarif...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-primary/10 rounded-lg text-center">
                <p className="text-xl font-medium text-primary">
                  Formule de calcul : <strong className="font-semibold">0.20€/km + Prix par siège</strong>
                </p>
              </div>
              <div className="mt-6 p-6 border border-border rounded-lg text-center">
                <p className="text-muted-foreground">Chargement du prix estimé...</p>
              </div>
              <Separator className="my-8" />
              <section id="facturation" className="space-y-4 opacity-50">
                <h2 className="text-2xl font-semibold text-primary text-center flex items-center justify-center">
                  <CreditCard className="mr-3 h-7 w-7" /> Facturation Sécurisée
                </h2>
                 <div className="p-6 bg-muted/50 rounded-lg text-center">
                  <Button disabled className="w-full text-lg py-3 h-auto bg-green-600 hover:bg-green-700 text-white">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payer avec Stripe
                  </Button>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function EstimationTarifairePage() {
  return (
    <Suspense fallback={<EstimationTarifaireLoading />}>
      <EstimationTarifairePageContent />
    </Suspense>
  );
}
