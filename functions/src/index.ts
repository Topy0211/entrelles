
"use server";

import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  chatbotFlow,
  type ChatbotInput,
  type ChatbotOutput,
} from "./flows/chatbotFlow";
// Logger can be useful for debugging in Cloud Functions
import * as logger from "firebase-functions/logger";

const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

// Parse JSON request bodies
app.use(express.json());

// Chatbot endpoint
app.post("/chatbot", async (req, res) => {
  logger.info("Chatbot endpoint hit with body:", req.body);
  try {
    // Validate input - Zod can be used here too if needed, but flow will validate
    const userInput: ChatbotInput = req.body as ChatbotInput;

    if (!userInput || typeof userInput.question !== "string") {
      logger.warn("Invalid request body:", userInput);
      const errorMsg =
        "Invalid request. \"question\" is required and must be a string.";
      return res.status(400).json({error: errorMsg});
    }

    const result: ChatbotOutput = await chatbotFlow(userInput);
    logger.info("Chatbot flow result:", result);
    return res.json(result);
  } catch (error: unknown) {
    logger.error("Error processing chatbot request:", error);
    let errorMessage =
      "An internal error occurred while processing your request.";
    let errorDetails: unknown = undefined;

    if (error instanceof Error) {
      errorMessage = error.message;
      // For security, avoid sending full stack traces to the client.
      // errorDetails = error.stack; // Or a subset of error properties
    }

    // Check if the error is from Zod (ZodError has a specific structure)
    // Assuming Genkit might throw ZodErrors directly or wrapped
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      error.name === "ZodError" &&
      "errors" in error
    ) {
      const zodError = error as {errors: unknown};
      return res.status(400).json({
        error: "Invalid input data.",
        details: zodError.errors,
      });
    }

    return res.status(500).json({error: errorMessage, details: errorDetails});
  }
});

// Expose Express API as a single Cloud Function
export const api = functions.https.onRequest(app);
