---
date: "2016-07-03T04:02:20Z"
title: "How To Run"
description: "Generating a Support Bundle"
weight: "1602"
categories: [ "Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "console"
---

# How to run the Support Bundle

The collection components Replicated Troubleshoot utility are distributed in a Docker container that's publicly available at [hub.docker.com/r/replicated/support-bundle](https://hub.docker.com/r/replicated/support-bundle).

## Running in Docker

To collect a default support bundle, you can run a container with the `replicated/support-bundle` image, and pass it a set of collectors, defined in a YAML file. If you don't pass a set of collectors, a full default set is automatically applied.

```shell
docker run -it --rm \
    --volume $PWD:/out \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --net host --pid host \
    -e HTTP_PROXY -e HTTPS_PROXY -e NO_PROXY \
    replicated/support-bundle generate
```

When this command completes, a `supportbundle.tar.gz` file will exist in the current directory. The generated support bundle can be uploaded to [vendor.replicated.com](https://vendor.replicated.com) for analysis.

### Tags

We publish multiple tags with each release of the image.

| Tag | Description |
|-----|-------------|
| latest | The most recent stable release of the image |
| alpha | The most recent alpha release of the image |
| MAJOR (`1`) | The most recent 1.x.x release of the image |
| MAJOR.MINOR (`1.0`) | The most recent 1.0.x release of the image |
| MAJOR.MINOR.PATCH (`1.0.1`) | The exact 1.0.1 release of the image. This is the only tag that's guaranteed to be immutable and never change. |
