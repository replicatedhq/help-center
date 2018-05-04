---
date: "2016-07-03T04:02:20Z"
title: "Segments"
description: "Events in an audit log must be ordered"
weight: "1707"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedCircle"
---

## Project
A project represents a distinct application offered by a vendor. A vendor that only offers a single application, such as spreadsheets, would only need one project, while a vendor offering spreadsheets and calendars would have two projects. You can find your project IDs on the Settings page of the [admin site](https://app.retraced.io).

## Environment
An environment represents a deployment target for a project. Retraced generates Production and Staging environments for each new project. You can manage your project's environments with the [Admin API](/docs/audit-log/apis/admin-api/) or the [admin site](https://app.retraced.io).

## Group
A group is an end customer in your multi-tenant application. You can segment your audit log into groups by adding a ```group.id``` to each event. Then you may provide your end customers read access to their segment with the [Enterprise API](/docs/audit-log/apis/enterprise-api/).
