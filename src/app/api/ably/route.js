import Ably from 'ably';

// Ensure Vercel doesn't cache this result
export const revalidate = 0;

export async function GET(request) {
  try {
    const client = new Ably.Rest(process.env.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: 'realtime-comment-system', // Optionally use a unique clientId
    });

    return new Response(JSON.stringify(tokenRequestData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating token request:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate token' }),
      { status: 500 }
    );
  }
}
