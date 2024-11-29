import { VercelRequest, VercelResponse } from '@vercel/node';
import { getTokenForRoom } from '../lib/room-manager';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method === 'POST') {
    const { roomName, userName, role } = req.body;

    if (!roomName || !userName) {
      res.status(400).json({ error: 'roomName and userName are required' });
      return;
    }

    try {
      const { sessionId, token } = await getTokenForRoom(roomName, userName, role || 'publisher');
      res.status(200).json({ roomName, sessionId, token });
    } catch (error) {
      console.error('Error joining room:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}