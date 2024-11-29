import { VercelRequest, VercelResponse } from '@vercel/node';
import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';
import { MediaMode } from '@vonage/video';

// Initialize authentication
const auth = new Auth({
  applicationId: process.env.VONAGE_APPLICATION_ID || '',
  privateKey: Buffer.from(process.env.VONAGE_PRIVATE_KEY || '', 'base64').toString('ascii'),
});

// Function to generate JWT
const generateJwt = async (): Promise<string> => {
  return await auth.createBearerHeader();
};

// Initialize Vonage
const vonage = new Vonage(auth);

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      // Log environment variables to debug
      console.log('Environment Variables:', {
        applicationId: process.env.VONAGE_APPLICATION_ID,
        privateKeyExists: !!process.env.VONAGE_PRIVATE_KEY,
      });

      // Generate and log the JWT
      const jwt = await generateJwt();
      console.log('Generated JWT:', jwt);

      // Create a session with MediaMode.RELAYED
      console.log('Creating Vonage session...');
      const session = await vonage.video.createSession({ mediaMode: MediaMode.RELAYED });

      console.log('Session created successfully:', session.sessionId);
      res.status(200).json({ sessionId: session.sessionId });
    } catch (error) {
      // Log full error details for debugging
      console.error('Error creating session:', error);

      res.status(500).json({
        error: error.message || 'An error occurred',
        details: error.response ? await error.response.text() : 'No response body',
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}