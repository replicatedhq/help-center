---
date: "2018-03-03T04:02:20Z"
title: "Copy File Collector"
description: "The Copy File Custom Collector"
weight: "1703"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

{{<legacynotice>}}

# Copy File Collector

A commonly used, general purpose collector is the `os.read-file` collector. This copies the contents of a file from the filesystem, and includes the copy in the support bundle.

This collector is fully documented in the [reference docs](/api/support-bundle-yaml-specs/os-read-file/).

### Example

To illustrate how to use this collector, consider a support bundle that we'd like to collect some application specific log files from /var/log/application.log.

```yaml
collect:
  v1:
    - os.read-file:
        output_dir: /logs/application.log
        filepath: /var/log/application.log
        include_empty: true
```

The above collector definition will include the log file in the support bundle at `/logs/application.log`, even if empty.

