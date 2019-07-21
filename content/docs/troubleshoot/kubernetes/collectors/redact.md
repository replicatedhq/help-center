---
date: "2019-07-17T04:02:20Z"
title: "Redaction"
description: "Content Redaction"
weight: "35002"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

By default troubleshoot will redact sensitive information from all collectors. This includes

- passwords
- tokens
- AWS secrets
- IP addresses
- Database connection strings
- URLs that include user names and passwords


This functionality can be turned off by passing `--redact=false` to the troubleshoot command.
