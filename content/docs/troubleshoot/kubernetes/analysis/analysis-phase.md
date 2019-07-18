---
date: "2019-07-17T04:02:20Z"
title: "Analysis Phase"
description: "Describing the Analysis phase"
weight: "36001"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
aliases:
  - /docs/troubleshoot/kubernetes/analysis/
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

The analysis section is executed after all collection is complete. This doesn’t connect back to the cluster, but instead just uses the analysis output.

All analyzers support a fail, warn or pass message. These are evaluated in the order specified in YAML; if the first analysis doesn’t trigger, then the next is checked, and finally the last is. This allows wildcard for either pass or fail.

Each fail, warn or pass has a message and a uri field. Message can be markdown to include inline links. Having a separate URI field makes it easy to include a “more info” link in the UI when there’s one.
