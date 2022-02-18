---
date: "2018-03-03T04:02:20Z"
title: "Lifecycle"
description: "An explanation of Troubleshoot Lifecycle"
weight: "1802"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
aliases: [ /docs/troubleshoot/lifecyle, /docs/troubleshoot/server/lifecyle ]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
hideFromList: true
---

{{<legacynotice>}}

# Lifecycle

When writing a Troubleshoot custom collector, it's possible to add custom messaging and to add or remove upload prompts from the generation process.

A default lifecycle spec is applied, if a different one is not provided. The default lifecycle simply collects a support bundle and writes it to disk.

Replicated provides additional options in the lifecycle section, all of them are [documented in reference section](/api/support-bundle-yaml-lifecycle/root/).

You can change this default behavior to avoid prompting and have custom messages, if desired by passing a custom lifecycle spec like this:

```yaml
lifecycle:
  v1:
    - generate: {}
    - message: |
        A support bundle has been created at {{.BundlePath}}.
        Please take a look at this bundle contents, remove
        any sensitive data you don't want to share, and then
        attach it to your support ticket."
```
