---
date: "2016-07-03T04:02:20Z"
title: "Release Versions"
description: "Troubleshoot Container Versions"
weight: "1606"
categories: [ "Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Troubleshoot Container Tags

When running the suopport bundle container as a docker run command, we often provide a command that includes the ":latest" tag. This is recommended because it's a one time process and generally demands the latest troubleshooting tools. If you ware automating part of this process or packaging a reproducible deployment, you can use a named tag to guarantee the same image will be used. The following table documents our tagging and release strategy for the support bundle image.

Note, We publish multiple tags with each release of the image.

| Tag | Description |
|-----|-------------|
| latest | The most recent stable release of the image |
| alpha | The most recent alpha release of the image |
| MAJOR (`1`) | The most recent 1.x.x release of the image |
| MAJOR.MINOR (`1.0`) | The most recent 1.0.x release of the image |
| MAJOR.MINOR.PATCH (`1.0.1`) | The exact 1.0.1 release of the image. This is the only tag that's guaranteed to be immutable and never change. |

