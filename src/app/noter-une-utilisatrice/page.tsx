'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, UserCircle2, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface RatingReview {
  id: string;
  userName: string; // Person who wrote the review
  ratedUserName: string; // Person being reviewed
  rating: number;
  comment: string;
  date: string;
}

const initialReviews: RatingReview[] = [
  { id: '1', userName: 'Sophie D.', ratedUserName: 'Alice M.', rating: 5, comment: 'Trajet très agréable et conductrice ponctuelle. Je recommande !', date: '15/07/2024' },
  { id: '2', userName: 'Laura B.', ratedUserName: 'Chloé P.', rating: 4, comment: 'Bonne communication, voiture propre. Un peu en retard mais rien de grave.', date: '12/07/2024' },
];

export default function NoterUtilisatricePage() {
  const [ratedUserName, setRatedUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<RatingReview[]>(initialReviews);
  const [submitterName, setSubmitterName] = useState(''); // Name of the person leaving the review

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!ratedUserName.trim() || rating === 0 || !comment.trim() || !submitterName.trim()) {
      alert('Veuillez remplir tous les champs et sélectionner une note.');
      return;
    }
    const newReview: RatingReview = {
      id: Date.now().toString(),
      userName: submitterName,
      ratedUserName,
      rating,
      comment,
      date: new Date().toLocaleDateString('fr-FR'),
    };
    setReviews(prevReviews => [newReview, ...prevReviews]);
    // Reset form
    setRatedUserName('');
    setRating(0);
    setComment('');
    setSubmitterName('');
    // In a real app, you would send this data to a backend.
  };

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <Star className="mx-auto h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-3xl md:text-4xl font-semibold text-primary">Noter une Utilisatrice</CardTitle>
              <CardDescription className="mt-2 text-lg text-foreground/80">
                Partagez votre expérience pour aider la communauté Entrelles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="submitterName" className="text-base font-medium">Votre Nom</Label>
                  <Input
                    id="submitterName"
                    type="text"
                    value={submitterName}
                    onChange={(e) => setSubmitterName(e.target.value)}
                    placeholder="Ex: Jeanne D."
                    required
                    className="mt-1 text-base p-3 h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="ratedUserName" className="text-base font-medium">Nom de l'utilisatrice à évaluer</Label>
                  <Input
                    id="ratedUserName"
                    type="text"
                    value={ratedUserName}
                    onChange={(e) => setRatedUserName(e.target.value)}
                    placeholder="Ex: Marie C."
                    required
                    className="mt-1 text-base p-3 h-12"
                  />
                </div>
                <div>
                  <Label className="text-base font-medium block mb-2">Votre Évaluation (1 à 5 étoiles)</Label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <Star
                        key={starValue}
                        className={cn(
                          "h-8 w-8 cursor-pointer transition-colors",
                          rating >= starValue ? "text-accent fill-accent" : "text-muted-foreground hover:text-accent/70"
                        )}
                        onClick={() => setRating(starValue)}
                        aria-label={`Noter ${starValue} étoiles`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="comment" className="text-base font-medium">Votre Commentaire</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Décrivez votre expérience..."
                    required
                    className="mt-1 text-base p-3 min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full text-lg py-3 h-auto">
                  Soumettre l'évaluation
                </Button>
              </form>
            </CardContent>
          </Card>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Avis Récents</h2>
            {reviews.length === 0 ? (
              <p className="text-muted-foreground text-center">Aucun avis pour le moment.</p>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="shadow-md bg-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                           <Avatar>
                            <AvatarImage src={`https://placehold.co/40x40/F8E4E9/333333.png?text=${review.userName.substring(0,1)}`} alt={review.userName} data-ai-hint="user avatar" />
                            <AvatarFallback>{review.userName.substring(0,1)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg text-primary">
                              Évaluation pour {review.ratedUserName} <span className="font-normal text-sm text-muted-foreground">par {review.userName}</span>
                            </CardTitle>
                            <CardDescription className="text-xs text-muted-foreground">{review.date}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-5 w-5",
                                review.rating > i ? "text-accent fill-accent" : "text-muted-foreground"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/90 leading-relaxed">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
