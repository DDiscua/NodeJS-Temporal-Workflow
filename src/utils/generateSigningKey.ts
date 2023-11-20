import crypto from 'crypto';
import { SigningKeyPair } from '../interfaces/SignMessages.interfaces';

export const generateSigningKey = (): SigningKeyPair => {
  // Generate a keypair
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
  return {
    publicKey,
    privateKey,
  };
};
