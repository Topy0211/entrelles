
import * as functions from 'firebase-functions';
import express from 'express'; // Changed from 'import * as express'
import cors from 'cors';       // Changed to default import for consistency
import { chatbotFlow, type ChatbotInput, type ChatbotOutput } from './flows/chatbotFlow';
// Logger can be useful for debugging in Cloud Functions
import * as logger from "firebase-functions/logger";

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Parse JSON request bodies
app.use(express.json());

// Chatbot endpoint
app.post('/chatbot', async (req, res) => {
  logger.info("Chatbot endpoint hit with body:", req.body);
  try {
    // Validate input - Zod can be used here too if needed, but flow will validate
    const userInput: ChatbotInput = req.body as ChatbotInput; // Assuming body matches ChatbotInput

    if (!userInput || typeof userInput.question !== 'string') {
      logger.warn("Invalid request body:", userInput);
      return res.status(400).json({ error: 'Invalid request. "question" is required and must be a string.' });
    }

    const result: ChatbotOutput = await chatbotFlow(userInput);
    logger.info("Chatbot flow result:", result);
    return res.json(result);

  } catch (error: any) {
    logger.error('Error processing chatbot request:', error);
    // Check if the error is from Genkit or a Zod validation error
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid input data.', details: error.errors });
    }
    return res.status(500).json({ error: 'An internal error occurred while processing your request.', details: error.message });
  }
});

// Expose Express API as a single Cloud Function
export const api = functions.https.onRequest(app);
