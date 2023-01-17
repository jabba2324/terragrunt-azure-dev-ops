import path from 'path';
import tmrm = require('azure-pipelines-task-lib/mock-run');

describe('Sample task tests', function () {

    before(() => {
        process.env.AGENT_TEMPDIRECTORY="agent/";
        process.env.AGENT_TOOLSDIRECTORY="agent/";
    });

    after(() => {
        
    });

    it('should download a specific version for this machione', function(done: Mocha.Done) {
        this.timeout(3000);

        let taskPath = path.join(__dirname, '..', 'index.js');

        process.env['INPUT_terragruntversion'] = '0.42.8';

        require(taskPath);
        
        done()
    });
});