import taskLib = require('azure-pipelines-task-lib/task');
import toolLib = require('azure-pipelines-tool-lib/tool');
import os = require('os');

async function run() {
    try {
        const versionNumber: string = taskLib.getInput('terragruntversion', true);

        if ((versionNumber == '') || (versionNumber == null)) {
            taskLib.setResult(taskLib.TaskResult.Failed, 'Invalid version number given');
            return;
        }

        let downloadUrl = downloadLink(versionNumber, os.platform(), os.arch());

        const downloaded: string = await toolLib.downloadTool(downloadUrl);

        const cached: string = await toolLib.cacheFile(downloaded,`terragrunt.exe`,`terragrunt`, versionNumber);

        toolLib.prependPath(cached);

        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Terragrunt has been installed.');
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

const downloadLink = function(version: string, os: string, arch: string): string {
    if (os == 'win32') {
        os = 'windows';
    }

    if (arch == 'x32') {
        arch = '386';
    } else if (arch == 'x64') {
        arch = 'amd64';
    }
    
    const extension = os === 'windows' ? '.exe': '';
    
    // Add linux and MacOS to this.
    return `https://github.com/gruntwork-io/terragrunt/releases/download/v${version}/terragrunt_${os}_${arch}${extension}`;
}

run();
