import express, { Router, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import ClientConnector from '../client';
import { StatusCodes } from 'http-status-codes';
import { getErrorMessage } from '../utils';
import { LOGGER } from '../logger';
import { SignMessagePayload } from '../interfaces';
import SecretAndStorageManager from '../utils/SecretAndStorageManager';
import {
  FIELD_REQUIRED,
  MESSAGE_SIGNED,
  MESSAGE_SIGNED_IN_PROGRESS,
  REFERENCE_ID_DUPLICATE,
  REFERENCE_ID_NOT_FOUND,
} from '../constants';
import { isVerifyIdUnique } from '../utils/helpers';

const signMessage: Router = express.Router();

signMessage.post('/sign-message', async (req: Request, res: Response) => {
  try {
    const payload = req.body as SignMessagePayload;
    const { message, referenceId } = payload;

    if (!message) {
      return res.status(StatusCodes.BAD_REQUEST).send({ status: 'error', error: `Field 'message' ${FIELD_REQUIRED}` });
    }

    if (!referenceId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ status: 'error', error: `Field 'referenceId' ${FIELD_REQUIRED}` });
    }

    if (!isVerifyIdUnique(referenceId)) {
      return res.status(StatusCodes.BAD_REQUEST).send({ status: 'error', error: REFERENCE_ID_DUPLICATE });
    }

    const client = ClientConnector.getInstance();
    await client.start({
      message,
      referenceId,
    });

    return res.status(StatusCodes.OK).send({
      message: MESSAGE_SIGNED,
      referenceId,
    });
  } catch (err) {
    LOGGER.error('[signMessage][error]', { metadata: { error: getErrorMessage(err) } });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ status: 'error', error: getErrorMessage(err) });
  }
});

signMessage.get('/sign-message/:referenceId', async (req: Request, res: Response) => {
  try {
    const referenceId = req.params.referenceId;

    if (!referenceId) {
      res.status(StatusCodes.BAD_REQUEST).send({ status: 'error', error: 'ReferedId is required' });
    }
    const client = ClientConnector.getInstance();
    const workflowExecutionInfo = await client.getWorklfowInfo(referenceId);
    const isWorkflowComplete = shouldGetMessage(workflowExecutionInfo.status.name);



    if (!workflowExecutionInfo) {
      LOGGER.error('[signMessage][error]', { metadata: { error: REFERENCE_ID_NOT_FOUND } });
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'error',
        message: REFERENCE_ID_NOT_FOUND,
      });
    }

    const secretMessage = await client.getWorklfowMessageResult(referenceId);
    return res.status(StatusCodes.OK).send({
      message: isWorkflowComplete ? MESSAGE_SIGNED : MESSAGE_SIGNED_IN_PROGRESS,
      workflowStatus: workflowExecutionInfo.status.name,
      referenceId,
      signedMessage: isWorkflowComplete ? secretMessage : null,
    });
  } catch (err) {
    LOGGER.error('[signMessage][error]', { metadata: { error: getErrorMessage(err) } });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ status: 'error', error: getErrorMessage(err) });
  }
});

signMessage.get('/sign-message/list', async (req: Request, res: Response) => {
  try {
    const secretManager = SecretAndStorageManager.getInstance();
    const secretMessages = secretManager.getSignedMessages();
    return res.status(StatusCodes.OK).send({
      message: secretMessages,
    });
  } catch (err) {
    LOGGER.error('[signMessage][error]', { metadata: { error: getErrorMessage(err) } });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ status: 'error', error: getErrorMessage(err) });
  }
});

const shouldGetMessage = (status: string) => {
  return status === 'COMPLETED';
};

export { signMessage };
