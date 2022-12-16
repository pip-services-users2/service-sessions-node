#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component metadata and set necessary variables
$component = Get-Content -Path "$PSScriptRoot/component.json" | ConvertFrom-Json
$protosImage = "$($component.registry)/$($component.name):$($component.version)-$($component.build)-protos"
$container = $component.name

# Remove documentation files
if (Test-Path -Path "$PSScriptRoot/src/protos") {
    Remove-Item -Recurse -Force -Path "$PSScriptRoot/src/protos/*.js"
    Remove-Item -Recurse -Force -Path "$PSScriptRoot/src/protos/*.ts"
}

# Build docker image
docker build -f "$PSScriptRoot/docker/Dockerfile.proto" -t $protosImage .

# Create and copy compiled files, then destroy
docker create --name $container $protosImage
docker cp "$($container):/app/src/protos" "$PSScriptRoot/src/"
docker rm $containerc

# Verify that protos folder was indeed created after generating proto files
if (-not (Test-Path "$PSScriptRoot/src/protos")) {
    Write-Error "protos folder doesn't exist in src dir. Build failed. See logs above for more information."
}
