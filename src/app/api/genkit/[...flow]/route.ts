// src/app/api/genkit/[...flow]/route.ts
import genkitNext from '@genkit-ai/next'; // Corrected to default import
import { ai } from '@/ai/genkit';
import '@/ai/flows/chatbot'; // Ensure chatbotFlow is registered with the ai instance

export const { POST } = genkitNext({ ai });
