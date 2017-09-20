---
date: "2016-07-03T04:02:20Z"
title: "Promote Releases"
description: "The process for leveraging Replicated's release channel management functionality to stage versions and deliver updates to customers."
weight: "301"
categories: [ "Distributing an Application" ]
index: "docs"
tags: ["Replicated Vendor"]
---

Every Replicated license points to a Release Channel. When a license is installed, it will pull down and install the release that is currently at the top of its channel. It’s recommended to create customer licenses on the Stable channel, and only promote releases to Stable that are ready for all customers to install.

Once an application is installed, the active instance can be updated by promoting a release to the channel that instance is licensed to (likely Stable).  Each instance will periodically check for new releases. When a new release is found, the Replicated installation will show a button that allows end customers managing the instance to read the release notes and install the update.
A license only checks it’s own release channel.

To promote a release, you can use the [vendor portal](https://vendor.replicated.com/releases) and click the Promote button:

 ![Promote Button](/images/post-screens/promote-button.png)

When a release is promoted it should be given a version label and detailed release notes. The release notes support markdown and will be shown to your customer. Additionally, each promoted release must be given a required status (required or not required).

{{% page_notes %}}
- Before you can create or install a license, a release must be promoted to the channel.
- Update checking defaults to every 5 hours but can be configured by end customers.
- It is possible to change a license value to have updates automatically installed when detected by the running instance.
- License values are synced with the values set in the vendor portal at every update check.
- Releases will not be editable after being promoted to a channel.
- Release notes, version numbers, the required status may be edited after promotion by visiting the channel's history.
{{% /page_notes %}}