
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Logo } from '@/components/Logo';
import { CheckCircle, XCircle } from 'lucide-react';

type Step = 'interest' | 'gender' | 'exitInterest' | 'exitGender';

export default function WelcomePage() {
  const [step, setStep] = useState<Step>('interest');
  const router = useRouter();

  const handleInterestResponse = (response: boolean) => {
    if (response) {
      setStep('gender');
    } else {
      setStep('exitInterest');
    }
  };

  const handleGenderResponse = (gender: 'male' | 'female') => {
    if (gender === 'female') {
      router.push('/home');
    } else {
      setStep('exitGender');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="absolute top-8">
        <Logo width={150} height={50} />
      </div>
      <Card className="w-full max-w-md shadow-xl">
        {step === 'interest' && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold text-primary">Bienvenue sur Entrelles</CardTitle>
              <CardDescription className="mt-2 text-md">
                Voulez-vous trouver un covoiturage exclusivement féminin pour voyager en toute confiance ?
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <Button onClick={() => handleInterestResponse(true)} size="lg" className="w-full">
                <CheckCircle className="mr-2 h-5 w-5" />
                Oui, je suis intéressée
              </Button>
              <Button onClick={() => handleInterestResponse(false)} variant="outline" size="lg" className="w-full">
                <XCircle className="mr-2 h-5 w-5" />
                Non, pas pour le moment
              </Button>
            </CardContent>
          </>
        )}

        {step === 'gender' && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold text-primary">Quel est votre genre ?</CardTitle>
              <CardDescription className="mt-2 text-md">
                Cette information nous aide à maintenir une communauté sécurisée pour les femmes.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <Button onClick={() => handleGenderResponse('female')} size="lg" className="w-full">
                Femme
              </Button>
              <Button onClick={() => handleGenderResponse('male')} size="lg" variant="outline" className="w-full">
                Homme
              </Button>
            </CardContent>
          </>
        )}

        {step === 'exitInterest' && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold text-primary">Merci de votre intérêt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Entrelles est une application de covoiturage dédiée aux femmes pour assurer des trajets sécurisés et confortables.
                N'hésitez pas à revenir si vos besoins changent.
              </p>
            </CardContent>
          </>
        )}

        {step === 'exitGender' && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold text-primary">Application réservée</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Entrelles est une plateforme de covoiturage exclusivement féminine.
                Merci de votre compréhension.
              </p>
            </CardContent>
          </>
        )}
      </Card>
      <p className="mt-8 text-xs text-muted-foreground text-center max-w-md">
        Entrelles - Le covoiturage au féminin en toute confiance.
      </p>
    </div>
  );
}
