
'use server';
/**
 * @fileOverview A chatbot for answering frequently asked questions about the Entrelles service.
 *
 * - chatbot - An async wrapper function to call the chatbotFlow.
 * - chatbotFlow - The Genkit flow action for the chatbot. This is the main export for API route.
 * - ChatbotInput - The input type for the chatbot function.
 * - ChatbotOutput - The return type for the chatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotInputSchema = z.object({
  question: z.string().describe('The user\'s question about the Entrelles service.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  answer: z.string().describe('The chatbot\'s answer to the user\'s question.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

// This is the Genkit Action (flow)
export const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input: ChatbotInput): Promise<ChatbotOutput> => {
    try {
      console.log(`[chatbotFlow] Received input: ${JSON.stringify(input)}`);
      const result = await prompt(input); // 'prompt' is defined below
      const output = result.output;

      if (!output) {
        console.error(
          "[chatbotFlow] ERROR: Did not receive the expected output from the prompt. Full result:",
          JSON.stringify(result, null, 2)
        );
        return { answer: "Désolé, je n'ai pas pu générer de réponse pour le moment. Veuillez réessayer (E1)." };
      }
      console.log(`[chatbotFlow] Successfully generated output: ${JSON.stringify(output)}`);
      return output;
    } catch (error: any) {
      console.error("[chatbotFlow] CATCH BLOCK: An error occurred during prompt execution:", error);
      // Log more details about the error
      console.error("[chatbotFlow] CATCH BLOCK: Error message:", error.message);
      console.error("[chatbotFlow] CATCH BLOCK: Error name:", error.name);
      console.error("[chatbotFlow] CATCH BLOCK: Error stack:", error.stack);
      
      if (error.cause) {
        console.error("[chatbotFlow] CATCH BLOCK: Error cause:", error.cause);
      }

      // Provide a more informative error message to the client
      let clientErrorMessage = "Désolé, une erreur interne est survenue lors de la génération de la réponse. Veuillez réessayer.";
      if (error.message) {
        clientErrorMessage = `Désolé, une erreur interne est survenue: ${error.message}. Veuillez réessayer. (E2)`;
      } else if (typeof error === 'string') {
        clientErrorMessage = `Désolé, une erreur interne est survenue: ${error}. Veuillez réessayer. (E3)`;
      }
      
      return { answer: clientErrorMessage };
    }
  }
);

// This is an async wrapper function that can be called from server components or other server-side code.
// It's good practice to keep it if you need to call the flow from elsewhere in your server-side app,
// but it's 'chatbotFlow' that should be passed to 'genkitNext'.
export async function chatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a chatbot designed to answer frequently asked questions about the Entrelles service, a French-language ride-sharing app for women.

  Here are some example FAQs:
  - What is Entrelles?
  Entrelles is a ride-sharing app for women, designed to provide a safe and reliable transportation option.
  - How does the fare estimation work?
  The fare is estimated at 0.20€/km + 3€ commission.
  - How can I access, modify, or delete my personal data?
  You can access, modify, or delete your personal data at any time. Contact us at contact@entrelles.com for any questions.

  Now, answer the following question:
  Question: {{{question}}}`,
});
