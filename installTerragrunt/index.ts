import taskLib = require('azure-pipelines-task-lib/task');
import toolLib = require('azure-pipelines-tool-lib/tool');
import os = require('os');

async function run() {
    console.log("Starting Download")
    try {
        const versionNumber = getVersion();
        console.log(`Selected version: ${versionNumber}`)
        const extension = os.platform() === 'win32' ? '.exe': '';

        const downloadUrl = downloadLink(versionNumber, os.platform(), os.arch(), extension);

        const downloaded: string = await toolLib.downloadTool(downloadUrl);

        const cached: string = await toolLib.cacheFile(downloaded,`terragrunt${extension}`,`terragrunt`, versionNumber);

        toolLib.prependPath(cached);

        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Terragrunt has been installed.');
        
    }
    catch (err: any) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

const getVersion = function(): string {
    const versionNumber = taskLib.getInput('terragruntversion', true);

    if (versionNumber) {
        return versionNumber;
    } else {
        throw new Error("No version specified")
    }
}

const downloadLink = function(version: string, os: string, arch: string, extension: string): string {
    if (os == 'win32') {
        os = 'windows';
    }

    if (arch == 'x32') {
        arch = '386';
    } else if (arch == 'x64') {
        arch = 'amd64';
    }
        
    // Add linux and MacOS to this.
    return `https://github.com/gruntwork-io/terragrunt/releases/download/v${version}/terragrunt_${os}_${arch}${extension}`;
}

run();