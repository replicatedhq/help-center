---
date: "2016-07-22T00:00:00Z"
lastmod: "2016-07-22T00:00:00Z"
title: "Docker Links"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Application YAML", "Docker"]
---

In the earlier releases of Docker, there was a concept of [container linking](https://docs.docker.com/engine/userguide/networking/default_network/dockerlinks/). This has been deprecated in recent versions of Docker, but some Docker Compose YAMLs may still reference them. If you are dependent on the legacy Docker links to deploy your application, it's possible to use the `extra_hosts` option in Replicated to simulate this and deploy your containers without any changes.

For example, let's take a basic Docker compose snippet that has an API container and Redis container, and is using links to connect the two. The docker-compose might look like:

```yaml
redis:
  image: redis:latest
api:
  image: 'mycompany/api:latest'
  links:
    - redis
```

Converting this to Replicated YAML:

```yaml
components:
  - name: Redis
    containers:
      - source: public
        image_name: redis
        version: "latest"
        ports:
          - private_port: "6379"
            public_port: "6379"
            interface: "docker0"
        publish_events:
          - name: Redis started
            trigger: container-start
            subscriptions:
              - component: API
                container: mycompany/api
                action: start

  - name: API
    containers:
      - source: dockerhub
        image_name: mycompany/api
        extra_hosts:
          - hostname: redis
            address: '{{repl ThisNodeDockerAddress }}'
```
