# Developing `dlite`

## Installation for documentation

1. `poetry install`

## Run documentation site

1. `npm run sa`
1. Go to localhost:8000 in your browser

## Build documentation site

1. `npm run sb`

## Installation for demos

1. `brew install --cask growlnotify`
1. `npm install dev-server -g`

## Run demo site

1. `npm run r`
1. Go to localhost:4000/demos/ in your browser

## Publish new version

1. Update `CHANGELOG.md`
1. Update version in `package.json`
1. `npm run t && npm run b && npm run sb`
1. Commit/tag/push changes
1. `npm publish`
1. [Create a new release](https://github.com/adamghill/dlite/releases/new)
