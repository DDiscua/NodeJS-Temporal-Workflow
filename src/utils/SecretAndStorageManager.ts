import { generateSigningKey } from './generateSigningKey';

class SecretAndStorageManager {
  static instance: SecretAndStorageManager;
  private privateKey: string;
  private publicKey: string;
  // In-memory store for simplicity
  public signedMessages;

  constructor() {
    this.signedMessages = new Map();
    this.setupKeyPair();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new SecretAndStorageManager();
    }
    return this.instance;
  }

  public setupKeyPair() {
    const { publicKey, privateKey } = generateSigningKey();
    this.setPrivateKey(privateKey);
    this.setPublicKey(publicKey);
  }

  public setPrivateKey(key: string) {
    this.privateKey = key;
  }

  public setPublicKey(key: string) {
    this.publicKey = key;
  }

  public getPrivateKey() {
    return this.privateKey;
  }

  public getPublicKey() {
    return this.publicKey;
  }

  public addSignedMessage(referenceId: string, signedMessage: string) {
    this.signedMessages.set(referenceId, signedMessage);
  }

  public getSignedMessage(referenceId: string) {
    return this.signedMessages.get(referenceId);
  }

  public getSignedMessages() {
    return this.signedMessages;
  }
}

export default SecretAndStorageManager;
