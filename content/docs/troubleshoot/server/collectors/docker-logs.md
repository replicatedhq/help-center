---
date: "2018-03-03T04:02:20Z"
title: "Docker Logs Collector"
description: "The Copy File Custom Collector"
weight: "1705"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Docker Logs

Because most applications deployed in Replicated are running in Docker containers, a commonly used collector spec is the `docker.logs` collector. This will copy the output (stdout/etderr) from a docker container and include it in a support bundle.

This collector is fully documented in the [reference docs](/api/support-bundle-yaml-specs/docker-logs/).

### Example

To illustrate how to use this collector, we'll create a collector that will include the last 1000 lines from all nginx containers.

```yaml
collect:
  v1:
    - docker.logs:
        descriptino: Nginx docker container logs
        output_dir: /docker/logs/nginx
        timeout_seconds: 15
        container_list_options:
          All: true    # include stopped containers
          Filters:
            image: "nginx"
        container_log_options:
          Timestamps: true
          Tail: 1000    # only include 1000 lines
```

The above collector definition will include the logs for stdout and stderr in the /docker/logs/nginx directory for any container running from any tag of the "nginx" image.
