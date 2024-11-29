import { VercelRequest, VercelResponse } from '@vercel/node';
import { getTokenForRoom } from '../lib/room-manager';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (for development only)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { roomName, userName, role } = req.body;

    if (!roomName || !userName) {
      res.status(400).json({ error: 'roomName and userName are required' });
      return;
    }

    try {
      // Call existing function to get sessionId and token
      const { sessionId, token } = await getTokenForRoom(roomName, userName, role || 'publisher');

      // Respond with the API Key, sessionId, and token
      res.status(200).json({
        roomName,
        sessionId,
        token,
      });
    } catch (error) {
      console.error('Error joining room:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}