---
date: "2016-07-07T04:02:20Z"
title: "Snapshotting with the Replicatedctl CLI"
description: "Use the Replicatedctl CLI to snapshot and restore"
weight: "2203"
categories: [ "Snapshots" ]
index: "other"
---

{{<legacynotice>}}

{{< linked_headline "Using the CLI to Restore Snapshots" >}}

The Replicated CLI can be used to examine and restore snapshots. There are two ways to configure snapshots backend without accessing the UI. Configuration options can be added to the /etc/replicated.conf file or specified on the command line.

```json
{
  "SnapshotsStore": "s3",
  "SnapshotsPath": "/data",
  "SnapshotsS3Bucket": "snapshots",
  "SnapshotsAWSRegion": "us-east-1",
  "SnapshotsAWSKeyID": "xxxx",
  "SnapshotsAWSSecretKey": "xxxx",
  "SnapshotsAWSServerSideEncryption": "aws:kms",
  "SnapshotsAWSSSEKMSKeyID": "arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab",
  "SnapshotsSFTPHost": "192.168.0.10",
  "SnapshotsSFTPUsername": "jondoe",
  "SnapshotsSFTPPrivateKeyPEM": "pem data"
}
```

Documentation for the `replicatedctl snapshot` command can be found [here](/api/replicatedctl/replicatedctl_snapshot/).

SnapshotsPath: Snapshot location path. The value should be an absolute path. This option is not used with s3 backend. When used with sftp option, the path has to exist, and the SFTP user needs to have write access to it.

SnapshotsS3Bucket: S3 bucket name. This option is only used with s3 backend.

SnapshotsAWSRegion: S3 bucket region. This option is only used with s3 backend.

SnapshotsAWSKeyID: ID of the secret key that has write access to the specified S3 bucket. This option is only used with s3 backend. Leave unset on EC2 to use the instance profile.

SnapshotsAWSSecretKey: Secret key value. This option is only used with s3 backend. Leave unset on EC2 to use the instance profile.

SnapshotsAWSServerSideEncryption: S3 Server Side Encryption parameter. Can be `aws:kms` to enforce aws:kms usage or the empty string to use bucket settings.

SnapshotsAWSSSEKMSKeyID: S3 Server Side Encryption Key ARN. Set to an AWS key ARN to override bucket defaults or the empty string to use the bucket default key with `aws:kms` set. Ignored when the S3 Server Side Encryption parameter is not `aws:kms`.

SnapshotsSFTPHost: Hostname or IP of the server where snapshots will be stored. The value can be in host or host:port format. The address can be of the same server, however the value localhost cannot be used. This option is only used with sftp backend.

SnapshotsSFTPUsername: User name that will be used to login to the SFTP host. This option is only used with sftp backend.

SnapshotsSFTPPrivateKeyPEM: Private key used for authentication. When used on command line, the value should be base64 encoded. This option is only used with sftp backend.
