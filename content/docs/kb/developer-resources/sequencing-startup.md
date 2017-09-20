---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Sequence Your App Startup and Know When it's Ready"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Application YAML"]
---

Orchestrating your containers to “turn on” in the correct order is one of the more challenging issues
our vendors face when taking their product from “SaaS to On-Prem”. To help you avoid frustrating
race conditions when deploying your app on-premise Replicated has added a few powerful tools to
simplify container sequencing. Note that containers will not be guaranteed to start in a specific
order if no events are present in your yaml.

**I want to ensure that my DB (Redis) is started before I turn on my app and eventually my load balancer.
We are going to use [Publish Events](/docs/packaging-an-application/events-and-orchestration/#published-events)
functionality to accomplish this.**

Im going to add `container-start` triggers to our containers, I will also specify a `subscription` to this
`trigger` and the `action` that the subscribed container will take when the event happens.

First in the redis container I declare:

```yaml
publish_events:
- name: Container redis started
  trigger: container-start
  data: ""
  subscriptions:
  - component: App
    container: freighter/counter
    action: start
```

Then in the freighter/counter container I declare:

```yaml
publish_events:
- name: Container freighter/counter started
  trigger: container-start
  data: ""
  subscriptions:
  - component: LB
    container: nginx
    action: start
```

**Bonus: I also want to make sure that my app is actually started before my on-premise dashboard
indicates that it is ready. We are going to use [Health Check](/docs/packaging-an-application/yaml-overview/#section-health-check)
functionality to accomplish this.**

By adding the following snippet I am able to tell Replicated that my app is ready when my load balancer
starts serving pages.
*Note: Replicated attempts the command for 10 minutes, after that time if the command has not succeeded
the app will be in a failed to start state*

```yaml
state:
  ready:
    command: http_status_code
    args:
    - http://{{repl ConfigOption "hostname"}}/assets/bootstrap.min.css
    - "200"
```

Thats it! I now have a app that will initialize in the correct order and knows when my app is ready so that my end customer knows when to start using it.

[Download Full Replicated YAML Example](https://github.com/replicatedhq/repl-yaml-samples/blob/master/apps/sequence-app-ready-check.yml).

