---
date: "2021-02-18T12:00:00Z"
title: "Docker Hub Rate Limiting"
description: "How to work around Docker Hub rate limiting"
weight: "710"
categories: [ "Manage Customer Installations" ]
index: ["docs/swarm", "docs"]
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

{{<legacynotice>}}

On November 20, 2020, rate limits anonymous and free authenticated use of Docker Hub went into effect. Anonymous and Free Docker Hub users are limited to 100 and 200 container image pull requests per six hours. Docker Pro and Docker Team accounts continue to have unlimited access to pull container images from Docker Hub.

For more information on rate limits, see [this article](https://www.docker.com/increase-rate-limits) from Docker.

Replicated can be configured to authenticate when pulling images to avoid rate limits.
These credentials are only used to increase limits and do not need access to any private repositories on Docker Hub.

The properties `DockerHubUsername` and `DockerHubPassword` can be set using the following [`replicatedctl`](/api/replicatedctl/replicatedctl_params_set/) commands: 

```bash
replicatedctl params set DockerHubUsername --value solomonhykes
```
```bash
replicatedctl params set DockerHubPassword --value passw0rd1
```

*NOTE: This document pertains to Replicated version 2.51.0 or greater. Replicated must be first manually upgraded a supported version. To manually upgrade, first `docker login` and follow the steps in [this guide](/docs/swarm/customer-installations/upgrading/).*
