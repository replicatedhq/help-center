---
date: 2017-10-23T10:36:16-07:00
title: "Replicated Vendor CLI Reference"
description: "Documentation for the Replicated Vendor command line interface"
weight: "506"
categories: [ "Reference" ]
index: "docs"
aliases : [docs/reference/replicated-vendor-cli]
---

The [Replicated Vendor CLI](https://github.com/replicatedhq/replicated) provides a CLI for interacting with the Replicated Vendor API. 

# CLI Installation

## MacOS Install
```shell
brew install replicatedhq/replicated/cli
```

## Linux Install
```shell
curl -o install.sh -sSL https://raw.githubusercontent.com/replicatedhq/replicated/master/install.sh
sudo bash ./install.sh
```

## Setup
The Replicated Vendor CLI requires an App ID or app name and an API token. These can either be passed as arguments to each command
```shell
replicated channel ls --app my-app-name --token e8d7ce8e3d3278a8b1255237e6310069
```
or set as environment variables.
```shell
export REPLICATED_APP="my-app-name"
export REPLICATED_API_TOKEN="e8d7ce8e3d3278a8b1255237e6310069"
replicated channel ls
```

AppIDs are shown on the application settings page within the vendor web portal at [https://vendor.replicated.com/settings](https://vendor.replicated.com/settings). Alternatively, application names can be found within their vendor web URLs. For example, in `https://vendor.replicated.com/apps/ademoapp/releases` the application name is `ademoapp`.

An API token can be created on the [Teams & Tokens](https://vendor.replicated.com/team/tokens) page. Most use of the Replicated Vendor CLI will require both read and write access.

For more info on IDs and tokens, see [Finding your API Token and App ID](/docs/kb/developer-resources/finding-your-api-token-and-app-id).

# Command Overview

## Channel
### Channel Adoption
List channel adoption statistics by license type.
```shell
replicated channel adoption CHANNEL_ID
```

### Channel Counts
List channel license counts.
```shell
replicated channel counts CHANNEL_ID
```

### Channel Create
Create a new channel in your app and list the full set of channels in the app on success.
```shell
replicated channel create --name CHANNEL_NAME --description CHANNEL_DESCRIPTION
```

### Channel Inspect
Show the full details of a channel.
```shell
replicated channel inspect CHANNEL_ID
```

### Channel ls
List all the channels in your app.
```shell
replicated channel ls
```

### Channel Releases
List all the releases in a channel.
```shell
replicated channel releases CHANNEL_ID
```

### Channel rm
Remove (archive) a channel.
```shell
replicated channel rm CHANNEL_ID
```

## Release
### Release Create
Create a new release by providing a YAML configuration for the next release in this application's sequence.
```shell
replicated release create --yaml "$(< youryaml.yaml)"
```
Optionally, you can promote a release to a channel during creation.
```shell
replicated release create --promote Unstable --yaml "$(< youryaml.yaml)"
```

### Release Inspect
Print the YAML config for a release.
```shell
replicated release inspect SEQUENCE
```

### Release ls
List all of an app's releases.
```shell
replicated release ls
```

### Release Promote
Promote a release to a channel.
```shell
replicated release promote SEQUENCE CHANNEL_ID
```
Optionally, you can include markdown formatted release notes, whether a release may be skipped while upgrading or not, and a version label for this release in this channel.
```shell
replicated release promote SEQUENCE CHANNEL_ID --release-notes "$(< yournotes.md)" --optional false --version "1.2.3"
```

### Release Update
Update a release's yaml config file.
```shell
replicated release update SEQUENCE --yaml "$(< yournewyaml.yaml)"
```

# CI Example
A common use of the replicated command is to create a new release for every tagged build. 

Assume the app's yaml config is checked in at replicated.yaml and you have configured Travis CI or CircleCI with your REPLICATED_APP and REPLICATED_API_TOKEN environment variables.

Then, if you add something like this release.sh script to your project:
```bash
#!/bin/bash

# Create a new release from replicated.yaml and promote the Unstable channel to use it.
# Aborts if version tag is empty.

set -e

VERSION=$1
INSTALL_SCRIPT=https://raw.githubusercontent.com/replicatedhq/replicated/master/install.sh

if [ -z "$VERSION" ]; then
echo "No version; skipping replicated release"
  exit
fi

unstable_channel_id() {
  replicated channel ls | grep Unstable | awk '{print $1}'
}

new_sequence() {
  replicated release create --yaml "$(< replicated.yaml)" | grep 'SEQUENCE:' | grep -Eo '[0-9]+'
}

# install replicated
curl -sSL "$INSTALL_SCRIPT" > install.sh
sudo bash ./install.sh

replicated release promote $(new_sequence) $(unstable_channel_id) --version "$VERSION"
# Channel ee9d99e87b4a5acc2863f68cb2a0c390 successfully promoted to release 15
```
Now you can automate tagged releases in Travis CI or CircleCI:
```yaml
# .travis.yml
sudo: required
after_success:
  - ./release.sh "$TRAVIS_TAG"
```
```yaml
# circle.yml
deployment:
  tag:
    tag: /v.*/
    owner: replicatedcom
    commands:
      - ./release.sh "$CIRCLE_TAG"
```
Now, all tagged releases on CircleCI or Travis CI will be made into a Relicated release and promoted to the Unstable channel.