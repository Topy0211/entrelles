
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proposer un trajet - Entrelles',
  description: 'Partagez votre trajet et vos frais sur Entrelles.',
};

export default function ProposerTrajetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
