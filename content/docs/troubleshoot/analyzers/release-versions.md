---
date: "2019-06-04T12:00:00Z"
title: "Release Versions"
description: "Troubleshoot Analyzer Container Versions"
weight: "1907"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Troubleshoot Analyzer Container Tags

When running the [replicated/analyze](https://hub.docker.com/r/replicated/analyze) container as a docker run command, we often provide a command that includes the ":latest" tag. This is recommended because it is a one time process and generally demands the latest troubleshooting tools. If you ware automating part of this process or packaging a reproducible deployment, you can use a named tag to guarantee the same image will be used. The following table documents our tagging and release strategy for the [replicated/analyze](https://hub.docker.com/r/replicated/analyze) image.

Note, We publish multiple tags with each release of the image.

| Tag | Description |
|-----|-------------|
| latest | The most recent stable release of the image |
| alpha | The most recent alpha release of the image |
| MAJOR (`1`) | The most recent 1.x.x release of the image |
| MAJOR.MINOR (`1.0`) | The most recent 1.0.x release of the image |
| MAJOR.MINOR.PATCH (`1.0.1`) | The exact 1.0.1 release of the image. This is the only tag that's guaranteed to be immutable and never change. |

