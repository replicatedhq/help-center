---
date: "2018-03-03T04:02:20Z"
title: "Redaction"
description: "Example Redaction of Support Bundle"
weight: "2105"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

{{<legacynotice>}}

# Redaction

It's often required to redact sensitive information from a support bundle before delivering it for analysis.
Redactors can be specified for an individual collector or for every collector at once.

# Redacting a single collector

Redacting a basic string from a file:

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

In some situations it may be worthwhile to ensure that the redacted output remains valid yaml.
To do this, we can make sure to capture - and include again in our output - all of the characters surrounding the password, replacing only the password itself.

```yaml
collect:
  v1:
    - docker.container-inspect:
        description: the supergoodtool docker container information
        container: supergoodtool-main
        output_dir: /app/main/
        scrub:
          regex: >-
            (?i)(password["',=]+)[^"',]+(["',]*)
          replace: ${1}REDACTED${2}
```

In this example, we're using a couple more advanced features.
First, `(?i)` at the beginning of the regex sets case-insensitive mode.
We're also using yaml's multiline string formatting to avoid having to escape quotes or other special characters.
It's also far easier to develop a regular expression by experimenting with various inputs and outputs - [regex101](https://regex101.com/r/uu7Jkz/1) can be used to develop the matching string and [The Go Playground](https://play.golang.org/p/vB8XfahaXDj) is useful to validate that the entire replace sequence worked as expected.


# Redacting all collectors

Including a `meta.redact` collector will cause the specified `scrubs` to be applied across every support bundle resource.

```yaml
collect:
  v1:
    - meta.redact:
        scrubs:
          - regex: (DB_PASSWORD ?=)(.*)
            replace: ${1}=REDACTED
          - regex: (APP_PASSWORD ?=)(.*)
            replace: ${1}=REDACTED
        output_dir: redact/
```
