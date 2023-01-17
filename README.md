# (Under Maintenance) Terragrunt Installer for Azure Dev Ops

## What is Terragrunt?
Terragrunt is a thin wrapper for terraform, you can read more about it [here:](https://github.com/gruntwork-io/terragrunt)

This extension installs terragrunt AzureDevops build agents, can be used in both build and release pipelines. There is currently no corresponding command task, all terragrunt commands will have to be run from a generic bash, cmd or powershell task.

## Testing locally
Make sure node and typescript are installed, navigate to installTerragrunt & run 
```
npm install
```
```
tsc
```
```
mocha tests/_suite.js
```

## Troubleshooting

This task was created by following [this](https://learn.microsoft.com/en-us/visualstudio/extensibility/starting-to-develop-visual-studio-extensions?view=vs-2022) article, if your having trouble getting started try following the setup stepds there before posting an issue.