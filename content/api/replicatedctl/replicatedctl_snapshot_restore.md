---
aliases:
- docs/reference/replicatedctl/replicatedctl_snapshot_restore
categories:
- replicatedctl
date: "2020-03-30T08:05:16-07:00"
description: Restore installation from the specified snapshot
gradient: purpleToPink
index: docs
title: replicatedctl snapshot restore
weight: "551"
---

{{<legacynotice>}}

## replicatedctl snapshot restore

Restore installation from the specified snapshot

### Synopsis

Restore installation from the specified snapshot

```
replicatedctl snapshot restore ID [flags]
```

### Options

```
      --dismiss-preflight-checks   Dismiss preflight checks
  -h, --help                       help for restore
      --node-timeout int           Number of seconds to wait for nodes to connect (default 60)
```

### Options inherited from parent commands

```
      --host string                        Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
      --path string                        Snapshot location path. The value should be an absolute path. This option is only used with local and sftp backends.
      --s3-bucket string                   S3 bucket name. This option is only used with s3 backend.
      --s3-compatible-endpoint string      AWS compatible S3 endpoint. This option is only used with s3 backend.
      --s3-folder string                   S3 folder name. This option is only used with s3 backend.
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

### SEE ALSO

* [replicatedctl snapshot](/api/replicatedctl/replicatedctl_snapshot/)	 - Manage snapshots

