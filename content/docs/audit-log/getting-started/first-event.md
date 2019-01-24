---
date: "2016-07-03T04:02:20Z"
title: "First Audit Log Event"
description: "Instrument your application to audit login events"
weight: "1704"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

Getting started with is easy. The best way to start is to pick a single event to start sending to confirm that everything is set up right. If your site has a login event, it's a perfect first event because it covers most of the scenarios that can be tricky when starting to audit log. Login events can have both a successful and failed response, it can be anonymous or authenticated and it may or may not belong to a group.

Remembering the basics of [how to audit log](/docs/audit-log/how-to/basics/), you should find a place in your code that is guaranteed to be executed after a login event.

### Getting a Token

First step is to [get a token and project ID for the publisher api](/docs/audit-log/apis/publisher-api#publisher-api-tokens). If you [installed the Audit Log into your Kubernetes cluster](/docs/audit-log/getting-started/deploying), a default project and token will have been created, and you should have received the token during the install process. You can also get these values with the following commands :

```bash
kubectl get secret auditlog -o json | jq -r .data.BOOTSTRAP_PUBLISHER_TOKEN | base64 --decode
kubectl get secret auditlog -o json | jq -r .data.BOOTSTRAP_PUBLISHER_PROJECT | base64 --decode
```

You may have to modify the above. For example, depending on where you deployed it, you may want to add a `--namespace` parameter.

### Publishing an event

You can verify these values with `curl`, replacing the values below with the ones that make sense for your token, project ID, and API server address.

<!-- todo snippets for nodejs, golang, etc -->

```bash
export AUDITLOG_API_TOKEN=mytoken
export AUDITLOG_API_PROJECT=myproject
export AUDITLOG_API_BASE=https://auditlog.mycompany.com

curl \
  -sSL \
  ${AUDITLOG_API_BASE}/publisher/v1/project/${AUDITLOG_API_PROJECT}/event \
  -H "content-type: application/json" \
  -H "Authorization: Token token=${AUDITLOG_API_TOKEN}" \
  --data-binary '{
  "action": "release.promote",
  "crud": "u",
  "group": {
    "id": "somebigbank.com",
    "name": "SuperTestCorp"
  },
  "actor": {
    "id": "some-id",
    "name": "Actor McActorson"
  },
  "source_ip": "10.0.0.1",
  "fields": {
    "channel": "unstable",
    "application": "my-cool-app"
  }
}'


```

### Sending Events from your application

Next, we'll add auditing to your application. In this case, we'll audit every user login event. 

In your Login API handler, you'll want to add a call to the Publisher API after each login attempt. The Create Event call can be made using one of the [Audit Log SDKs](/docs/audit-log/sdks/available-sdks), or by making a request to `POST /publisher/v1/project/{projectId}/event` as described in the [Publisher API Console](/docs/audit-log/apis/publisher-api) and the [Publisher Swagger Specification](https://api.replicated.com/auditlog/publisher/v1/swagger.json).

### Verifying Event Hashes (Optional)

The response from the Publisher API will include a hash of the received event computed according to the Audit Log [event hashing formula](/docs/audit-log/architecture/hashing-formula). You can choose to verify this hash to ensure the event your api sent is identical to the one received by the server. If you are using one of the [Audit Log SDKs](/docs/audit-log/sdks/available-sdks), you can take advantage of built-in functionality for verifying event hashes.

<!-- todo bring this inline with the rest of our design language -->
<!-- img height="720" src="https://www.lucidchart.com/publicSegments/view/a68dd763-6aa0-4835-be1f-91f7728befc7/image.png"/-->