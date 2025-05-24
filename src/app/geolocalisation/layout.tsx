import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Géolocalisation - Entrelles',
  description: 'Visualisez les trajets et les utilisateurs sur la carte.',
};

export default function GeolocalisationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
