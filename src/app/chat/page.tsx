
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function ChatPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center">
        <Card className="w-full max-w-xl text-center shadow-lg">
          <CardHeader>
            <MessageSquare className="mx-auto h-16 w-16 text-primary mb-6" />
            <CardTitle className="text-3xl font-semibold text-primary">Messagerie Entrelles</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              La fonctionnalité de messagerie directe entre utilisatrices est en cours de développement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">
              Bientôt, vous pourrez échanger facilement avec les conductrices et passagères pour organiser vos trajets.
            </p>
            <div className="mt-8 p-6 bg-primary/10 rounded-lg">
                <p className="text-primary font-medium">Revenez bientôt !</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
