import taskLib = require('azure-pipelines-task-lib/task');
import toolLib = require('azure-pipelines-tool-lib/tool');
import os = require('os');

const SUPPORTED_PLATFORMS = ['windows', 'linux', 'darwin'];
const SUPPORTED_ARCH = ['386', 'amd64'];

async function run() {
  try {
    const version = taskLib.getInput('terragruntversion', true);
    const platform = getPlatform();
    const extension = getExtension(platform);
    const arch = getArch();
    const executable = getExecutableFileName(extension);
    const downloadUrl = downloadLink({
      version,
      platform,
      arch,
      extension
    });
    const downloaded = await toolLib.downloadTool(downloadUrl);
    const cached = await toolLib.cacheFile(
      downloaded,
      executable,
      'terragrunt',
      version
    );
    toolLib.prependPath(cached);
    taskLib.setResult(
      taskLib.TaskResult.Succeeded,
      `Terragrunt v${version} has been installed.`
    );
  } catch (err) {
    console.log(err.message);
    taskLib.setResult(taskLib.TaskResult.Failed, err.message);
  }
}

function getExecutableFileName(extension: string) {
  return `terragrunt${extension}`;
}

function normalizePlatform(platform: string) {
  if (platform === 'win32') {
    return 'windows';
  }

  return platform;
}

function getPlatform() {
  const platform = normalizePlatform(os.platform());

  if (!SUPPORTED_PLATFORMS.includes(platform)) {
    throw new Error(`${platform} platform is not supported by terragrunt`);
  }

  return platform;
}

function normalizeArch(arch: string) {
  if (arch == 'x32') {
    return '386';
  }

  if (arch == 'x64') {
    return 'amd64';
  }

  return arch;
}

function getArch() {
  const arch = normalizeArch(os.arch());

  if (!SUPPORTED_ARCH.includes(arch)) {
    throw new Error(`${arch} arch is not supported by terragrunt`);
  }

  return arch;
}

function getExtension(platform: string) {
  if (platform === 'windows') {
    return '.exe';
  }

  return '';
}

const downloadLink = function(args: {
  version: string;
  platform: string;
  arch: string;
  extension: string;
}): string {
  return `https://github.com/gruntwork-io/terragrunt/releases/download/v${version}/terragrunt_${platform}_${arch}${extension}`;
};

run();
