import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Noter une Utilisatrice - Entrelles',
  description: 'Partagez votre expérience et évaluez les autres utilisatrices.',
};

export default function NoterUtilisatriceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
