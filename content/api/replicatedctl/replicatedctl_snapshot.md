---
aliases:
- docs/reference/replicatedctl/replicatedctl_snapshot
categories:
- replicatedctl
date: 2018-08-14T17:46:29-07:00
description: Manage snapshots
gradient: purpleToPink
index: docs
title: replicatedctl snapshot
weight: "551"
---

## replicatedctl snapshot

Manage snapshots

### Synopsis

Manage snapshots

### Options

```
  -h, --help                               help for snapshot
      --path string                        Snapshot location path. The value should be an absolute path. This option is only used with local and sftp backends.
      --s3-bucket string                   S3 bucket name. This option is only used with s3 backend.
      --s3-compatible-endpoint string      AWS compatible S3 endpoint. This option is only used with s3 backend.
      --s3-key-id string                   ID of the secret key that has write access to the specified S3 bucket. This option is only used with s3 backend.
      --s3-region string                   S3 bucket region. This option is only used with s3 backend.
      --s3-secret-key string               Secret key value. This option is only used with s3 backend.
      --s3-server-side-encryption string   AWS server side encryption type, can be '' or 'aws:kms'. This option is only used with s3 backend.
      --s3-sse-kms-key-id string           AWS SSE KMS Key ID for server side encryption. This option is only used with s3 backend.
      --sftp-host string                   Hostname or IP of the server where snapshots will be stored. The value can be in host or host:port format. The address can be of the same server, however the value localhost cannot be used. This option is only used with sftp backend.
      --sftp-key string                    base64 encoded private key PEM data used for authentication, passed on the command line. This option is only used with sftp backend.
      --sftp-user string                   User name that will be used to login to the SFTP host. This option is only used with sftp backend.
      --store string                       Backend store. Valid values are s3, sftp, and local.
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl](/api/replicatedctl/)	 - Replicated CLI
* [replicatedctl snapshot ls](/api/replicatedctl/replicatedctl_snapshot_ls/)	 - List snapshots
* [replicatedctl snapshot restore](/api/replicatedctl/replicatedctl_snapshot_restore/)	 - Restore installation from the specified spanshot
* [replicatedctl snapshot start](/api/replicatedctl/replicatedctl_snapshot_start/)	 - Start a snapshot

