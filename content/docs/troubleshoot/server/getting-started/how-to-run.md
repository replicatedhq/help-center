---
date: "2016-07-03T04:02:20Z"
title: "How To Run"
description: "Generating a Support Bundle"
weight: "1602"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

{{<legacynotice>}}

# How to run the Support Bundle

The collection components Replicated Troubleshoot utility are distributed in a Docker container that's publicly available at [hub.docker.com/r/replicated/support-bundle](https://hub.docker.com/r/replicated/support-bundle).

## Running from the Admin Console

For a server that's running Replicated, the Admin Console has a "Support" tab. On this page, a server admin can click "Download Support Bundle" to collect and download the support bundle locally.

![Support Tab in Admin Console](/images/troubleshoot/support-tab.png)

When downloading a support bundle from the Admin Console, the most released Collectors will define what's included in the bundle. For a full description of how the support bundle determines the set of collectors to use, read our page on [promoting collectors](../promoting-collectors).

## Running in Docker

Sometimes, it might not be possible to access the Admin Console to download the support bundle. In this scenario, a support bundle can be collected by running a container with the `replicated/support-bundle` image. Custom collectors can still be included.

The command to generate a support bundle with custom collectors from the command line is specific to each application and release channel. To get the command for an application, open the "Upload a support bundle" option:

![Upload Support Bundle](/images/troubleshoot/upload-support-bundle.png)

And then select "My customer can't create a support bundle".

![Docker Run Support Bundle](/images/troubleshoot/docker-run-support-bundle.png)

On this screen, select the application and release channel that contains the collector definitions. This command will use the most recently release version of the troubleshoot spec in that channel.

When this command completes, a `supportbundle.tar.gz` file will exist in the current directory. The generated support bundle can be uploaded to [vendor.replicated.com](https://vendor.replicated.com) for analysis.


```shell
docker run -it --rm \
    --volume $PWD:/out \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --net host --pid host \
    -e HTTP_PROXY -e HTTPS_PROXY -e NO_PROXY \
    replicated/support-bundle generate
```
