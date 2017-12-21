---
date: "2017-10-25T04:02:20Z"
title: "Automate Releases with Travis CI"
description: "Use Replicated CLI tools with Travis CI to automate and collaborate on your Replicated releases"
weight: "999999"
categories: [ "Developer Resources" ]
aliases: ['docs/packaging-an-application/travis-ci-releases/']
tags: [ "Application YAML", "Releases", "CLI", "Travis", "CI" ]
index: "docs"
hideFromList: true
---

### End-to-end example

An example that uses Travis for CI can be found in the  [Replicated CI Demo](https://github.com/replicatedhq/replicated-ci-demo/) project.

### Step-by-step guide

1. Create a new github repository
1. Get your latest App release YAML from https://vendor.replicated.com and add it in a file `replicated.yml` in the repository
1. Create `.travis.yml`, an example can be found in the  [Replicated CI Demo](https://github.com/replicatedhq/replicated-ci-demo/blob/master/.travis.yml) project.
    - On pull requests, run the `replicated.yml` through [Replicated Lint](/docs/kb/developer-resources/validate-your-yaml/)
    - On merges to `master`, use the [Replicated Vendor CLI](/api/replicated-vendor-cli/) to create and promote releases to your `Unstable` channel.
1. Find your github repo at [https://travis-ci.org/profile](https://travis-ci.org/profile) and enable it
1. [Get your App ID and API Token](/docs/kb/developer-resources/finding-your-api-token-and-app-id).
1. Configure environments variables `REPLICATED_APP` and `REPLICATED_API_TOKEN` in [Travis CI](https://travis-ci.org/) using `More Options` -> `Settings` -> `Environment Variables`.
1. Push to your github repository, verify releases are created and promoted on [https://vendor.replicated.com](https://vendor.replicated.com).
