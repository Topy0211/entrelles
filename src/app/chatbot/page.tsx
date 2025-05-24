import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatbotClient } from '@/components/chatbot/ChatbotClient';

export const metadata: Metadata = {
  title: 'Chatbot - Entrelles',
  description: 'Obtenez des réponses à vos questions fréquentes grâce à notre assistant virtuel.',
};

export default function ChatbotPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
        <ChatbotClient />
      </main>
      <Footer />
    </>
  );
}
