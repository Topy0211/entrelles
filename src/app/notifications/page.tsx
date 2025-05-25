
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { BellRing, Car, MessageSquare } from 'lucide-react';

// Placeholder data for notifications
const notifications = [
  {
    id: '1',
    icon: <Car className="h-5 w-5 text-primary" />,
    title: 'Nouveau trajet publié !',
    description: 'Un trajet de Paris à Lyon (conductrice: Sophie L.) a été ajouté et correspond à vos alertes.',
    time: 'il y a 5 minutes',
    unread: true,
  },
  {
    id: '2',
    icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
    title: 'Message de Marie D.',
    description: 'Concernant le trajet pour Bordeaux : "Je confirme ma place, merci !"',
    time: 'il y a 1 heure',
    unread: true,
  },
  {
    id: '3',
    icon: <Car className="h-5 w-5 text-primary" />,
    title: 'Trajet Mis à Jour',
    description: 'Le trajet Lille - Marseille a été modifié par la conductrice.',
    time: 'il y a 3 heures',
    unread: false,
  },
  {
    id: '4',
    icon: <BellRing className="h-5 w-5 text-green-500" />,
    title: 'Bienvenue sur Entrelles !',
    description: 'N\'oubliez pas de compléter votre profil pour une meilleure expérience.',
    time: 'Hier',
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center border-b pb-6">
               <BellRing className="mx-auto h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-3xl md:text-4xl font-semibold text-primary">
                Mes Notifications
              </CardTitle>
              <CardDescription className="mt-2 text-lg text-foreground/80">
                Restez informée des dernières activités.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <BellRing className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                  <p className="text-xl">Aucune nouvelle notification</p>
                  <p>Revenez plus tard pour consulter vos mises à jour.</p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 transition-colors ${
                        notification.unread ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`mt-1 p-2 rounded-full ${notification.unread ? 'bg-primary/20' : 'bg-muted'}`}>
                          {notification.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className={`text-md font-semibold ${notification.unread ? 'text-primary' : 'text-foreground'}`}>
                              {notification.title}
                            </h3>
                            {notification.unread && (
                              <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                                Nouveau
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {notification.description}
                          </p>
                          <p className="text-xs text-muted-foreground/80 mt-1.5">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
            {notifications.length > 0 && (
                <CardFooter className="p-4 border-t justify-center">
                    <button className="text-sm text-primary hover:underline">
                        Marquer tout comme lu
                    </button>
                </CardFooter>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
