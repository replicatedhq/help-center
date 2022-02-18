---
date: "2018-03-03T04:02:20Z"
title: "Troubleshoot Overview"
description: "An overview of Troubleshoot"
weight: "1602"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/server"]
aliases:
  - /docs/troubleshoot/server
  - /docs/troubleshoot/server/getting-started

icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
hideFromList: true
---

{{<legacynotice>}}

Replicated Troubleshoot is a tool designed to enable identification, collection, delivery and analysis of remotely-operated distributed systems.

To get started, there are a couple of terms to know:

### Support Bundle

A support bundle is an archive that's generated in the remote environment (on-prem). A support bundle is a single .tar.gz archive. This archive can be opened and parsed manually, or analyzed by the Replicated Troubleshoot Analyzers to extract insights.

### Collectors

Collectors are defined in single YAML document that idenfities what to collect and any post-processing steps that should be executed before or after creating the support bundle.

By default, Replicated Troubleshoot contains a large number of commonly used, best-practice collectors. With no other input, a support bundle will contain a large amount of data that's useful when remotely debugging a container-based deployment of an application.

### Custom Collectors

Custom Collectors are specific items that are defined in a YAML document that is provided as an input to the support bundle generation process. These can replace or supplement the built-in collectors.

A custom collector can be a file or directory to add to the support bundle, a command to run and capture the output, or many other supported collectors.

### Analyzers

When a support bundle is uploaded to the [Replicated Vendor Portal](https://vendor.replicated.com), it will be extracted and automatically analyzed. The goal of this process is to find insights that are known issues or hints of what might be a problem. Analyzers are designed to program the debugging and log reading skills into an application that is quick and easy to run for any support bundle collected.

### Insights

Insights are specific items that the analyzer process found and surfaced. Insights can contain custom messages and levels, and are specific to the output of the analysis step on each support bundle.

## How to read these docs

With the exception of the reference sections around APIs and YAML definitions, this documentation is designed to be read in order. Certain concepts and examples that are introduced early will be built upon in later sections.

