---
date: "2016-07-03T04:02:20Z"
title: "Redaction"
description: "Redacting Sensitive Information"
weight: "1605"
categories: [ "Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Redacting Sensitive Information

Production environments contain sensitive information (passwords, private keys, etc). The Replicated Troubleshoot tool can scrub sensitive information from a support bundle during collection, to reduce the chance of this being shared. It's important to consider if there will be sensitive data included in a custom collector, and if so, adding redaction.

It's also recommended to treat all support bundles as sensitive, because secrets could be included in a log file or in other unexpected places.
