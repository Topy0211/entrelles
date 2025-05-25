
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Messagerie - Entrelles',
  description: 'Discutez avec d\'autres utilisatrices Entrelles.',
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
