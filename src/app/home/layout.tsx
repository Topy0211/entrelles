import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accueil - Entrelles',
  description: 'Bienvenue sur Entrelles. Le covoiturage au féminin en toute confiance.',
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
