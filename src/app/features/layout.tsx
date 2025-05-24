import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fonctionnalités - Entrelles',
  description: 'Découvrez toutes les fonctionnalités et services proposés par Entrelles.',
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
