import { proxyActivities, sleep } from '@temporalio/workflow';
import * as activities from './activities/activities';

const { signMessage } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function signMessageWorkflow(message: string, referenceId: string): Promise<string> {
  await sleep('20 seconds'); // Simulating async operation
  const signedMessage = await signMessage(message, referenceId);
  return signedMessage;
}
