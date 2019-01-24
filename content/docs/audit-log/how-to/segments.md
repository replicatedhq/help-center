---
date: "2016-07-03T04:02:20Z"
title: "Segments"
description: "Use built-in segments to organize your events"
weight: "1604"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

Segmentation is a powerful concept that helps you organize your audit events. Segments enable you to scope event queries to end-customer organizations when displaying them.

## Groups
For multi-tenant SaaS applications, a group is the most important unit of segmentation as it identifies the various organizations, teams or customers (i.e. groups of users). You can segment your audit log into groups by adding a `group.id` to each event. Then you may provide your end customers read access to their segment with the [Enterprise API](/docs/audit-log/apis/enterprise-api/) and the [embedded viewer](/docs/audit-log/getting-started/embedded-viewer).

Groups are dynamically created as you send events into the Audit Log.


## Segmenting environments with multiple instances

When you run the Audit Log in your own infrastructure, you'll likely use multiple instances to segment your data. For example, if you run separate "staging" and "production" instances of the audit logging stack (e.g. one instance in each of two separate Kubernetes clusters), you probably wont need to create separate environments in either one of those instances.

For this reason, a default project and environment are created during the on-prem installation, and most apps will be able to integrate the audit log using just these default segments.

## Segmenting across multiple applications or environments from a single instance

You can use segments like projects, environments and groups to support multiple tenants or applications within your single instance.

### Project
A project represents a distinct application offered by a vendor. A vendor that only offers a single application, such as spreadsheets, would only need one project, while a vendor offering spreadsheets and calendars would have two projects. You can manage project ids using the [Admin API](/docs/audit-log/apis/admin-api/).

### Environment
An environment represents a deployment target for a project. Replicated Audit Log generates Production and Staging environments for each new project. You can manage your project's environments with the [Admin API](/docs/audit-log/apis/admin-api/).
