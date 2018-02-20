---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Instance Reporting"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: ["Replicated Vendor"]
---

## Swarm on AWS

By default, we recommend using the `172.31.0.0/16` CIDR range to take advantage using Docker Swarm overlay networks on a VPC. Customers using `10.0.0.0/16` will need to set a different subnet for the Docker Swarm overlay network.
