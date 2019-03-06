---
date: "2019-03-05T04:02:20Z"
title: "Replicated Release Action"
description: "Documentation on the Replicated Release GitHub Action."
weight: "2904"
categories: [ "GitHub Actions" ]
index: "other"
---

# Replicated Release Action

Creates an application release from the `replicated.yaml` in the repo, and promotes it to the Unstable channel.

## Success Criteria

The action succeeds if the release was created and promoted without error.

## Usage

To use the `release` action, add it to your workflow:

```
workflow "Replicated Unstable Release" {
  resolves = "replicated_release"
  on = "pull_request"
}

action "filter-to-pr-open-synced" {
  uses = "actions/bin/filter@master"
  args = "action 'opened|synchronize'"
}

action "replicated_release" {
  uses = "replicatedhq/replicated-action/release@v0.1.1"
  needs = "filter-to-pr-open-synced"
  secrets = [
    "GITHUB_TOKEN",
    "REPLICATED_API_TOKEN"
  ],
  env = {
    REPLICATED_APP = ""
  }
}
```

### Secrets
| Name | Default Value | Description |
|------|---------------|-------------|
| REPLICATED_API_TOKEN | "" | Required. An API token from your Replicated account to use in requests   |


### Environment Variables

The following environment variables can be set to override defaults:

| Name | Default Value | Description |
|------|---------------|-------------|
| REPLICATED_APP | "" | Required. Set to the app ID or app slug of your Replicated app |

