---
date: "2016-08-05T00:00:00Z"
lastmod: "2016-08-05T00:00:00Z"
title: "Domains Used by Replicated"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
kb-sections: ["Troubleshooting", "Delivering Replicated"]
---

Below is a list of domains that Replicated On-Prem will communicate with in non-airgap mode. All connections are made over TLS.

- get.replicated.com
- api.replicated.com
- registry.replicated.com
- quay.io
- get.docker.com
- *.docker.io, *.docker.com <sup>[1](#dockerio)</sup>

*<a name="dockerio">[1]</a> index.docker.io is the main URL for the Docker registry, however, we cannot provide an exact list of URLs as it has not been published by Docker.*

The following is a link to a repository hosting the IPs for all domains that Replicated controls.
https://github.com/replicatedhq/ips
