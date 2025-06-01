
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ai } from './config/genkitInstance';
import { z } from 'genkit';
import cors from 'cors';

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp();
}

// Enable CORS for all origins
const corsHandler = cors({ origin: true });

// Define Input and Output Schemas for the chatbot (consistent with Next.js app)
const ChatbotInputSchema = z.object({
  question: z.string().describe("The user's question about the Entrelles service."),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  answer: z.string().describe("The chatbot's answer to the user's question."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

// Define the Genkit Prompt (consistent with Next.js app)
const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPromptCloud', // Name can be different if needed
  input: { schema: ChatbotInputSchema },
  output: { schema: ChatbotOutputSchema },
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

// Define the Genkit Flow (consistent with Next.js app)
const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlowCloud', // Name can be different
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input: ChatbotInput): Promise<ChatbotOutput> => {
    try {
      functions.logger.info(`[chatbotFlowCloud] Received input: ${JSON.stringify(input)}`);
      const { output } = await chatbotPrompt(input);

      if (!output) {
        functions.logger.error(
          "[chatbotFlowCloud] ERROR: Did not receive the expected output from the prompt."
        );
        return { answer: "Désolé, je n'ai pas pu générer de réponse pour le moment. Veuillez réessayer (CF-E1)." };
      }
      functions.logger.info(`[chatbotFlowCloud] Successfully generated output: ${JSON.stringify(output)}`);
      return output;
    } catch (error: any) {
      functions.logger.error("[chatbotFlowCloud] CATCH BLOCK: An error occurred:", error);
      let clientErrorMessage = "Désolé, une erreur interne est survenue lors de la génération de la réponse. Veuillez réessayer (CF-E2).";
      if (error.message) {
        clientErrorMessage = `Désolé, une erreur interne est survenue: ${error.message}. Veuillez réessayer. (CF-E3)`;
      }
      return { answer: clientErrorMessage };
    }
  }
);

// HTTPS Cloud Function
export const chatbot = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    try {
      const { question } = req.body as ChatbotInput; // Assuming body is already parsed JSON by Firebase
      if (!question) {
        res.status(400).json({ error: 'Missing "question" in request body' });
        return;
      }

      const input: ChatbotInput = { question };
      const result = await chatbotFlow(input);
      res.status(200).json(result);

    } catch (error: any) {
      functions.logger.error('Error in chatbot HTTPS function:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  });
});
