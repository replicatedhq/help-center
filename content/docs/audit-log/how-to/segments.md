---
date: "2016-07-03T04:02:20Z"
title: "Segments"
description: "Use built-in segments to organize your events"
weight: "1707"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

Segmentation is a powerful concept that helps you organize your audit events. You can use segments like projects, environments and groups to support multiple tenants or apllications. Segments enable you to scope event queries to end-customer organizations when displaying them.

## Project
A project represents a distinct application offered by a vendor. A vendor that only offers a single application, such as spreadsheets, would only need one project, while a vendor offering spreadsheets and calendars would have two projects. You can find your project IDs on the Settings page of the [admin site](https://app.retraced.io).

## Environment
An environment represents a deployment target for a project. Replicated Audit Log generates Production and Staging environments for each new project. You can manage your project's environments with the [Admin API](/docs/audit-log/apis/admin-api/).

## Group
A group is an end customer in your multi-tenant application. You can segment your audit log into groups by adding a ```group.id``` to each event. Then you may provide your end customers read access to their segment with the [Enterprise API](/docs/audit-log/apis/enterprise-api/).

## Segmenting on Prem

When you run the Audit Log in your own infrastructure, you may also use multiple instances to segment your data. For example, if you run separate "staging" and "production" instance of the audit logging stack (e.g. one instance in each of two separate Kubernetes clusters), you probably wont need to create separate environments in either one of those instances. 

For this reason, a default project and environment are created during the on-prem installation, and most apps will be able to integrate the audit log using just these default segments.
