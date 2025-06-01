
'use server';
/**
 * @fileOverview A chatbot for answering frequently asked questions about the Entrelles service.
 *
 * - chatbot - A function that handles the chatbot interaction.
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

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input: ChatbotInput): Promise<ChatbotOutput> => {
    try {
      console.log(`[chatbotFlow] Received input: ${JSON.stringify(input)}`);
      const result = await prompt(input);
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
      console.error("[chatbotFlow] CATCH BLOCK: Error message:", error.message);
      console.error("[chatbotFlow] CATCH BLOCK: Error name:", error.name);
      console.error("[chatbotFlow] CATCH BLOCK: Error stack:", error.stack);
      // You can inspect other properties of 'error' if it's a custom error object from a library
      if (error.cause) {
        console.error("[chatbotFlow] CATCH BLOCK: Error cause:", error.cause);
      }

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

