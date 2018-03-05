---
date: "2016-07-07T04:02:20Z"
title: "Snapshotting with the Replicatedctl CLI"
description: "Use the Replicatedctl CLI to snapshot and restore"
weight: "2203"
categories: [ "Snapshots" ]
index: "other"
---

{{< linked_headline "Using the CLI to Restore Snapshots" >}}

The Replicated CLI can be used to examine and restore snapshots. There are two ways to configure snapshots backend without accessing the UI. Configuration options can be added to the /etc/replicated.conf file or specified on the command line.

{
  "SnapshotsStore": "s3",
  "SnapshotsPath": "/data",
  "SnapshotsS3Bucket": "snapshots",
  "SnapshotsAWSRegion": "us-east-1",
  "SnapshotsAWSKeyID": "xxxx",
  "SnapshotsAWSSecretKey": "xxxx",
  "SnapshotsSFTPHost": "192.168.0.10",
  "SnapshotsSFTPUsername": "jondoe",
  "SnapshotsSFTPPrivateKeyPEM": "pem data"
}
replicatedctl snapshot ls \
 --backend-options SnapshotsStore=s3 \
 --backend-options SnapshotsS3Bucket=snapshots \
 --backend-options SnapshotsAWSRegion=us-east-1 \
 --backend-options SnapshotsAWSKeyID=ABCDEFGHIJK123456789 \
 --backend-options SnapshotsAWSSecretKey=xxxx \
 --backend-options SnapshotsSFTPPrivateKeyPEM=YmFzZTY0IGVuY29kZWQgcGVtIGRhdGE=
Snapshot backend options
SnapshotsStore: Snapshot backend type. Valid values are s3, sftp, and local.

SnapshotsPath: Snapshot location path. The value should be an absolute path. This option is not used with s3 backend. When used with sftp option, the path has to exist, and the SFTP user needs to have write access to it.

SnapshotsS3Bucket: S3 bucket name. This option is only used with s3 backend.

SnapshotsAWSRegion: S3 bucket region. This option is only used with s3 backend.

SnapshotsAWSKeyID: ID of the secret key that has write access to the specified S3 bucket. This option is only used with s3 backend.

SnapshotsAWSSecretKey: Secret key value. This option is only used with s3 backend.

SnapshotsSFTPHost: Hostname or IP of the server where snapshots will be stored. The value can be in host or host:port format. The address can be of the same server, however the value localhost cannot be used. This option is only used with sftp backend.

SnapshotsSFTPUsername: User name that will be used to login to the SFTP host. This option is only used with sftp backend.

SnapshotsSFTPPrivateKeyPEM: Private key used for authentication. When used on command line, the value should be base64 encoded. This option is only used with sftp backend.
