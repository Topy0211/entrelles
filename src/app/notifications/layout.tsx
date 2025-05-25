import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notifications - Entrelles',
  description: 'Consultez vos dernières notifications concernant les trajets et l\'activité de l\'application.',
};

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
