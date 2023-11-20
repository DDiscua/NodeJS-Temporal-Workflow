import { Connection, Client, WorkflowClient, WorkflowFailedError } from '@temporalio/client';
import { signMessageWorkflow } from './workflows';
import { ClientPayload } from './interfaces';
import { wait } from './utils/helpers';
import { LOGGER } from './logger';
import { WORKFLOW_TEMPORAL_ERROR, WORKFLOW_TEMPORAL_FAILED } from './constants';

const temporalConnectionUrl = process.env.TEMPORAL_CONNECTION_URL || 'localhost:7233';

class ClientConnector {
  private client: WorkflowClient;
  static instance: ClientConnector;

  constructor() {
    this.setConnection();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ClientConnector();
    }
    return this.instance;
  }

  async setConnection() {
    const connection = await Connection.connect({ address: temporalConnectionUrl });
    this.client = new WorkflowClient({
      connection,
    });
  }

  public async start({ message, referenceId }: ClientPayload) {
    if (!this.client) {
      await this.setConnection();
      await wait(5000);
    }

    await this.client.start(signMessageWorkflow, {
      taskQueue: 'temporal',
      args: [message, referenceId],
      workflowId: referenceId,
      workflowRunTimeout: 30000,
    });
  }

  public async getWorkflowInfo(referenceId: string) {
    try {
      const workflowInfo = this.client.getHandle(referenceId).describe();
      return workflowInfo;
    } catch (err) {
      if (err instanceof WorkflowFailedError) {
        LOGGER.error('[signMessage][error]', { metadata: { error: `${WORKFLOW_TEMPORAL_FAILED}: + referenceId` } });
        throw new Error(`${WORKFLOW_TEMPORAL_FAILED}: + referenceId`);
      } else {
        LOGGER.error('[signMessage][error]', { metadata: { error: `${WORKFLOW_TEMPORAL_ERROR}: + referenceId` } });
        throw new Error(`${WORKFLOW_TEMPORAL_ERROR}: + referenceId`);
      }
    }
  }

  public async getWorklfowMessageResult(referenceId: string) {

    try {
      const workflowResult = this.client.getHandle(referenceId).result();
      return workflowResult;
    } catch (err) {
      if (err instanceof WorkflowFailedError) {
        LOGGER.error('[signMessage][error]', { metadata: { error: `${WORKFLOW_TEMPORAL_FAILED}: + referenceId` } });
        throw new Error(`${WORKFLOW_TEMPORAL_FAILED}: + referenceId`);
      } else {
        LOGGER.error('[signMessage][error]', { metadata: { error: `${WORKFLOW_TEMPORAL_ERROR}: + referenceId` } });
        throw new Error(`${WORKFLOW_TEMPORAL_ERROR}: + referenceId`);
      }
    }
  }
}

export default ClientConnector;
