
// src/app/api/genkit/[...flow]/route.ts
import genkitNext from '@genkit-ai/next'; // Use default import directly
import { ai } from '@/ai/genkit'; // Use original name for the ai instance
import '@/ai/flows/chatbot'; // Ensure chatbotFlow is registered with the ai instance

// Call the function directly with an inline object, passing the imported ai instance
export const POST = genkitNext({
  ai: ai,
});
