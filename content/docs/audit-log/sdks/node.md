---
date: "2016-07-03T04:02:20Z"
title: "Node.js"
description: "Events in an audit log must be ordered"
weight: "2103"
categories: [ "SDKs" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---


### [Github](https://github.com/retracedhq/retraced-js) | [npm](https://www.npmjs.com/package/retraced)


## Installation

The Replicated Audit Log NodeJS SDK can be installed with npm:

```sh
npm install -s retraced
```


## Basic Usage


Initialize a client
```javascript
import * as Retraced from "retraced";

const retraced = new Retraced.Client({
	apiKey: "your api key goes here",
	projectId: "your project id goes here",
});
```


Create an event
```javascript
const event = {
  action: "some.record.created",
  teamId: "My Rad Customer",
  crud: "C",
  source_ip: request.ip,
  actor: {
    id: "ultra.employee@customertowne.xyz",
    displayName: "Ultra Employee",
    url: "https://customertowne.xyz/employees/123456",
  },
  target: {
    id: newRecord.id,
    displayName: newRecord.name,
    url: "https://customertowne.xyz/records/" + newRecord.id,
  },
};
```

Report an event
```javascript
// The Retraced client's methods are asynchronous.
// You can "fire and forget" them...
retraced.reportEvent(event);

// ... "await" them...
console.log("Reporting...");
await retraced.reportEvent(event);
console.log("Finished reporting!");

// ... or treat them as Promises.
console.log("Reporting...");
retraced.reportEvent(event)
  .then(() => { console.log("Finished reporting!"); })
  .catch((err) => handleError(err));
}
```