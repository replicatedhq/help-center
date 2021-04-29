---
date: "2021-02-18T12:00:00Z"
title: "Docker Hub Rate Limiting"
description: "How to work around Docker Hub rate limiting"
weight: "2721"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{<kotsdocs>}}
For KOTS documentation, check out [kots.io](https://kots.io/vendor).
{{</kotsdocs>}}

On November 20, 2020, rate limits anonymous and free authenticated use of Docker Hub went into effect. Anonymous and Free Docker Hub users are limited to 100 and 200 container image pull requests per six hours. Docker Pro and Docker Team accounts continue to have unlimited access to pull container images from Docker Hub.

For more information on rate limits, see [this article](https://www.docker.com/increase-rate-limits) from Docker.

The properties `DockerHubUsername` and `DockerHubPassword` can be set in the `/etc/replicated.conf` file on the host to configure Replicated to authenticate when pulling images to avoid rate limits. These credentials are only used to increase limits and do not need access to any private repositories on Docker Hub.

```json
{
    "DockerHubUsername": "solomonhykes",
    "DockerHubPassword": "passw0rd1"
}
```

The Replicated service must be restarted after adding credentials to this file.

```bash
kubectl delete pod -l app=replicated -l tier=master
```

*NOTE: This document pertains to Replicated version 2.51.0 or greater. Replicated must be first manually upgraded a supported version. To manually upgrade, first `docker login` and follow the steps in [this guide](/docs/swarm/customer-installations/upgrading/).*
