---
date: "2016-07-03T04:02:20Z"
title: "Using The Audit Log Viewer"
description: "Easily search and export events"
weight: "1902"
categories: [ "Exposing Events" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

The Audit Log viewer is the easiest way consume and understand your audit log data. This guide will walk you through the viewer's features.

## Overview

The viewer exposes four core features:

1. Search
1. Filters
1. Export
1. API Token Management.

<img class="mask-img" src="/images/audit-log/viewer-top.png">

### Search

The search box allows for free-text search of all audit events, but also supports some structured search operators. Some example searches:

* `edit` -- free text search
* `action:users.list` -- search by action
* `action:document.* location:Germany` -- search by action and location
* `actor.id:john.doe@mycompany.com` -- search by actor id
* `action:user.login,user.logout`  -- seach by multiple actions

### Filters

The filters section allows for filtering events by date range, and by Create/Read/Update/Delete actions.

### Export

Save searches and export them to CSV using the "Exports" section.

### API Tokens

Create and Manage Enterprise API tokens using the "API Tokens" section.

For a guide on using API Tokens, see [Using The Enterprise API](/docs/audit-log/exposing-events/enterprise-api)

