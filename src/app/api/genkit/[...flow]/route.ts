
// This file is effectively deprecated and its logic moved to Firebase Cloud Functions.
// The following is added to satisfy Next.js `output: 'export'` requirements for dynamic routes.

export async function generateStaticParams() {
  // Return an empty array as there are no specific paths to pre-render for this deprecated route.
  return [];
}

// Dummy GET handler
export async function GET() {
  return new Response('This API route has been moved to Firebase Cloud Functions and is deprecated.', {
    status: 410, // HTTP 410 Gone
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

// Dummy POST handler
export async function POST() {
  return new Response('This API route has been moved to Firebase Cloud Functions and is deprecated.', {
    status: 410, // HTTP 410 Gone
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
