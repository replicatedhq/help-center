---
date: "2018-03-03T04:02:20Z"
title: "Run Command Collector"
description: "The Run Command Custom Collector"
weight: "1704"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Run Command Collector

Another commonly used, general purpose collector is the `os.run-command` collector. This collector will execute a command on the server, and can add the stderr and stdout to the support bundle.

This collector is fully documented in the [reference docs](/api/support-bundle-yaml-specs/os-run-command/).

### Example

To illustrate how to use this collector, consider a support bundle that we'd like to determine the server's wall clock time drift from a known source. We want to add 2 commands, one that get's the servers time, and one that gets the time from a well known source.

```yaml
collect:
  v1:
    - os.run-command:
        output_dir: /checks/clock-drift
        name: date
    - os.run-command:
        output_dir: /checks/clock-drift
        name: cat
          args:
            - </dev/tcp/time.nist.gov/13
```

The above collector definitions will include the server time and the time from time.nist.gov in the /checks/clock-drift directory.
