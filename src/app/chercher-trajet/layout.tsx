import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chercher un trajet - Entrelles',
  description: 'Trouvez un covoiturage adapté à vos besoins sur Entrelles.',
};

export default function ChercherTrajetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
