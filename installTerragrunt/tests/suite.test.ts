import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

describe('Install Terragrunt', function () {
  it('should succeed with simple inputs', function (done) {
    const tp = path.join(__dirname, 'success.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    tr.run();
    assert.equal(tr.succeeded, true, 'should have succeeded');
    done();
  });

  it('it should fail if tool returns 1', function (done) {
    const tp = path.join(__dirname, 'failure.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    tr.run();
    assert.equal(tr.succeeded, false, 'should have failed');
    assert.equal(tr.errorIssues[0], 'Input required: terragruntversion');
    done();
  });
});
