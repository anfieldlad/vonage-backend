import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';
import { MediaMode } from '@vonage/video';
import { ArchiveMode } from '@vonage/video';

const auth = new Auth({
  applicationId: process.env.VONAGE_APPLICATION_ID || '',
  privateKey: Buffer.from(process.env.VONAGE_PRIVATE_KEY || '', 'base64').toString('ascii'),
});

const vonage = new Vonage(auth);

/**
 * Generate a new Vonage Video API session.
 * @param mediaMode - The media mode (ROUTED or RELAYED).
 * @returns The created session.
 */
const generateSession = async (mediaMode: MediaMode = MediaMode.ROUTED, archiveMode: ArchiveMode = ArchiveMode.ALWAYS) => {
  return await vonage.video.createSession({ archiveMode, mediaMode });
};

/**
 * Generate a token for a given session ID.
 * @param sessionId - The session ID.
 * @param role - The role of the token (e.g., 'publisher', 'subscriber', or 'moderator').
 * @param expireTime - Optional expiration timestamp (in seconds since epoch).
 * @returns The generated token.
 */
const generateToken = (sessionId: string, role: string, userName: string, expireTime?: number) => {
  return vonage.video.generateClientToken(sessionId, {
    role,
    expireTime: expireTime || Math.floor(Date.now() / 1000) + 3600, // Default to 1 hour from now
    data: JSON.stringify({ name: userName })
  });
};

export { vonage, generateSession, generateToken, auth };