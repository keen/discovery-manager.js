# Discovery Manager

This basic utility will create Discoveries for BETA use. The instructions below should help you get started. Keep in mind, you should not need to touch any of the actual JavaScript for this tool to do its job. If you get stuck here, give us a shout. We'll be more than happy to help you out!

## Getting Started

This utility requires NodeJS v4 or higher. If you don't have this (or aren't sure) [install nvm](https://github.com/creationix/nvm#install-script) and [install any version](https://github.com/creationix/nvm#usage) from 4.0 on up. If you get stuck here, ping us!

### Installation

Clone the repo and install dependencies via npm.

```ssh
$ git clone https://github.com/keen/discovery-manager.js.git
$ cd discovery-manager.js
$ npm install
```

### Set Project ID and Master Key

Setting sensitive info this way keeps our credentials out of GitHub - please don't commit keys. The script will look for these environmental variables. You won't need to touch the actual JavaScript to create and manage Discoveries.

```ssh
$ export PROJECT_ID=YOUR_PROJECT_ID
$ export MASTER_KEY=YOUR_MASTER_KEY
```

### Define your discoveries

Run this command to create a file named `definitions.json`. The script will look for this file. It's the only one you should need to edit.

```ssh
$ cp definitions-sample.json definitions.json
```

Fill out the file to define your Discovery definitions like the example below. Each top-level `key` will be used as the `discovery_name`, like so: `https://api.keen.io/3.0/projects/${projectId}/discoveries/${discovery_name}`.

```json
{
  "hourly-sum-purchases-for-stores": {
    "display_name": "Sum Purchases for Stores (Hourly)!",
    "query": {
      "analysis_type": "sum",
      "event_collection": "purchases",
      "target_property": "price",
      "timeframe": "this_500_hours",
      "interval": "hourly",
      "timezone": "UTC"
    },
    "dimensions": ["store.id"]
  },
  "daily-sum-purchases-for-stores": {
    "display_name": "Sum Purchases for Stores (Daily)!",
    "query": {
      "analysis_type": "sum",
      "event_collection": "purchases",
      "target_property": "price",
      "timeframe": "this_500_days",
      "interval": "daily",
      "timezone": "UTC"
    },
    "dimensions": ["store.id"]
  }
}
```

### Run the script

When you run this command, the script will check each Discovery definition from `definitions.json` and create any Discoveries that do not already exist.

```ssh
$ npm start
```
