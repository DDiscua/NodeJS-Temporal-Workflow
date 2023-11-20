import { MockActivityEnvironment } from '@temporalio/testing';
import { describe, it } from 'mocha';
import * as activities from '../activities/activities';
import assert from 'assert';

describe('greet activity', async () => {
  it('successfully greets the user', async () => {
    const env = new MockActivityEnvironment();
    const name = 'Temporal';
    const activity = await activities.signMessage("Hellow world","");
    const result = await env.run(activity, name);
    assert.equal(result, 'Hello, Temporal!');
  });
});
