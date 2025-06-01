
// src/app/api/genkit/[...flow]/route.ts
import genkitNext from '@genkit-ai/next';
// Import the actual chatbot flow action, not the wrapper function
import { chatbotFlow } from '@/ai/flows/chatbot'; 

// Pass the chatbot flow action directly to genkitNext
export const POST = genkitNext(chatbotFlow);

// This import ensures that flows defined in chatbot.ts (like chatbotFlow)
// are registered with the global 'ai' instance. This can be important for
// Genkit's internal mechanisms or dev tooling, even if chatbotFlow is passed directly above.
// It also ensures that the 'ai' instance is initialized before 'chatbotFlow' is used by genkitNext.
import '@/ai/flows/chatbot';
