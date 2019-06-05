---
date: "2019-06-04T12:00:00Z"
title: "Built-In Analyzers"
description: "An explanation of Built-in Troubleshoot Analyzers"
weight: "1903"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
aliases:
  - /docs/troubleshoot/analyzers/config-management/
  - /docs/troubleshoot/analyzers/disk-space/
  - /docs/troubleshoot/analyzers/docker-icc/
  - /docs/troubleshoot/analyzers/docker-storage-driver/
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Built-in Analyzers

This section of the documentation lists some of the analyzers that might be displayed and an explanation of why it was added. The list of analyzers here is not a complete list of every analyzer run, rather it is a look into some of the commonly reported insights.

### Configuration Management Software

Popular configuration management tools such as Chef, Puppet and Ansible are used to help management large numbers of servers using automation.

When setting up a server, especially an appliance, it's important to have the server running with known-compatible software and dependencies. When an appliance is provisioned in an environment, occasionally these configuration management tools will run and attempt to bring all of the software to known versions to match other servers in the environment. This can sometimes cause changes made locally to be reverted later.

The support bundle analyzers will detect if Chef or Puppet agents are installed and configured, and surface this as informational. It's important to know this when troubleshooting a server because manual changes may not be possible.

### Disk Pressure

One of the most common causes of service outages on appliances is running out of disk space. If a server is low on disk space, the analyzers will show a warning message and make this visible and easy to detect.

On a Replicated server, this will be reported when the root mount of the Replicated container has less than 1 GB of free space or when the /tmp directory doesn't have at least 1 GB of free space.

### Docker ICC

Some installations of Docker will disable inter-container communication, preventing containers on the server from communicating with each other over the host networking stack. This is a default setting for enterprise distributions such as RedHat Enterprise Linux.

When debugging problems, this might not be obvious, and if ICC is disabled, a message will be displayed in the support bundle analyzers to help make the engineer aware of the fact that inter-container communication will be blocked.

### Docker Storage Drivers

Not every docker storage driver is compatible with each kernel version, and some storage drivers have additional configuration that is required or recommended to run in a production environment. For example, running a server with the devicemapper storage driver in loopback mode is ok for a test environment or locally, but not recommended in a production setup.

When a server is running with an improperly configured storage driver, it might be ok for some time, and start to experience problems at load or after a specific number of containers are running.

The support bundle analyzers look for known incompatible or not-recommended storage driver settings and will report these as errors when detected.
