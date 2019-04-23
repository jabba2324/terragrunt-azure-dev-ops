import taskLib = require('azure-pipelines-task-lib/task');
import toolLib = require('azure-pipelines-tool-lib/tool');
import os = require('os');
import path = require('path');
//import fs = require('fs');

//import request = require("request-promise-native");
import request = require("request"); 
async function run() {
    try {
        const versionNumber: string = taskLib.getInput('terragruntversion', true);
        if ((versionNumber == '') || (versionNumber == null)) {
            taskLib.setResult(taskLib.TaskResult.Failed, 'Invalid version number given');
            return;
        }

        //Download file https://github.com/gruntwork-io/terragrunt/releases/download/v${versionNumber}/terragrunt_windows_amd64.exe
        let downloadUrl = downloadLink(versionNumber, os.platform(), os.arch())

        const terragrunt: string = await toolLib.downloadTool(downloadUrl);
        toolLib.prependPath(terragrunt);
        
        console.log(terragrunt);
        //const result = request(url).pipe(fs.createWriteStream(`terragrunt_${os}_${arch}.exe`));
        //Copy file to program files dir
        //set agent path variable
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
    
    // Add linux and MacOS to this.
    
    return `https://github.com/gruntwork-io/terragrunt/releases/download/v${version}/terragrunt_${os}_${arch}.exe`;
}

run();