// This file is no longer needed as the Genkit backend has been moved to Firebase Cloud Functions
// to support `output: 'export'` in Next.js.
// It is kept to prevent build errors related to missing files if referenced elsewhere,
// but it should not be actively used.
// You can safely delete this file if no other part of the build process requires its presence.

export const POST = () => {
  return new Response('This API route is deprecated. Use the Firebase Cloud Function for chatbot.', { status: 410 });
};

// To ensure it's treated as a module.
export {};
