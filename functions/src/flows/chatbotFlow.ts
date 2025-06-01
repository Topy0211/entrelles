
'use server';
/**
 * @fileOverview Defines the Genkit flow for the chatbot.
 * This flow is executed within a Firebase Cloud Function.
 */

import { ai } from '../config/genkitInstance';
import { z } from 'genkit';

// Define the input schema for the chatbot
const ChatbotInputSchema = z.object({
  question: z.string().describe('The user\'s question about the Entrelles service.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

// Define the output schema for the chatbot
const ChatbotOutputSchema = z.object({
  answer: z.string().describe('The chatbot\'s answer to the user\'s question.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

// Define the prompt for the chatbot
const chatbotPrompt = ai.definePrompt({
  name: 'entrellesChatbotPrompt',
  input: { schema: ChatbotInputSchema },
  output: { schema: ChatbotOutputSchema },
  prompt: `You are a helpful assistant for Entrelles, a carpooling service exclusively for women.
Answer the user's question about the service. Be concise and friendly.

User's question: {{{question}}}

Provide your answer in the "answer" field.`,
  config: {
    model: 'gemini-1.5-flash-latest', // Ensure model is specified if not default in ai instance
     safetySettings: [ // Optional: Adjust safety settings if needed
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  }
});

// Define the Genkit flow
export const chatbotFlow = ai.defineFlow(
  {
    name: 'entrellesChatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input: ChatbotInput): Promise<ChatbotOutput> => {
    const { output } = await chatbotPrompt(input);
    if (!output) {
      // Fallback or error response if output is null/undefined
      return { answer: "Je suis désolée, je n'ai pas pu générer de réponse pour le moment. Veuillez réessayer." };
    }
    return output;
  }
);
