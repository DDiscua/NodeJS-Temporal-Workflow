
export interface SigningKeyPair {
  publicKey: string;
  privateKey: string;
}

export interface SignMessagePayload {
  message: string;
  referenceId: string;
}

export interface SignMessageResponse {
  message: string;
}

export interface ClientPayload {
  message: string;
  referenceId: string;
}
