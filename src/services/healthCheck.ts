import express, { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getErrorMessage } from '../utils';
import { LOGGER } from '../logger';

const healthCheck: Router = express.Router();

healthCheck.get('/status', async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(StatusCodes.OK).send({
      status: 'SUCCESS',
      message: 'Ok',
    });
  } catch (error: any) {
    const errorMessage = getErrorMessage(error.toString());
    LOGGER.error(`[healthcheck]: ${errorMessage}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'ERROR',
      message: errorMessage,
    });
  }
});


export { healthCheck };
