// src/app/api/genkit/[...flow]/route.ts
import genkitNext from '@genkit-ai/next';
import { ai } from '@/ai/genkit'; // ai instance, may or may not be used by this handler pattern
import { chatbot, type ChatbotInput, type ChatbotOutput } from '@/ai/flows/chatbot';
import { NextResponse } from 'next/server';

export const POST = genkitNext({
  // Implementing the handler structure as per user's suggestion.
  // Assuming 'input' to the handler is the parsed JSON body for the chatbot flow.
  handler: async (input: ChatbotInput): Promise<ChatbotOutput | NextResponse> => {
    // The user's snippet included: const result = await ai.run(input);
    // Replacing this with a direct call to the imported 'chatbot' flow function.
    // This configuration assumes this route handler is specifically for 'chatbotFlow'.
    try {
      const result = await chatbot(input);
      // It's unclear if genkitNext expects the raw result or a NextResponse here.
      // Returning the raw result first. If issues persist, this might need to be NextResponse.json(result).
      return result;
    } catch (error: any)
      console.error("Error in custom genkitNext handler:", error);
      // Ensure a response is always returned that matches one of the handler's expected return types
      if (error instanceof Error) {
        return NextResponse.json(
          { error: "Handler execution failed", details: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: "Handler execution failed", details: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
});

// This import ensures that flows defined in chatbot.ts are known to the main 'ai' instance,
// which is generally good practice, though its direct effect with the custom handler pattern is less certain.
import '@/ai/flows/chatbot';
