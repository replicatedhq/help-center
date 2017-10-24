---
date: "2017-10-23T00:00:00Z"
title: "Using the Replicated Developer Studio to quickly iterate on your YAML"
description: "A tutorial on how the Replicated Developer Studio can be integrated into your Replicated development workflow."
keywords: "development, studio"
tags: ["Development", "Studio"]
categories: [ "Creating your Application" ]
---

The [Replicated Developer Studio](https://github.com/replicatedhq/studio) can provide YAML releases to Replicated for installation and updates. It is designed to streamline the development cycle to allow for local YAML changes, providing a quick way to iterate and test new versions of a Replicated application.

## Getting started

1. Clone the [replicatedhq/studio](https://github.com/replicatedhq/studio) project

   ```bash
   git clone git@github.com:replicatedhq/studio.git
   ```

1. Install [Node.js](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/lang/en/docs/install/)

1. Create a directory `./replicated` in your current directory

   ```bash
   mkdir -p ./replicated
   ```

1. Build and run the Studio project

   ```bash
   yarn
   make build run
   ```

   Studio assumes you have a directory named `./replicated` that is readable by the user running the service. It will look in this directory for files with extension `.yaml` and serve these as releases. It's important that you start with the sequence number that is the latest promoted version for the channel your license is in.

## Configuring Replicated to use the local Studio API

1. Start with a new installation of Replicated, or remove any previously installed application

1. Configure Replicated by adding a `MARKET_BASE_URL` environment variable that points to the location of the Studio service. The Replicated configuration file is located at either `/etc/default/replicated` or `/etc/sysconfig/replicated` depending on your distribution.

   **Example configuration file:**
   ```
   RELEASE_CHANNEL=stable
   PRIVATE_ADDRESS=<snip>
   SKIP_OPERATOR_INSTALL=0
   REPLICATED_OPTS="-e LOG_LEVEL=info -e DAEMON_TOKEN=<snip> -e NODENAME=<snip> -e MARKET_BASE_URL=http://$PRIVATE_ADDRESS:8006"
   ```
   
1. Restart Replicated

## Iterating on your YAML

TODO

## When it's useful and when it’s not

TODO
