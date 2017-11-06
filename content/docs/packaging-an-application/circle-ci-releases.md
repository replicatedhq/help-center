---
date: "2016-07-03T04:02:20Z"
title: "Automate Releases with CircleCI"
description: "Use Replicated CLI tools with CircleCI to automate and collaborate on your Replicated releases"
weight: "301"
categories: [ "Packaging an Application" ]
tags: [ "Application YAML", "Releases", "CLI", "Circle", "CI" ]
index: "docs"
---

### End-to-end example

An example that uses Circle for CI can be found in the  [Replicated CI Demo](https://github.com/replicatedhq/replicated-ci-demo/) project.

### Step-by-step guide

1. Create a new github repository
1. Get your latest App release YAML from https://vendor.replicated.com and add it in a file `replicated.yml` in the repository
1. Create `circle.yml`, an example can be found in the  [Replicated CI Demo](https://github.com/replicatedhq/replicated-ci-demo/blob/master/circle.yml) project.
    - On pull requests, run the `replicated.yml` through [Replicated Lint](/docs/kb/developer-resources/validate-your-yaml/)
    - On merges to `master`, use the [Replicated Vendor CLI](/api/replicated-vendor-cli/) to create and promote releases to your `Unstable` channel.
1. Find your github repo on the [CircleCI projects page](https://circleci.com/projects) and enable it  as a Circle v1.0 Project.
1. [Get your App ID and API Token](/docs/kb/developer-resources/finding-your-api-token-and-app-id).
1. Configure environments variables `REPLICATED_APP` and `REPLICATED_API_TOKEN` in [CircleCI](https://circleci.com/dashboard) using `Project Settings` -> `Environment Variables`.
1. Push to your github repository, verify releases are created and promoted on [https://vendor.replicated.com](https://vendor.replicated.com).
