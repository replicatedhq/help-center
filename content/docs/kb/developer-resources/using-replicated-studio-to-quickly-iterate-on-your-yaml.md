---
date: "2017-10-23T00:00:00Z"
title: "Using Replicated Developer Studio"
description: "A guide on how the Replicated Developer Studio can be integrated into your Replicated development workflow."
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Development", "Studio"]
---

The [Replicated Developer Studio](https://github.com/replicatedhq/studio) has been designed with developers in mind, to streamline the development cycle, by allowing for local YAML changes to reflect almost immediately in the Admin console. This provides a quick way to iterate and test new versions of an application, without uploading every change to Replicated.

Iterating on your Replicated [application YAML](https://help.replicated.com/docs/packaging-an-application/yaml-overview/) often requires much trial and error before a release is ready to be shipped. Often the developer will choose to make changes to the YAML on their local filesystem in their text editor of choice. Once changes have been made, a release must be created and promoted to a channel via the [Replicated Vendor Portal](https://vendor.replicated.com/) or the [Replicated CLI](https://github.com/replicatedhq/replicated), before that release will become available in the Replicated admin console. Likely there will be many more iterations on that release before it is ready to be shipped to the customer.

By using the [Replicated Developer Studio](https://github.com/replicatedhq/studio), you can quickly iterate on your Replicated YAML, and reduce the number of releases you and your team create in between releases to your customers.

## Getting Started

1. Follow the [README](https://github.com/replicatedhq/studio) documentation on installing Replicated and Replicated Studio.
1. In order to use Replicated Studio for development purposes you will need a real Replicated license generated from the [Customers](https://vendor.replicated.com/customers) page of the Replicated Vendor Portal.
1. Once you have downloaded the license, copy the YAML from the current release in that license's channel to a file `./replicated/<release-sequence>.yaml`. For example, if you are using the "unstable" channel and the current sequence promoted to that channel is 65, then you would create a file `./replicated/65.yaml`. 
1. Next navigate to the Admin Console `https://<your server address>:8800` in your browser and upload the license when prompted. Replicated is reading releases from the local Studio API via the `./replicated` directory on the local filesystem.

## Iterating on your YAML

### Step 1
Shipping a new release to Replicated is as easy as copying the previous YAML release file, incrementing the version by one.
```bash
  $ cp ./replicated/65.yaml ./replicated/66.yaml
```

### Step 2
Next make changes to your new release. In my case I am adding an admin command.
```yaml
admin_commands:
  - alias: redis-cli
    command: ["redis-cli"]
    run_type: exec
    component: DB
    container: redddis
```

### Step 3
Navigate back to the Admin Console and click the "Check Now" button on the Updates tile on the dashboard.
   
![Up-to-Date](/images/post-screens/using-replicated-studio-to-quickly-iterate-on-your-yaml/up-to-date.png)
   
What happened? Looking at the output from the Studio process, we can see that there was an error in our admin command YAML.
   
![YAML Error](/images/post-screens/using-replicated-studio-to-quickly-iterate-on-your-yaml/studio-log.png)
   
Replicated Studio will prevent any invalid releases from being downloaded from its API. Edit the file `./replicated/66.yaml` and make the appropriate fix to the admin command. After clicking the "Check Now" button again, we will now see the pending release on the Releases page of the Admin Console. It is now possible to install the release in Replicated and test our changes.

### Step 4
Remember that Studio does not interact with Replicated's application release APIs. All changes we made only exist on the local filesystem. The release YAML must be copied and saved as a new release in the [Replicated Vendor Portal](https://vendor.replicated.com/) or via the [Replicated Vendor CLI](/api/replicated-vendor-cli/).

{{< note title="A note about YAML in Replicated Studio" >}}
When running Replicated with Studio, not all YAML functionality is supported and only a subset of the full Replicated on-premise experience is available. For more information on what Studio doesn't do see [this link](https://github.com/replicatedhq/studio#what-it-doesnt-do).
{{< /note >}}
