
"use client";

import { useState, useRef, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
// Types are still useful for structuring messages
import type { ChatbotInput, ChatbotOutput } from '@/ai/flows/chatbot'; // Path might be an issue if file is deleted
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MessageSquare, User, AlertTriangle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';


interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

// IMPORTANT: User must replace <YOUR_PROJECT_ID> with their actual Firebase Project ID
// and ensure the function is deployed to the 'us-central1' region or update the URL accordingly.
const CLOUD_FUNCTION_URL = 'https://us-central1-BDA63.cloudfunctions.net/chatbot';

export function ChatbotClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  useEffect(() => {
    const subscriptionStatus = localStorage.getItem('entrelles-subscription-status');
    setIsSubscribed(subscriptionStatus === 'active');
  }, []);

  useEffect(() => {
    if (isSubscribed && messages.length === 0) {
      setMessages([
        { id: 'welcome', text: "Bonjour ! Comment puis-je vous aider aujourd'hui concernant Entrelles ?", sender: 'bot' }
      ]);
    }
  }, [isSubscribed, messages.length]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isSubscribed) return;

    setErrorInfo(null);
    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    if (CLOUD_FUNCTION_URL.includes('<YOUR_PROJECT_ID>')) {
        const placeholderError = "L'URL de la fonction Cloud n'est pas configurée. Veuillez remplacer <YOUR_PROJECT_ID> dans le code.";
        const errorMessage: Message = { id: (Date.now() + 1).toString(), text: placeholderError, sender: 'bot' };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
        setErrorInfo(placeholderError);
        return;
    }
    
    try {
      const chatbotApiInput = { question: currentInput }; // Matches Cloud Function {question: ...}
      const apiResponse = await fetch(CLOUD_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatbotApiInput),
      });

      if (!apiResponse.ok) {
        let errorText = `Erreur réseau: ${apiResponse.status}`;
        try {
            const errorData = await apiResponse.json();
            errorText = errorData.message || errorData.error || errorText;
        } catch (parseError) {
            // Failed to parse error JSON, use status text
            errorText = `Erreur: ${apiResponse.status} - ${apiResponse.statusText}`;
        }
        throw new Error(errorText);
      }

      // Assuming ChatbotOutput structure { answer: string }
      const responseData = await apiResponse.json();
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: responseData.answer, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error("Chatbot API error:", error);
      const errorMessageText = error.message || "Désolée, une erreur est survenue. Veuillez réessayer.";
      const errorMessage: Message = { id: (Date.now() + 1).toString(), text: errorMessageText, sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
      setErrorInfo(errorMessageText);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('div > div'); 
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  if (isSubscribed === null) {
    return (
      <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px] w-full max-w-2xl mx-auto bg-card shadow-xl rounded-lg border p-6 items-center justify-center">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-6" />
        <div className="space-y-4 w-full">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-1/3 ml-auto" />
        </div>
         <Skeleton className="h-12 w-full mt-auto" />
      </div>
    );
  }

  if (!isSubscribed) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] max-h-[700px] w-full max-w-2xl mx-auto bg-card shadow-xl rounded-lg border p-8 text-center">
        <AlertTriangle className="h-16 w-16 text-primary mb-6" />
        <AlertTitle className="text-2xl font-semibold text-primary mb-3">Fonctionnalité Premium</AlertTitle>
        <AlertDescription className="text-lg text-foreground/80 mb-8">
          L'assistant virtuel Entrelles est disponible pour nos abonnés.
        </AlertDescription>
        <Button asChild size="lg" className="text-lg py-3 h-auto">
          <Link href="/home#abonnement">
            <Sparkles className="mr-2 h-5 w-5" />
            Découvrir l'abonnement
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px] w-full max-w-2xl mx-auto bg-card shadow-xl rounded-lg border">
      <div className="p-4 border-b flex items-center">
        <MessageSquare className="h-8 w-8 text-primary mr-3" />
        <div>
            <h2 className="text-xl font-semibold text-primary">Assistance Entrelles</h2>
            <p className="text-sm text-muted-foreground">Posez vos questions sur notre service.</p>
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
            {msg.sender === 'bot' && (
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://placehold.co/40x40/c73053/ffffff.png?text=E" alt="Bot" data-ai-hint="bot avatar"/>
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "p-3 rounded-lg shadow",
                msg.sender === 'user'
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-secondary text-secondary-foreground rounded-bl-none"
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.sender === 'user' && (
              <Avatar className="h-8 w-8">
                 <AvatarImage src="https://placehold.co/40x40/F8E4E9/333333.png?text=U" alt="User" data-ai-hint="user avatar"/>
                <AvatarFallback><User size={16}/></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-end space-x-2 mr-auto justify-start">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/40x40/c73053/ffffff.png?text=E" alt="Bot" data-ai-hint="bot avatar"/>
                    <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg shadow bg-secondary text-secondary-foreground rounded-bl-none">
                    <p className="text-sm italic">Entrelles écrit...</p>
                </div>
            </div>
        )}
      </ScrollArea>
      {errorInfo && (
          <div className="p-4 border-t">
              <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Erreur de Configuration</AlertTitle>
                  <AlertDescription>{errorInfo}</AlertDescription>
              </Alert>
          </div>
      )}
      <form onSubmit={handleSubmit} className="p-4 border-t flex items-center space-x-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question ici..."
          className="flex-grow h-12 text-base"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" className="h-12 w-12" disabled={isLoading}>
          <Send className="h-5 w-5" />
          <span className="sr-only">Envoyer</span>
        </Button>
      </form>
    </div>
  );
}
