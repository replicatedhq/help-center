---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect Audit Log events from a running Audit Log instance
index: docs
title: retraced.events
weight: "100"
gradient: "purpleToPink"
---

## retraced.events

Collect Audit Log events from a running Audit Log instance


```yaml
collect:
  v1:
    - retraced.events:
        output_dir: /audit/events
        api_endpoint: 'https://auditlogs.mycorp.internal:8080'
        api_token: aef342f32f22f3edf1f1f3f3ef
        project_id: f3edf1f1f3f3efaef342f32f22
```

```yaml
collect:
  v1:
    - retraced.events:
        output_dir: /audit/events
        api_endpoint: 'https://auditlogs.mycorp.internal:8080'
        api_token: aef342f32f22f3edf1f1f3f3ef
        project_id: f3edf1f1f3f3efaef342f32f22
        insecure: true
        timeout_seconds: 10
        mask:
          Action: true
          Description: true
          ActorID: true
          ActorName: true
          CanonicalTime: true
        query:
          CRUD: 'c,u,d'
```


### Required Parameters


- `api_endpoint` - The location of the Audit Logs API endpoint in the form `http(s)://<host>:<port>`


- `api_token` - An API token for communicating with the audit log instance


- `project_id` - The Audit Log Project ID



### Optional Parameters


- `insecure` - Set to `true` to skip SSL verification on the endpoint


- `mask` - A mask to determine what fields to include in the output file, as in https://github.com/retracedhq/retraced-go/blob/master/graphql.go#L160


- `query` - A structured query for filtering events, as in https://github.com/retracedhq/retraced-go/blob/master/graphql.go#L16



### Outputs

    
- `audit_events.csv` - The audit events in CSV format


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  