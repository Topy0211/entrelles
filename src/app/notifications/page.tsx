
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { BellRing, Car, MessageSquare, AlertCircle } from 'lucide-react';

// Define a type for our notifications
interface AppNotification {
  id: string;
  iconName: 'Car' | 'MessageSquare' | 'BellRing' | 'AlertCircle'; // Added AlertCircle for generic fallback
  title: string;
  description: string;
  time: string;
  unread: boolean;
  link?: string;
}

const iconComponents: Record<AppNotification['iconName'], React.ElementType> = {
  Car: Car,
  MessageSquare: MessageSquare,
  BellRing: BellRing,
  AlertCircle: AlertCircle, // Fallback icon
};

const getIcon = (iconName: AppNotification['iconName']) => {
  const IconComponent = iconComponents[iconName] || AlertCircle;
  const colorClass = iconName === 'Car' ? 'text-primary' : 
                     iconName === 'MessageSquare' ? 'text-blue-500' :
                     iconName === 'BellRing' ? 'text-green-500' :
                     'text-muted-foreground';
  return <IconComponent className={`h-5 w-5 ${colorClass}`} />;
};


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    const loadNotifications = () => {
      const storedNotificationsRaw = localStorage.getItem('entrelles-notifications');
      if (storedNotificationsRaw) {
        try {
          const parsedNotifications: AppNotification[] = JSON.parse(storedNotificationsRaw);
          setNotifications(parsedNotifications);
        } catch (error) {
          console.error("Error parsing notifications from localStorage", error);
          // Initialize with default if parsing fails or empty
          setNotifications([
            {
              id: 'default-welcome',
              iconName: 'BellRing',
              title: 'Bienvenue sur Entrelles !',
              description: 'N\'oubliez pas de compléter votre profil pour une meilleure expérience.',
              time: 'Maintenant',
              unread: true,
            },
          ]);
        }
      } else {
        // Initialize with default if no notifications are stored
         setNotifications([
            {
              id: 'default-welcome-initial',
              iconName: 'BellRing',
              title: 'Bienvenue sur Entrelles !',
              description: 'N\'oubliez pas de compléter votre profil pour une meilleure expérience.',
              time: 'Maintenant',
              unread: true,
            },
          ]);
      }
    };
    loadNotifications();
    // Optional: Listen for storage changes to update in real-time if other tabs modify it
    // window.addEventListener('storage', loadNotifications);
    // return () => window.removeEventListener('storage', loadNotifications);
  }, []);

  const markAllAsRead = () => {
    // Option 1: Mark all as read visually
    // setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    // localStorage.setItem('entrelles-notifications', JSON.stringify(notifications.map(n => ({ ...n, unread: false }))));
    
    // Option 2: Clear all notifications
    setNotifications([]);
    localStorage.removeItem('entrelles-notifications');
  };


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
                          {getIcon(notification.iconName)}
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
                    <button onClick={markAllAsRead} className="text-sm text-primary hover:underline">
                        Effacer toutes les notifications
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
