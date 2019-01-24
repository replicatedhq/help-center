---
date: "2016-07-03T04:02:20Z"
title: "Operations Friendly"
description: "The Audit Log is designed with your ops team in mind"
weight: "1710"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

### Optimized for day-two operations

The audit log is designed to run in your Kubernetes infrastructure. [Ship](https://www.replicated.com/ship) is the recommended way to deploy the Audit Log. While Ship provides an easy one-line installation, it is optimized for ease of day-two operations. The Audit Log is a critical in-line component in most systems, so zero-downtime updates, rich customizations, monitoring, and troubleshooting are all baked in from the start.


### Built-in Metrics

Audit log components export hundred of operational and application-level metrics including:

- Aggregate service level indicators like end-to-end event processing latency
- Throughput, latency, and error rates for all internal client operations, API endpoints, and async processors
- Connection pool utilization and queue depths 

Metrics can be reported to any Statsd-compliant monitoring system, and native support for [statuspage.io](https://statuspage.io) is also included. A  detailed runbook with metric descriptions, details, and recommended alerting thresholds can be provided upon request.

### Highly Available

Because it is a critical, in-line component, an Audit Log needs to maximize availability on the event reporting endpoints used on critical application code paths. The Replicated Audit Log optimizes for:


1. High availability and low latency on event publishing endpoints
1. Eventual consistency when querying audit log events 

With colocated commodity instances (e.g. VMs in an AWS VPC), it is possible to achieve event ingest response times on the order of 5ms with 100s or 1000s of events per second. That is, the limiting throughput/latency factor is the write latency of underlying Postgres database. 

Further, the Audit Log guarantees that if it returns a 200 status code on a "publish event" call, that event will make it into the audit log, regardless of failure of the intermediate components in the processing pipeline.


## Failure Modes and Retries

As with many distributed system, it is impossible to provide 100% uptime guarantees in the face of failures across the stack. The best way to ensure all events are delivered is to configure clients to retry on timeouts and failures. 

A unique, client-generated request ID can be sent in a `x-request-uuid` header to ensure idempotency across retries. If multiple events are received with the same UUID, only of the event will be logged.

<br>

#### Publish-Event Failure Examples

Even when running multiple API replicas, there are a number of layers between the client and the Audit Log APIs that may fail, including but not limited to:

- A proxy or service mesh sidecar added to API pods
- Kubernetes cluster software-defined networking
- Kubernetes service proxy / IPVS
- Kubernetes DNS
- Networking infrastructure in VM/cloud/hardware 


