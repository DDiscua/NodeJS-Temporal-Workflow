import { app } from './app';
import { LOGGER } from './logger';
import { WorkflowClient } from '@temporalio/client';
import { healthCheck } from './services/healthCheck';
import { Request, Response, NextFunction } from 'express';
import { generateSigningKey, getErrorMessage } from './utils';
import { signMessage } from './services';
import { StatusCodes } from 'http-status-codes';
import SecretAndStorageManager from './utils/SecretAndStorageManager';
import ClientConnector from './client';

const port = process.env.APP_PORT || 6000;

SecretAndStorageManager.getInstance();
ClientConnector.getInstance();

app.use('/health', healthCheck);
app.use('', signMessage);

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = StatusCodes.NOT_FOUND;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

try {
  app.listen(port, (): void => {
    LOGGER.info(`[appStart][Connected succesfully on port: ${port}]`, { metadata: '', sendLog: true });
  });
} catch (err) {
  LOGGER.error('[appStart][error]', { metadata: { error: getErrorMessage(err) } });
}
