import { VercelRequest, VercelResponse } from '@vercel/node';
import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';
import { MediaMode } from '@vonage/video';

// Initialize authentication
const auth = new Auth({
  applicationId: process.env.VONAGE_APPLICATION_ID || '',
  privateKey: Buffer.from(process.env.VONAGE_PRIVATE_KEY || '', 'base64').toString('ascii'),
});

// Initialize Vonage
const vonage = new Vonage(auth);

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      console.log('Creating Vonage session with MediaMode.ROUTED...');
      const session = await vonage.video.createSession({ mediaMode: MediaMode.ROUTED });
      console.log('Session created successfully:', session.sessionId);
      res.status(200).json({ sessionId: session.sessionId });
    } catch (error) {
      console.error('Error creating session:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
