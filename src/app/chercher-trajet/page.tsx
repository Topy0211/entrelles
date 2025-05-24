// No 'use client' here - this is now a Server Component

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChercherTrajetForm } from '@/components/chercher-trajet/ChercherTrajetForm'; // Import the new client component

// Metadata is in layout.tsx

export default function ChercherTrajetPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <ChercherTrajetForm /> {/* Use the client component for the form */}
        
        <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Résultats de recherche</h3>
            <p className="text-muted-foreground">Les trajets disponibles apparaîtront ici.</p>
            {/* Placeholder for search results listing */}
            <div className="mt-6 p-8 border border-dashed border-border rounded-lg bg-card">
                Aucun trajet trouvé pour le moment. Essayez d'ajuster vos critères de recherche.
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
