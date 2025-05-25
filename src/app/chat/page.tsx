
'use client';

import { useState, useEffect, useRef, type FormEvent, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, User, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

function ChatPageContent() {
  const searchParams = useSearchParams();
  const publisherName = searchParams.get('publisherName') || 'Utilisatrice';
  const trajetDetails = searchParams.get('trajetDetails');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial message if trajetDetails are present
    if (trajetDetails) {
      setMessages([
        { 
          id: 'initial-context', 
          text: `Bonjour ! Prête à discuter concernant le trajet : ${trajetDetails} ?`, 
          sender: 'other',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } else {
      setMessages([
        { 
          id: 'initial-generic', 
          text: `Bonjour ! Vous pouvez commencer à discuter avec ${publisherName}.`, 
          sender: 'other',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [trajetDetails, publisherName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate a reply
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Message reçu ! Ceci est une réponse simulée.",
        sender: 'other',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
        <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px] w-full max-w-2xl mx-auto bg-card shadow-xl rounded-lg border">
          <div className="p-4 border-b flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={`https://placehold.co/40x40/F8E4E9/C73053.png?text=${publisherName.charAt(0)}`} alt={publisherName} data-ai-hint="user avatar" />
              <AvatarFallback>{publisherName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-primary">
                Conversation avec {publisherName}
              </h2>
              {trajetDetails && (
                <p className="text-sm text-muted-foreground truncate max-w-xs md:max-w-md">
                  Concernant : {trajetDetails}
                </p>
              )}
            </div>
          </div>
          <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-end space-x-2 max-w-[85%]",
                  msg.sender === 'user' ? "ml-auto justify-end" : "mr-auto justify-start"
                )}
              >
                {msg.sender === 'other' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://placehold.co/40x40/F8E4E9/C73053.png?text=${publisherName.charAt(0)}`} alt={publisherName} data-ai-hint="other user avatar" />
                    <AvatarFallback>{publisherName.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "p-3 rounded-lg shadow min-w-[80px]",
                    msg.sender === 'user'
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary text-secondary-foreground rounded-bl-none"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <p className={cn(
                      "text-xs mt-1",
                      msg.sender === 'user' ? "text-primary-foreground/70 text-right" : "text-secondary-foreground/70 text-left"
                  )}>{msg.timestamp}</p>
                </div>
                 {msg.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                     <AvatarImage src="https://placehold.co/40x40/333333/F8E4E9.png?text=Moi" alt="Moi" data-ai-hint="current user avatar" />
                    <AvatarFallback><User size={16}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>
          <form onSubmit={handleSubmit} className="p-4 border-t flex items-center space-x-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-grow h-12 text-base"
            />
            <Button type="submit" size="icon" className="h-12 w-12">
              <Send className="h-5 w-5" />
              <span className="sr-only">Envoyer</span>
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Wrap ChatPageContent with Suspense because useSearchParams() needs it
export default function ChatPage() {
  return (
    <Suspense fallback={<ChatPageLoading />}>
      <ChatPageContent />
    </Suspense>
  );
}

function ChatPageLoading() {
  // Basic loading state, can be enhanced
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
        <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px] w-full max-w-2xl mx-auto bg-card shadow-xl rounded-lg border">
          <div className="p-4 border-b flex items-center">
            <MessageCircle className="h-8 w-8 text-primary mr-3" />
            <div>
                <h2 className="text-xl font-semibold text-primary">Chargement de la conversation...</h2>
            </div>
          </div>
          <div className="flex-grow p-4 flex items-center justify-center">
            <p className="text-muted-foreground">Chargement...</p>
          </div>
           <div className="p-4 border-t flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Écrivez votre message..."
              className="flex-grow h-12 text-base"
              disabled
            />
            <Button type="submit" size="icon" className="h-12 w-12" disabled>
              <Send className="h-5 w-5" />
              <span className="sr-only">Envoyer</span>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
