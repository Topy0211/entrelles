import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, PlusCircle, Car } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const metadata: Metadata = {
  title: 'Proposer un trajet - Entrelles',
  description: 'Partagez votre trajet et vos frais sur Entrelles.',
};

export default function ProposerTrajetPage() {
  // const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-primary flex items-center">
                <Car className="mr-3 h-8 w-8" /> Proposer un trajet
              </CardTitle>
              <CardDescription>Remplissez les détails de votre trajet pour trouver des passagères.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-6">
                <div>
                  <Label htmlFor="depart-proposer" className="text-base">Lieu de départ</Label>
                  <Input id="depart-proposer" type="text" placeholder="Ex: 12 Rue de la Paix, Paris" className="mt-1 text-base p-3 h-12" />
                </div>
                <div>
                  <Label htmlFor="arrivee-proposer" className="text-base">Lieu d'arrivée</Label>
                  <Input id="arrivee-proposer" type="text" placeholder="Ex: Place Bellecour, Lyon" className="mt-1 text-base p-3 h-12" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="date-proposer" className="text-base block mb-1">Date du trajet</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal h-12 text-base"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {/* {date ? format(date, "PPP", { locale: fr }) : <span>Choisissez une date</span>} */}
                           <span>Choisissez une date</span> {/* Placeholder */}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        {/* <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={fr} /> */}
                        <Calendar mode="single" initialFocus locale={fr} /> {/* Simplified */}
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="heure-proposer" className="text-base">Heure de départ</Label>
                    <Input id="heure-proposer" type="time" className="mt-1 text-base p-3 h-12" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="places-proposer" className="text-base">Nombre de places disponibles</Label>
                        <Input id="places-proposer" type="number" min="1" placeholder="Ex: 2" className="mt-1 text-base p-3 h-12" />
                    </div>
                    <div>
                        <Label htmlFor="prix-proposer" className="text-base">Prix par place (€)</Label>
                        <Input id="prix-proposer" type="number" step="0.01" min="0" placeholder="Ex: 15.50" className="mt-1 text-base p-3 h-12" />
                    </div>
                </div>
                <div>
                  <Label htmlFor="details-proposer" className="text-base">Informations supplémentaires (optionnel)</Label>
                  <Textarea id="details-proposer" placeholder="Ex: Bagages de petite taille uniquement, arrêt possible à Orléans..." className="mt-1 text-base p-3 min-h-[100px]" />
                </div>
                <Button type="submit" className="w-full text-lg py-3 h-auto mt-4">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Publier le trajet
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
