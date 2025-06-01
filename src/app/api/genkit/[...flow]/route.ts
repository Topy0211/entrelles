
// src/app/api/genkit/[...flow]/route.ts
import genkitNext from '@genkit-ai/next';
// Import the actual chatbot flow function
import { chatbot } from '@/ai/flows/chatbot'; 
// We no longer need to import 'ai' from '@/ai/genkit' here if passing the flow directly.
// We also don't need ChatbotInput/ChatbotOutput types here if genkitNext handles it.
// NextResponse might still be needed for error handling if we customize, but let's see.

// Pass the chatbot flow directly to genkitNext
// This assumes genkitNext is designed to take a flow (Action) as its primary argument.
export const POST = genkitNext(chatbot);

// Ensure other flows are registered with the main 'ai' instance if they exist,
// though this file now only directly deals with the chatbot flow for this route.
import '@/ai/flows/chatbot';

