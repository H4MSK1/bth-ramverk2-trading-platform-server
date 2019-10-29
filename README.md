## Badges
[![Build Status](https://travis-ci.org/H4MSK1/bth-ramverk2-trading-platform-server.svg?branch=master)](https://travis-ci.org/H4MSK1/bth-ramverk2-trading-platform-server) [![Build Status](https://scrutinizer-ci.com/g/H4MSK1/bth-ramverk2-trading-platform-server/badges/build.png?b=master)](https://scrutinizer-ci.com/g/H4MSK1/bth-ramverk2-trading-platform-server/build-status/master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/H4MSK1/bth-ramverk2-trading-platform-server/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/H4MSK1/bth-ramverk2-trading-platform-server/?branch=master) [![Code Coverage](https://scrutinizer-ci.com/g/H4MSK1/bth-ramverk2-trading-platform-server/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/H4MSK1/bth-ramverk2-trading-platform-server/?branch=master)

## Description

API for a simple trading platform created using [Nest Framework](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install
```

## Configuration

Environment files for configuration are located in the `/config/` folder.
The structure for the dotenv files **(files with a `.local` suffix are ignored by VCS)**:
- .env – for default (fallback) values
- .env.development – for development environment
- .env.test – for test environment
- .env.production – for production environment
- .env.local – for individual default values
- .env.development.local – for individual development environment values
- .env.test.local – for individual test environment values
- .env.production.local – for production environment values


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

