---
date: "2018-03-03T04:02:20Z"
title: "Troubleshoot API"
description: "An introduction to the Troubleshoot API"
weight: "2002"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
aliases: [ /docs/troubleshoot/api ]
icon: "replicatedTroubleshoot"
gradient: "console"
hideFromList: true
---

# Troubleshoot API

The Replicated Troubleshoot API is implemented as a YAML spec. We currently support a single YAML file that defines both [collectors](../../collectors) and [lifecycle](../../lifecycle) elements.

An short example spec that conforms to the latest Troubleshoot API is:

```yaml
collect:
  v1:
    - docker.version:
        output_dir: /docker/version

lifecycle:
    - message:
        contents: "Gathering information that will help our support team diagnose what's wrong.."
    - generate:
        use_defaults: true
    - upload:
        prompt:
          message: |
            Support bundle has been generated at {{.BundlePath}}.
            Do you want to securely send this to our support team now?
          accept: "Support bundle has been delivered!"
          decline: |
            Please send the support bundle at {{.BundlePath}} to
            your support rep.
          default: true
```

Full reference docs on [all possible collect and lifecycle elements](/api/support-bundle-yaml/) is available.

We maintain reference documentation of all [collect options](/api/support-bundle-yaml-specs/shared/) and all [lifecycle options](/api/support-bundle-yaml-lifecycle/root/).
