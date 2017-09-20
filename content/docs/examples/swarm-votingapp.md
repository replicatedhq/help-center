---
date: "2017-04-11T00:00:00Z"
title: "Docker Swarm Voting Application"
description: "The Docker Swarm Voting Application, in a Replicated YAML."
weight: "406"
categories: [ "Examples" ]
index: "docs"
tags: ["Application YAML", "Docker", "Swarm"]
---

## VotingApp
We've taken the standard Swarm voting example application and wrapped it in a Replicated YAML to show you how this would look.

```yaml
---
# kind: replicated

replicated_api_version: 2.4.2
name: "Compose Sample"

#
# https://www.replicated.com/docs/packaging-an-application/application-properties
#
properties:
  app_url: http://{{repl ConfigOption "hostname" }}:5000
  console_title: "Compose Sample"

#
# Settings screen
# https://www.replicated.com/docs/packaging-an-application/config-screen
#
config:
- name: hostname
  title: Hostname
  description: Ensure this domain name is routable on your network.
  items:
  - name: hostname
    title: Hostname
    value: '{{repl ConsoleSetting "tls.hostname"}}'
    type: text
    test_proc:
      display_name: Check DNS
      command: resolve_host


---
# kind: scheduler-swarm
version: "3"

services:

  redis:
    image: redis:3.2-alpine
    ports:
      - "6379"
    networks:
      - voteapp
    deploy:
      placement:
        constraints: [node.role == manager]

  db:
    image: postgres:9.4
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - voteapp
    deploy:
      placement:
        constraints: [node.role == manager]

  voting-app:
    image: gaiadocker/example-voting-app-vote:good
    ports:
      - 5000:80
    networks:
      - voteapp
    depends_on:
      - redis
    deploy:
      mode: replicated
      replicas: 2
      labels: [APP=VOTING]
      placement:
        constraints: [node.role == worker]

  result-app:
    image: gaiadocker/example-voting-app-result:latest
    ports:
      - 5001:80
    networks:
      - voteapp
    depends_on:
      - db

  worker:
    image: gaiadocker/example-voting-app-worker:latest
    networks:
      voteapp:
        aliases:
          - workers
    depends_on:
      - db
      - redis
    # service deployment
    deploy:
      mode: replicated
      replicas: 2
      labels: [APP=VOTING]
      # service resource management
      resources:
        # Hard limit - Docker does not allow to allocate more
        limits:
          cpus: '0.25'
          memory: 512M
        # Soft limit - Docker makes best effort to return to it
        reservations:
          cpus: '0.25'
          memory: 256M
      # service restart policy
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
      # service update configuration
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: continue
        monitor: 60s
        max_failure_ratio: 0.3
      # placement constraint - in this case on 'worker' nodes only
      placement:
        constraints: [node.role == worker]

networks:
    voteapp:

volumes:
  db-data:
```