#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component metadata and set necessary variables
$component = Get-Content -Path "$PSScriptRoot/component.json" | ConvertFrom-Json
$rcImage = "$($component.registry)/$($component.name):$($component.version)-$($component.build)"
$latestImage = "$($component.registry)/$($component.name):latest"

# Build docker image
docker build -f "$PSScriptRoot/docker/Dockerfile" -t $rcImage -t $latestImage .
if ($LastExitCode -eq 0) {
    Write-Host "`nBuilt run images:`n$rcImage`n$latestImage`n"
}

# Set environment variables
$env:IMAGE = $rcImage

# Set docker ip
if ($env:DOCKER_IP -ne $null) {
    $dockerMachineIp = $env:DOCKER_IP
} else {
    $dockerMachineIp = "localhost"
}

# Set http port if default value overwritten
if ($env:HTTP_PORT -ne $null) {
    $httpPort = $env:HTTP_PORT
} else {
    $httpPort = "8080"
}

# Set http route to test container
if ($env:HTTP_ROUTE -ne $null) {
    $httpRoute = $env:HTTP_ROUTE
} else {
    $httpRoute = "/heartbeat"
}

try {
    # Workaround to remove dangling images
    docker-compose -f "$PSScriptRoot/docker/docker-compose.yml" down

    docker-compose -f "$PSScriptRoot/docker/docker-compose.yml" up -d

    # Test using curl
    Start-Sleep -Seconds 10
    Invoke-WebRequest -Uri "http://$dockerMachineIp`:$httpPort$httpRoute"

    if ($LastExitCode -eq 0) {
        Write-Host "The run container was successfully built and tested."
    }
}   
catch {
    # Output container logs if web request failed
    $containersStatuses = docker-compose -f "$PSScriptRoot/docker/docker-compose.yml" ps
    # Parse docker-compose list of containers
    foreach ($containerStatus in $containersStatuses | Select -Skip 2) {
        $containerName = $containerStatus.split(" ")[0]
        Write-Host "`nLogs of '$containerName' container:"
        docker logs $containerName
    }
    
    Write-Error "Error on testing run container. See logs above for more information"
}
finally {
    # Workaround to remove dangling images
    docker-compose -f "$PSScriptRoot/docker/docker-compose.yml" down
}
