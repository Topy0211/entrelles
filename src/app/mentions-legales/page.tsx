import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mentions Légales - Entrelles',
  description: 'Consultez les mentions légales et la politique de protection des données personnelles d\'Entrelles.',
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-semibold text-primary">Mentions Légales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Informations Générales</h2>
              <p><strong>Nom de l'application :</strong> Entrelles</p>
              <p><strong>Description :</strong> Application de covoiturage au féminin.</p>
              <p><strong>Contact :</strong> <a href="mailto:contact@entrelles.com" className="text-primary hover:underline">contact@entrelles.com</a></p>
              {/* Add more general legal info if available, e.g., company details, hosting */}
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Protection des données personnelles</h2>
              <p className="mb-2">
                Conformément au RGPD et à la CNIL, nous assurons la protection de vos données personnelles.
                Les informations recueillies sont destinées à faciliter votre expérience sur notre application,
                et ne seront utilisées que dans le cadre du service de covoiturage proposé.
              </p>
              <p>
                Vous pouvez accéder, modifier ou supprimer vos données personnelles à tout moment.
                Pour toute question concernant vos données, contactez-nous à : <a href="mailto:contact@entrelles.com" className="text-primary hover:underline">contact@entrelles.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Propriété Intellectuelle</h2>
              <p>
                Tous les contenus présents sur l'application Entrelles (logo, textes, images, interface) sont la propriété exclusive d'Entrelles ou de ses partenaires et sont protégés par les lois relatives à la propriété intellectuelle. Toute reproduction non autorisée est interdite.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Conditions d'utilisation</h2>
              <p>
                L'utilisation de l'application Entrelles implique l'acceptation pleine et entière des conditions générales d'utilisation. Celles-ci sont susceptibles d'être modifiées ou complétées à tout moment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Responsabilité</h2>
              <p>
                Entrelles s'efforce de fournir un service fiable et sécurisé. Toutefois, la responsabilité d'Entrelles ne saurait être engagée en cas de dommages directs ou indirects résultant de l'utilisation du service, y compris en cas de litige entre utilisatrices.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
