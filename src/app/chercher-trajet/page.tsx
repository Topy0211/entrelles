'use client'; 

import React, { useState, useEffect } from 'react';
import type { Locale } from 'date-fns';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
// Removed direct import: import { fr } from 'date-fns/locale';


export default function ChercherTrajetPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [locale, setLocale] = useState<Locale | undefined>(undefined);

  useEffect(() => {
    import('date-fns/locale/fr').then(module => {
      setLocale(module.fr);
    });
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-primary">Chercher un trajet</CardTitle>
              <CardDescription>Entrez vos informations pour trouver le covoiturage idéal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-6">
                <div>
                  <Label htmlFor="depart" className="text-base">Lieu de départ</Label>
                  <Input id="depart" type="text" placeholder="Ex: Paris, Gare de Lyon" className="mt-1 text-base p-3 h-12" />
                </div>
                <div>
                  <Label htmlFor="arrivee" className="text-base">Lieu d'arrivée</Label>
                  <Input id="arrivee" type="text" placeholder="Ex: Lyon, Part-Dieu" className="mt-1 text-base p-3 h-12" />
                </div>
                <div>
                  <Label htmlFor="date" className="text-base block mb-1">Date du trajet</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal h-12 text-base"
                        disabled={!locale}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date && locale ? format(date, "PPP", { locale }) : <span>Choisissez une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                       {locale ? (
                          <Calendar 
                           mode="single" 
                           selected={date}
                           onSelect={setDate}
                           initialFocus 
                           locale={locale} 
                          />
                        ) : (
                           <div className="p-4 text-center text-muted-foreground">Chargement du calendrier...</div>
                        )}
                    </PopoverContent>
                  </Popover>
                </div>
                <Button type="submit" className="w-full text-lg py-3 h-auto mt-4">
                  <Search className="mr-2 h-5 w-5" />
                  Rechercher
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Résultats de recherche</h3>
            <p className="text-muted-foreground">Les trajets disponibles apparaîtront ici.</p>
            {/* Placeholder for search results listing */}
            <div className="mt-6 p-8 border border-dashed border-border rounded-lg bg-card">
                Aucun trajet trouvé pour le moment. Essayez d'ajuster vos critères de recherche.
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
