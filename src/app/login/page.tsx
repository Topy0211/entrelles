import { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc'; 

export const metadata: Metadata = {
  title: 'Connexion - Entrelles',
  description: 'Connectez-vous à votre compte Entrelles ou commencez à explorer.',
};

export default function LoginPage() {
  return (
    <main className="flex flex-grow items-center justify-center p-4 md:p-8 bg-secondary/30">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-6">
            <Logo width={150} height={50} />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">{/* Entrelles - Already in Logo */}</CardTitle>
          <CardDescription className="text-muted-foreground text-md pt-2">
            Le covoiturage au féminin en toute confiance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* This button now leads to the questionnaire at / */}
          <Button asChild className="w-full" size="lg">
            <Link href="/">COMMENCER</Link> 
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Ou connectez-vous avec
              </span>
            </div>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="exemple@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" placeholder="********" required />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Se connecter
            </Button>
          </form>
          
          <Button variant="outline" className="w-full">
            <FcGoogle className="mr-2 h-5 w-5" />
            Continuer avec Google
          </Button>

        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-sm">
            <Link href="#" className="font-medium text-primary hover:underline">
              Mot de passe oublié ?
            </Link>
           <p className="text-muted-foreground">
            Pas encore de compte ?{' '}
            <Link href="#" className="font-medium text-primary hover:underline">
              Créer un compte
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
