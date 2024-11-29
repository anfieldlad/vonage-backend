import { VercelRequest, VercelResponse } from '@vercel/node';
import { generateSession, generateToken, auth } from '../lib/vonage';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      // Generate a new session
      const session = await generateSession();

      // Generate a token for the session
      const token = generateToken(session.sessionId, 'publisher'); // Default to 'publisher'

      // Respond with applicationId, sessionId, and token
      res.status(200).json({
        applicationId: auth.applicationId,
        sessionId: session.sessionId,
        token,
      });
    } catch (error) {
      console.error('Error generating video credentials:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}