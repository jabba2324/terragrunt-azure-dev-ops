# Terragrunt Installer for Azure Dev Ops

## What is Terragrunt?

Terragrunt is a thin wrapper for terraform, you can read more about it [here:](https://github.com/gruntwork-io/terragrunt)

This extension installs terragrunt on Windows build agents, can be used in both
build and release pipelines. There is currently no corresponding command task,
all terragrunt commands will have to be run from a generic cmd or powershell
task.