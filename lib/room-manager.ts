import { generateSession, generateToken } from './vonage';

const roomSessions: Record<string, string> = {}; // Simple in-memory store

/**
 * Get or create a session ID for a room.
 * @param roomName - The name of the room.
 * @returns The session ID for the room.
 */
export const getSessionForRoom = async (roomName: string): Promise<string> => {
  if (!roomSessions[roomName]) {
    const session = await generateSession();
    roomSessions[roomName] = session.sessionId;
  }
  return roomSessions[roomName];
};

/**
 * Generate a token for a given room and user.
 * @param roomName - The name of the room.
 * @param userName - The name of the user.
 * @param role - The role of the user (default: publisher).
 * @returns A token for the session.
 */
export const getTokenForRoom = async (
  roomName: string,
  userName: string,
  role: string
): Promise<{ sessionId: string; token: string }> => {
  const sessionId = await getSessionForRoom(roomName);
  const token = generateToken(sessionId, role, userName);
  return { sessionId, token };
};