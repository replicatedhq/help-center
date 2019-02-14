---
date: "2016-07-03T04:02:20Z"
title: "Immutability Guarantee"
description: "Events in an audit log are immutable"
weight: "1614"
categories: [ "Architecture" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

A fundamental tenet of any audit log is that it must be absolutely immutable.

Data in an audit log should never change. Deleted objects should maintain a separately logged record of actions associated with the object (including its creation and deletion). External facing APIs should only be able to read the audit log, not write to it.

When you send audit events into the Audit Log, we leverage functionality that guarantees the data you sent is the data that was received. We use the same functionality to allow you to, at any time, cryptographically verify that the events have not changed since they were written and no events have been removed.


## Future Verification of Immutability

When validating immutability for audit events, it's important to both verify that the events have not changed, and to verify that no events were added or deleted. The Audit Log provides functionality for both of these verifications.

Audited events are not always displayed with every field originally sent. Also, it's possible for an [actor or item to be renamed](../renaming-properties) at some point in the future. The Audit Log will always store the original event received, and it's possible to retrieve that source. In fact, this source is used to dynamically calculate value to show when displaying an event in the browser or other source.

The Audit Log implements industry standard and provable digest algorithms to ensure the data you send into an audit log is the data that was received. The same algorithms can be used in the future to verify that none of the data has changed since it was written. This works automatically when using our [SDKs](/docs/audit-log/sdks/available-sdks), and can be implemented manually if you use the API directly.

## Digest of Events

When an event is received by the Publisher API, the methods that receives the event will always synchronously compute a digest hash of the data received, using our publicly documented [hashing formula](/docs/audit-log/architecture/hashing-formula). The computed digest is returned, along with the rest of the standard response. It's up to the sender to independently calculate the digest of the event and compare it to the response from the Publisher API. If these digests do not match, the event was not properly decoded or received by the Publisher API.

When using any of the [official Audit Log SDKs](/docs/audit-log/sdks/available-sdks), this computation and comparison happens automatically. All of our SDKs are open source, and this can be independently verified by examining the relevant source code of the SDK.
