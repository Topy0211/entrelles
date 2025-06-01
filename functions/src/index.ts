
"use server";

import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  chatbotFlow,
  type ChatbotInput,
  type ChatbotOutput,
} from "./flows/chatbotFlow";
import * as logger from "firebase-functions/logger";

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.post("/chatbot", async (req, res) => {
  logger.info("Chatbot endpoint hit with body:", req.body);
  try {
    const userInput: ChatbotInput = req.body as ChatbotInput;

    if (!userInput || typeof userInput.question !== "string") {
      logger.warn("Invalid request body:", userInput);
      const errorMsg =
        "Invalid request. \"question\" is required" +
        " and must be a string.";
      return res.status(400).json({error: errorMsg});
    }

    const result: ChatbotOutput = await chatbotFlow(userInput);
    logger.info("Chatbot flow result:", result);
    return res.json(result);
  } catch (error: unknown) {
    logger.error("Error processing chatbot request:", error);
    let errorMessage =
      "An internal error occurred while processing your request.";
    const errorDetails: unknown = undefined;

    if (error instanceof Error) {
      errorMessage = error.message;
    }

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

export const api = functions.https.onRequest(app);
