
// src/app/api/genkit/[...flow]/route.ts
import genkitNextFunction from '@genkit-ai/next'; // Renamed for clarity
import { ai as mainAiInstance } from '@/ai/genkit'; // Renamed for clarity
import type { Genkit } from 'genkit'; // Explicitly import the Genkit type
import '@/ai/flows/chatbot'; // Ensure chatbotFlow is registered with the ai instance

// Define the expected shape of the options object for clarity
interface ExpectedGenkitNextOptions {
  ai: Genkit; // The Genkit instance
}

const optionsForGenkitNext: ExpectedGenkitNextOptions = {
  ai: mainAiInstance,
};

// Call the function with the explicitly typed options
export const POST = genkitNextFunction(optionsForGenkitNext);
