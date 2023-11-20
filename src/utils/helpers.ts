import SecretAndStorageManager from "./SecretAndStorageManager";

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isVerifyIdUnique = (referenceId: string) => {
  const secretManager = SecretAndStorageManager.getInstance();
  const secretMessage = secretManager.getSignedMessage(referenceId);
  return !secretMessage;
};
