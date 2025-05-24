"use client";

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { chatbot, type ChatbotInput, type ChatbotOutput } from '@/ai/flows/chatbot';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export function ChatbotClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatbotInput: ChatbotInput = { question: input };
      const response: ChatbotOutput = await chatbot(chatbotInput); // Call the server action
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: response.answer, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = { id: (Date.now() + 1).toString(), text: "Désolée, je n'ai pas pu répondre. Veuillez réessayer.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('div > div'); // Adjust selector based on ScrollArea implementation
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);
  
  // Welcome message
  useEffect(() => {
    setMessages([
      { id: 'welcome', text: "Bonjour ! Comment puis-je vous aider aujourd'hui concernant Entrelles ?", sender: 'bot' }
    ]);
  }, []);


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
                <AvatarImage src="https://placehold.co/40x40/c73053/ffffff.png?text=E" alt="Bot" data-ai-hint="bot avatar" />
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
                 <AvatarImage src="https://placehold.co/40x40/F8E4E9/333333.png?text=U" alt="User" data-ai-hint="user avatar" />
                <AvatarFallback><User size={16}/></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-end space-x-2 mr-auto justify-start">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/40x40/c73053/ffffff.png?text=E" alt="Bot" data-ai-hint="bot avatar" />
                    <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg shadow bg-secondary text-secondary-foreground rounded-bl-none">
                    <p className="text-sm italic">Entrelles écrit...</p>
                </div>
            </div>
        )}
      </ScrollArea>
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
