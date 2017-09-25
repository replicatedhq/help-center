---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Restoring From a Snapshot"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: ["Snapshots", "Replicated UI"]
---

**The snapshots functionality in Replicated is for disaster recovery purposes.**

If snapshots are enabled in the application YAML, the user will have the ability
to perform manual and scheduled snapshots.  More information on configuring snapshots can be
found in the [Snapshots](/docs/packaging-an-application/snapshots/) section.

To restore you need to create a fresh install of replicated which you can find instructions
for [here](/docs/distributing-an-application/installing-via-script/). Before
running the web console at https://<server_address>:8800 place a copy of the full snapshot directory
on the host. Proceed through the https setup screen and on the upload your license page click the
"restore from a snapshot" link.

![Restore](/images/post-screens/restore-start.png)

1. Enter the path on the host where you have copied the snapshots folder,
1. Click “Browse snapshots”:
1. Locate the latest version you would like to backup from and click the “Restore” button.

![Restore](/images/post-screens/restore-location.png)

You will be given options for restoring, downloading the volumes, or deleting from the prior
install, in this case we will restore to the local host by clicking the “restore” button.

![Restore Hosts](/images/post-screens/restore-hosts.png)

Next you will be prompted to specify which host you would like to restore to (for this example
I am going to restore to local).

![Restore Local Host](/images/post-screens/restore-local-host.png)

The last step is to set the correct interface for the localhost, in this case it is “eth0” and one last time hit the “restore” button.

![Restore Local Host Interface](/images/post-screens/restore-local-host-interface.png)

You have now restored your snapshot! Take yourself to the console.

For example of advanced snapshot setups make sure to check out our
[Zero Downtime Backups With Replicated](/docs/kb/developer-resources/zero-downtime-backup/) article.
