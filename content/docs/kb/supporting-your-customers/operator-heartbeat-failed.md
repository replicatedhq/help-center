+++
date = "2017-09-01T00:00:00Z"
lastmod = "2017-09-01T00:00:00Z"
title = "Replicated-Operator error message: Operator heartbeat failed"
weight = "999999"
categories = [ "Knowledgebase", "Supporting Your Customers" ]
+++

## Discription: 
Replicated-Operator fails to communicate with Replicated due to a conflict over access to memory, disk storage, or CPU.

Error massage:
```Shell
INFO 2017-08-24T17:31:42+00:00 [replicated-operator] heartbeat.go:46 Operator heartbeat failed: context deadline exceeded
WARN 2017-08-24T17:31:42+00:00 [replicated-operator] heartbeat.go:50 Operator heartbeat monitor timeout after 2m0s, disconnecting
```

## Solution:

Verify computing power on a server. If host is over-utilized, identify bottlenecks and increase capacity as needed.