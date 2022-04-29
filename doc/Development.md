# Development and Testing Guide <br/> Sessions Microservice

This document provides high-level instructions on how to build and test the microservice.

* [Environment Setup](#setup)
* [Installing](#install)
* [Building](#build)
* [Testing](#test)
* [Contributing](#contrib) 

## <a name="setup"></a> Environment Setup

This is a Node.js project and you have to install Node.js tools. 
You can download them from official Node.js website: https://nodejs.org/en/download/ 

After node is installed you can check it by running the following command:
```bash
node -version
```

Then you need to configure node tools:
```bash
# Install typescript compiler
npm install typescript -g
 
# Install mocha test runner
npm install mocha -g
```

To work with GitHub code repository you need to install Git from: https://git-scm.com/downloads

If you are planning to develop and test using persistent storages other than flat files
you may need to install database servers:
- Download and install MongoDB database from https://www.mongodb.org/downloads

## <a name="install"></a> Installing

After your environment is ready you can check out microservice source code from the Github repository:
```bash
git clone git@github.com:pip-services-users2/service-sessions-node.git
```

Then go to the project folder and install dependent modules:

```bash
# Install dependencies
npm install
```

If you worked with the microservice before you can check out latest changes and update the dependencies:
```bash
# Update source code updates from github
git pull

# Update dependencies
npm update
```

## <a name="build"></a> Building

This microservice is written in TypeScript language which is transcompiled into JavaScript.
So, if you make changes to the source code you need to compile it before running or committing to github.
The process will output compiled javascript files into /bin folder.

```bash
tsc
```

When you do continuous edit-build-test cycle, you can run typescript compiler with --watch option
to detect and compile changes you make automatically:

```bash
tsc --watch
```

## <a name="test"></a> Testing

Before you execute tests you need to set configuration options in config.json file.
As a starting point you can use example from config.example.json:

```bash
copy config.example.yml config.yml
``` 

After that check all configuration options. Specifically, pay attention to connection options
for database and dependent microservices. For more information check [Configuration Guide](Configuration.md) 

Command to run unit tests:
```bash
npm test
```

You can also execute benchmarks as:
```bash
npm run benchmark
```

## <a name="contrib"></a> Contributing

Developers interested in contributing should read the following instructions:

- [How to Contribute](http://www.pipservices.org/contribute/)
- [Guidelines](http://www.pipservices.org/contribute/guidelines)
- [Styleguide](http://www.pipservices.org/contribute/styleguide)
- [ChangeLog](CHANGELOG.md)

> Please do **not** ask general questions in an issue. Issues are only to report bugs, request
  enhancements, or request new features. For general questions and discussions, use the
  [Contributors Forum](http://www.pipservices.org/forums/forum/contributors/).

It is important to note that for each release, the [ChangeLog](CHANGELOG.md) is a resource that will
itemize all:

- Bug Fixes
- New Features
- Breaking Changes