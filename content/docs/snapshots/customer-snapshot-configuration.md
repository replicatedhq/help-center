---
date: "2016-07-07T04:02:20Z"
title: "Customer Configutation Options"
description: "Customer configuration options for snapshots"
weight: "2202"
categories: [ "Snapshots" ]
index: "docs/snapshots"
---

{{< linked_headline "Customer Snapshot Configuration Options" >}}

If snapshots are enabled for an application, end customers can configure the destination, retention, timeout and schedule automated snapshots on the Console Settings screen.

![snapshots](/images/post-screens/snapshot-config.png)

{{< note title="Remote Backends" >}}
Replicated supports S3, SFTP, and local backends for snapshots.  The use of local storage is highly discouraged in production instances for the following reasons:

  * Moving large number of files to local host can become a resource consuming operation, which will slow down other containers running on the host.

  * By default, local storage is likely to be on the same physical volume as all other critical data.  If this option is used, the path should be located on a network attached volume with large capacity.
{{< /note >}}

### Local

Local configuration only requires the name of the directory where snapshots will be stored.  No additional steps are needed.

### S3

S3 configuration requires that the bucket exists and the supplied key has write permissions to the bucket.  When configuring a new server, the bucket should be empty.

### SFTP

SFTP configuration requires that the path on the remote server exists and the user specified in the configuration has read/write permissions on the folder.  When configuring a new server, the destination folder on the remote server should be empty.

{{< note title="Multiple Instances" >}}
Multiple instances cannot share the same destination for snapshots when configured to use SFTP or S3.  Multiple instances will override each other's snapshot metadata when using identical configuration.
{{< /note >}}
