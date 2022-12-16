#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "$PSScriptRoot/component.json" | ConvertFrom-Json
$rcImage = "$($component.registry)/$($component.name):$($component.version)-$($component.build)"

# Set environment variables
$env:IMAGE = $rcImage

# Workaround to remove dangling images
docker-compose -f "$PSScriptRoot/docker/docker-compose.yml" down
docker-compose -f "$PSScriptRoot/docker/docker-compose.yml" up
