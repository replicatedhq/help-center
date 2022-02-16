---
date: "2019-06-04T12:00:00Z"
title: "Analyzers"
description: "An explanation of Troubleshoot Analyzers"
weight: "1902"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
aliases: [ /docs/troubleshoot/analyzers, /docs/troubleshoot/server/analyzers ]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
hideFromList: true
---

{{<legacynotice>}}

# Analyzers

**For access to this alpha feature, please [contact us](https://vendor.replicated.com/support).**

Fully customizable analyzers can be written to extract insights specific to your application.

After uploading a support bundle to the [Vendor Portal](https://vendor.replicated.com/troubleshoot), a series of analyzers will run to extract insights from the logs and other files included.

![Support Bundle Analyzers](/images/troubleshoot/analyzers.png)

Many different analyzers are run, and attempt to find known incompatibilities, misconfigured services and environment issues that might be causing problems. Additionally, commonly accessed information such as version numbers, server load, and more are displayed here to help reduce the need to dig through log files to find this information.

### Built-in Analyzers

Some analyzers have been pre-configured for common use cases. The [Built-In Analyzers section](/docs/troubleshoot/server/analyzers/builtin/) of the documentation lists some of the analyzers that might be displayed and an explanation of why it was added.

### Custom Analyzers

Additionally, [fully customizable analyzers](/docs/troubleshoot/server/analyzers/creating-analyzers/) can be written to extract insights specific to your application.

**For access to this alpha feature, please [contact us](https://vendor.replicated.com/support).**
