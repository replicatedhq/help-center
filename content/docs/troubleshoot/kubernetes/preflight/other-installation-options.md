---
date: "2019-07-17T04:02:20Z"
title: "Other installation options"
description: "How to install and use the preflight binary"
weight: "34011"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

{{<legacynotice>}}

If krew plugins are not an option, it's still possible to run the same Preflight tool by installing a binary on your workstation, or by running preflights in a Docker container.

## Binary
To install, download the latest release from our GitHub releases, or use [brew](https://brew.sh) if running MacOS.

### MacOS

```shell
curl -Lo https://github.com/replicatedhq/troubleshoot/releases/download/v0.9.0/preflight_0.9.0_darwin_amd64-alpha.tar.gz
tar xzvf preflight_0.9.0_darwin_amd64-alpha.tar.gz
sudo mv preflight /usr/local/bin
```

## Linux

To install preflight on Linux:

```shell
curl -Lo https://github.com/replicatedhq/troubleshoot/releases/download/v0.9.0/preflight_0.19.0_linux_amd64-alpha.tar.gz
tar xzvf preflight_0.9.0_linux_amd64-alpha.tar.gz
sudo mv preflight /usr/local/bin
```

## Windows

To install on Windows, download the latest release:

[https://github.com/replicatedhq/troubleshoot/releases/download/v0.0.6/preflight_0.0.6_windows_amd64-0.0.6.zip](https://github.com/replicatedhq/troubleshoot/releases/download/v0.0.6/preflight_0.0.6_windows_amd64-0.0.6.zip) and unzip it.



