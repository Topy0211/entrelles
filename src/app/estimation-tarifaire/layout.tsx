import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estimation Tarifaire - Entrelles',
  description: 'Estimez le coût de votre covoiturage sur Entrelles.',
};

export default function EstimationTarifaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
