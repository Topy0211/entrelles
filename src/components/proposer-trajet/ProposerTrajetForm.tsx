
'use client';

import React, { useState, useEffect, type FormEvent } from 'react';
import type { Locale } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, PlusCircle, Car } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";

// Define a type for our notifications
interface AppNotification {
  id: string;
  iconName: 'Car' | 'MessageSquare' | 'BellRing' | 'AlertCircle';
  title: string;
  description: string;
  time: string;
  unread: boolean;
  link?: string;
  publisherName?: string; // For chat context
  trajetDetails?: string; // For chat context
}

export function ProposerTrajetForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [locale, setLocale] = useState<Locale | undefined>(undefined);
  const [depart, setDepart] = useState('');
  const [arrivee, setArrivee] = useState('');
  const [heure, setHeure] = useState('');
  const [places, setPlaces] = useState('');
  const [prix, setPrix] = useState('');
  const [details, setDetails] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    import('date-fns/locale/fr').then(module => {
      setLocale(module.fr);
    });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!depart || !arrivee || !date || !heure || !places || !prix) {
      toast({
        title: "Erreur de formulaire",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const publisher = "une conductrice"; // Placeholder
    const trajetInfo = `Trajet de ${depart} à ${arrivee}`;
    const formattedDate = locale ? format(date, "PPP", { locale }) : format(date, "yyyy-MM-dd");


    const newTrajetNotification: AppNotification = {
      id: Date.now().toString(),
      iconName: 'Car',
      title: 'Nouveau trajet publié !',
      description: `${trajetInfo}, le ${formattedDate} à ${heure}. ${places} places à ${prix}€ chacune.`,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      unread: true,
      publisherName: publisher,
      trajetDetails: trajetInfo,
      link: `/chat?publisherName=${encodeURIComponent(publisher)}&trajetDetails=${encodeURIComponent(trajetInfo)}`,
    };

    try {
      const existingNotificationsRaw = localStorage.getItem('entrelles-notifications');
      const existingNotifications: AppNotification[] = existingNotificationsRaw ? JSON.parse(existingNotificationsRaw) : [];
      const updatedNotifications = [newTrajetNotification, ...existingNotifications];
      localStorage.setItem('entrelles-notifications', JSON.stringify(updatedNotifications));

      toast({
        title: "Trajet Publié !",
        description: "Votre trajet a été publié et une notification a été créée.",
      });

      setDepart('');
      setArrivee('');
      setDate(new Date());
      setHeure('');
      setPlaces('');
      setPrix('');
      setDetails('');

    } catch (error) {
      console.error("Failed to save notification to localStorage", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer la notification.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-primary flex items-center">
            <Car className="mr-3 h-8 w-8" /> Proposer un trajet
          </CardTitle>
          <CardDescription>Remplissez les détails de votre trajet pour trouver des passagères.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="depart-proposer" className="text-base">Lieu de départ</Label>
              <Input id="depart-proposer" type="text" placeholder="Ex: 12 Rue de la Paix, Paris" className="mt-1 text-base p-3 h-12" value={depart} onChange={(e) => setDepart(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="arrivee-proposer" className="text-base">Lieu d'arrivée</Label>
              <Input id="arrivee-proposer" type="text" placeholder="Ex: Place Bellecour, Lyon" className="mt-1 text-base p-3 h-12" value={arrivee} onChange={(e) => setArrivee(e.target.value)} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date-proposer" className="text-base block mb-1">Date du trajet</Label>
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
              <div>
                <Label htmlFor="heure-proposer" className="text-base">Heure de départ</Label>
                <Input id="heure-proposer" type="time" className="mt-1 text-base p-3 h-12" value={heure} onChange={(e) => setHeure(e.target.value)} required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="places-proposer" className="text-base">Nombre de places disponibles</Label>
                    <Input id="places-proposer" type="number" min="1" placeholder="Ex: 2" className="mt-1 text-base p-3 h-12" value={places} onChange={(e) => setPlaces(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="prix-proposer" className="text-base">Prix par place (€)</Label>
                    <Input id="prix-proposer" type="number" step="0.01" min="0" placeholder="Ex: 15.50" className="mt-1 text-base p-3 h-12" value={prix} onChange={(e) => setPrix(e.target.value)} required />
                </div>
            </div>
            <div>
              <Label htmlFor="details-proposer" className="text-base">Informations supplémentaires (optionnel)</Label>
              <Textarea id="details-proposer" placeholder="Ex: Bagages de petite taille uniquement, arrêt possible à Orléans..." className="mt-1 text-base p-3 min-h-[100px]" value={details} onChange={(e) => setDetails(e.target.value)} />
            </div>
            <Button type="submit" className="w-full text-lg py-3 h-auto mt-4">
              <PlusCircle className="mr-2 h-5 w-5" />
              Publier le trajet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
