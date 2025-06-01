
'use server';
/**
 * @fileOverview Defines the types for the chatbot. The actual Genkit flow logic
 * has been moved to a Firebase Cloud Function to support `output: 'export'` in Next.js.
 * This file is kept for type definitions that might be shared or referenced by the client.
 */

import {z} from 'genkit';

const ChatbotInputSchema = z.object({
  question: z.string().describe('The user\'s question about the Entrelles service.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  answer: z.string().describe('The chatbot\'s answer to the user\'s question.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

// The Genkit flow (chatbotFlow) and its prompt (chatbotPrompt) are now defined
// and executed within the Firebase Cloud Function located at `functions/src/flows/chatbotFlow.ts`.
// The Next.js client (`src/components/chatbot/ChatbotClient.tsx`) now makes a `fetch`
// request to this Cloud Function.

// The `ai` instance and `chatbot` wrapper function previously in this file
// are no longer used by the primary chatbot functionality from the Next.js client.
// If you have other Genkit flows that are intended to run within the Next.js server
// environment (and you are not using `output: 'export'`), you would define them here
// using the `ai` instance from `@/ai/genkit`.
