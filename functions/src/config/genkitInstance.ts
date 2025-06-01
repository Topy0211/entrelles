
import {genkit, type Genkit as GenkitType} from "genkit";
import {googleAI} from "@genkit-ai/googleai";
import {config as dotenvConfig} from "dotenv";

// Load environment variables from .env file
dotenvConfig();

const googleAiPluginOptions: {apiKey?: string} = {};
if (process.env.GOOGLE_API_KEY) {
  googleAiPluginOptions.apiKey = process.env.GOOGLE_API_KEY;
} else {
  console.warn(
    "CRITICAL WARNING (Cloud Function): GOOGLE_API_KEY environment " +
    "variable is not set. The Google AI plugin will likely fail to authenticate."
  );
}

export const ai: GenkitType = genkit({
  plugins: [googleAI(googleAiPluginOptions)],
  model: "gemini-1.0-pro", // Changed to gemini-1.0-pro
});
