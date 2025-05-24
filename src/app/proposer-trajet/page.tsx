
// No 'use client' here - this is now a Server Component

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProposerTrajetForm } from '@/components/proposer-trajet/ProposerTrajetForm'; // Import the new client component

// Metadata is handled by layout.tsx

export default function ProposerTrajetPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <ProposerTrajetForm /> {/* Use the client component for the form */}
      </main>
      <Footer />
    </>
  );
}
