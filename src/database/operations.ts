import { LOGGER } from '../logger';
import { SignedMessageModel, ISignedMessage } from './signedMessages';

export const getSignedMessage = async (referenceId: string): Promise<ISignedMessage | null> => {
  try {
    return await SignedMessageModel.findOne({ referenceId: referenceId }).exec();
  } catch (error: any) {
    LOGGER.error('[getSignedMessage][error]', {
      metadata: { error: error, stack: error.stack?.toString() },
    });
    return null;
  }
};

export const getSignedMessages = async (): Promise<ISignedMessage[] | []> => {
  try {
    return await SignedMessageModel.find().exec();
  } catch (error: any) {
    LOGGER.error('[getSignedMessages][error]', {
      metadata: { error: error, stack: error.stack?.toString() },
    });

    return [];
  }
};

export const addSignedMessage = async (referenceId: string, signedMessage: string): Promise<ISignedMessage | null> => {
  try {
    const newSignedMessage = new SignedMessageModel({
      referenceId: referenceId,
      signedMessage: signedMessage,
    });

    await newSignedMessage.save();

    return newSignedMessage;
  } catch (error: any) {
    LOGGER.error('[addSignedMessage][error]', {
      metadata: { error: error, stack: error.stack?.toString() },
    });

    return null;
  }
};
