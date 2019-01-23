---
date: "2016-07-03T04:02:20Z"
title: "Go"
description: "Install and use the golang SDK"
weight: "2102"
categories: [ "SDKs" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

### [Github](https://github.com/retracedhq/retraced-go) | [godoc](https://godoc.org/github.com/retracedhq/retraced-go)


## Installation

```bash
go get github.com/retracedhq/retraced-go
```


## Basic Usage

Error handling omitted for brevity.


Initialize a client

```
import "github.com/retracedhq/retraced-go"

client, _ := retraced.NewClient("<project id>", "<api token>")
```

Create an event

```
event := &retraced.Event{
		Created:     time.Now(),
		CRUD:        "r",
		Action:      "user.login",
		Description: "User Alice logged in",
		SourceIP:    "102.109.10.1",
		Actor:       &retraced.Actor{ID: "alice@bigcorp.com", Name: "Alice"},
		Group:       &retraced.Group{ID: "bigcorp.com"},
}
```


Report an event

```
resp, _ := client.ReportEvent(event)
```

Verify the event receipt hash

```
err := event.VerifyHash(resp)
if err != nil {
	// hashes did not match
} else {
	// event reported successfully
}
```
