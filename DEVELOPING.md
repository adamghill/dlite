# Developing `dlite`

## Installation for documentation

1. `poetry install`

## Run documentation site

1. `npm run sa`
1. Go to http://localhost:8000 in your browser

## Run documentation site via Docker

1. docker build -t dlite . && docker container run -p 8557:80 dlite:latest
1. Go to http://localhost:8557 in your browser

## Build documentation site

1. `npm run sb`

## Installation for demos

1. `brew install --cask growlnotify`
1. `npm install dev-server -g`

## Run demo site

1. `npm run r`
1. Go to http://localhost:4000/site/demos/ in your browser

## Publish new version

1. Update `CHANGELOG.md`
1. Update version in `package.json`
1. `npm run t && npm run b`
1. Commit/tag/push changes
1. `npm publish`
1. [Create a new release](https://github.com/adamghill/dlite/releases/new)
