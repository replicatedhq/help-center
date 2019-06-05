---
date: "2016-07-03T04:02:20Z"
title: "Redaction"
description: "Redacting Sensitive Information"
weight: "1605"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Redacting Sensitive Information

Production environments contain sensitive information (passwords, private keys, etc).
The Replicated Troubleshoot tool can scrub sensitive information from a support bundle during collection, to reduce the chance of this being shared.
It's important to consider if there will be sensitive data included in a custom collector, and if so, adding redaction.
In other situations, default collectors may themselves include sensitive data, such as environment variables provided to a Docker container.
This can be handled by applying a redactor to all files within a bundle.

It's also recommended to treat all support bundles as sensitive, because secrets could be included in a log file or in other unexpected places.

# Redacting the output of a single collector

If you know a collector will normally contain sensitive data, you can include a scrub regex within that collector spec.
For example, if you know that a config file copied from an application container may include a password in the form `DB_PASSWORD=hunter2`, a scrubber for that spec would be recommended.

That could look like this:

```yaml
collect:
  v1:
    - docker.container-cp:
        description: the supergoodtool configuration file
        container: supergoodtool-main
        src_path: /etc/default/supergoodtool.conf
        output_dir: /app/main/
        scrub:
          regex: (DB_PASSWORD ?=)(.*)
          replace: ${1}=REDACTED
```

Then, when copying the file, `hunter2` would be replaced with `REDACTED`.

# Redacting the output of all collectors

Sometimes, it's easiest to redact every collector without considering whether the redaction is relevant for the collector in question.
Or you may need to redact the output produced by collectors you do not control - for example, the default support bundle specs.
For those situations, `meta.redact` can provide the solution.

`meta.redact` is functionally equivalent to adding every specified scrubbing regex to every collector spec.
This means that the below set of specs will have the same file output as from the example before.

```yaml
collect:
  v1:
    - docker.container-cp:
        description: the supergoodtool configuration file
        container: supergoodtool-main
        src_path: /etc/default/supergoodtool.conf
        output_dir: /app/main/
    - meta.redact:
        scrubs:
          - regex: (DB_PASSWORD ?=)(.*)
            replace: ${1}=REDACTED
        output_dir: redact/
```
