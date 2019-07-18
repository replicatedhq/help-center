---
date: "2019-07-17T04:02:20Z"
title: "Full installation"
description: "How to install and use the preflight binary"
weight: "34011"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

To install, download the latest release from our GitHub releases, or use [brew](https://brew.sh) if running MacOS.

### MacOS

We recommend using Homebrew to install preflight on MacOS:

```shell
brew tap replicatedhq/troubleshoot
brew install replicatedhq/preflight
```

Alternatively, the binary can be downloaded any installed in your /usr/local/bin folder:

```shell
curl -Lo https://github.com/replicatedhq/troubleshoot/releases/download/v0.1.0/preflight_0.1.0_darwin_amd64-alpha.tar.gz
tar xzvf preflight_0.1.0_darwin_amd64-alpha.tar.gz
sudo mv preflight /usr/local/bin
```

## Linux

To install preflight on Linux:

```shell
Alternatively, the binary can be downloaded any installed in your /usr/local/bin folder:

```shell
curl -Lo https://github.com/replicatedhq/troubleshoot/releases/download/v0.1.0/preflight_0.1.0_linux_amd64-alpha.tar.gz
tar xzvf preflight_0.1.0_linux_amd64-alpha.tar.gz
sudo mv preflight /usr/local/bin
```

## Windows

To install preflight on Windows, we recommend using Choco:

```shell
choco install replicatedhq/preflight
```

Or, to download to executable directly:

[https://github.com/replicatedhq/troubleshoot/releases/download/v0.1.0/preflight_0.1.0_windows_amd64-alpha.tar.gz](https://github.com/replicatedhq/troubleshoot/releases/download/v0.1.0/preflight_0.1.0_windows_amd64-alpha.tar.gz)

