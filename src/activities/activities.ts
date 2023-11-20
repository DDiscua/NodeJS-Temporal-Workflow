import crypto from 'crypto';
import SecretManager from '../utils/SecretAndStorageManager';
import { addSignedMessage } from '../database/operations';

export async function signMessage(message: string, referenceId: string): Promise<string> {
  const secretManager = SecretManager.getInstance();
  const signer = crypto.createSign('SHA256');
  signer.update(message);
  signer.end();
  const signedMessage = signer.sign(secretManager.getPrivateKey(), 'base64');

  // Store the signed message in memory
  addSignedMessage(referenceId, signedMessage);
  return signedMessage;
}
