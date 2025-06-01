
import {genkit, type Genkit as GenkitType} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { config } from 'dotenv';

// Ensure .env is loaded, especially if this module is imported in contexts
// where Next.js might not have fully loaded env vars for Genkit's direct use.
config(); 

const googleAiPluginOptions: { apiKey?: string } = {};
if (process.env.GOOGLE_API_KEY) {
  googleAiPluginOptions.apiKey = process.env.GOOGLE_API_KEY;
} else {
  // This will log to the server console if the key is missing when Genkit initializes.
  // It's a critical piece of information for debugging.
  console.warn(
    "CRITICAL WARNING: GOOGLE_API_KEY environment variable is not set or not accessible to Genkit. " +
    "The Google AI plugin will likely fail to authenticate. " +
    "Please ensure GOOGLE_API_KEY is correctly set in your .env file and accessible to the Node.js process."
  );
}

export const ai: GenkitType = genkit({
  plugins: [googleAI(googleAiPluginOptions)],
  model: 'gemini-1.0-ultra', // Changed to gemini-1.0-ultra
});
