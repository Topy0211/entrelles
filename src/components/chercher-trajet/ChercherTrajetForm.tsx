
'use client';

import React, { useState, useEffect } from 'react';
import type { Locale } from 'date-fns';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search } from 'lucide-react';

export function ChercherTrajetForm() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [locale, setLocale] = useState<Locale | undefined>(undefined);

  useEffect(() => {
    // Dynamically import the locale to ensure it's only loaded on the client-side
    import('date-fns/locale/fr').then(module => {
      setLocale(module.fr);
    });
  }, []); // Empty dependency array ensures this runs once on mount

  return (
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
                    disabled={!locale} // Disable button until locale is loaded
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
                      locale={locale} // Pass the dynamically loaded locale
                    />
                  ) : (
                    // Show a loading state or a default calendar if locale is not yet loaded
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
  );
}
