import { TestWorkflowEnvironment } from '@temporalio/testing';
import { before, describe, it } from 'mocha';
import { Worker } from '@temporalio/worker';
import { signMessageWorkflow } from '../workflows';
import * as activities from '../activities/activities';
import assert from 'assert';

describe('signMessageWorkflow workflow', () => {
  let testEnv: TestWorkflowEnvironment;

  before(async () => {
    testEnv = await TestWorkflowEnvironment.createLocal();
  });

  after(async () => {
    await testEnv?.teardown();
  });

  it('successfully completes the Workflow', async () => {
    const { client, nativeConnection } = testEnv;
    const taskQueue = 'test';

    const worker = await Worker.create({
      connection: nativeConnection,
      taskQueue,
      workflowsPath: require.resolve('../workflows'),
      activities,
    });

    const result = await worker.runUntil(
      client.workflow.execute(signMessageWorkflow, {
        args: ['This is my message', ''],
        workflowId: 'test',
        taskQueue,
      })
    );
    assert.equal(result, 'Hello, Temporal!');
  });
});
