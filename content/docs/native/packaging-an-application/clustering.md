---
date: "2016-07-03T04:02:20Z"
title: "Clustering"
description: "An implementation guide for using the Replicated built in clustering functionality."
weight: "207"
categories: [ "Packaging an Application" ]
tags: [ "Application YAML", "Clusters" ]
index: "docs"
---

By default Replicated will start one instance per component and container in your application on a single host. With the addition of clustering your application can optionally leverage multiple hosts as well as multiple instances per host.

*See an example of setting up a Cassandra Cluster with Replicated [here](/docs/kb/developer-resources/multi-node-cassandra/)*

{{< linked_headline "Host Count" >}}

The application can be scaled horizontally at the component level by specifying host counts using the *cluster_host_count* property. The *cluster* property is required to enable this feature. When clustering is enabled, all containers that are members of the respective component will be allocated across the cluster to a minimum of *min* nodes and a maximum of *max* or *0* for unlimited.
```yaml
components:
- name: App
  cluster: true
  cluster_host_count:
    min: 2
    max: 4
  ...
```

In the example above, a minimum of 2 hosts will be required for the application to start. Replicated will start a single instance for each container that is a member of the App component on a minimum of 2 (and up to 4 hosts) as nodes are added to the cluster.

{{< linked_headline "Tags" >}}

In addition to specifying counts, components can be tagged for more powerful orchestration on multi-host installations. Nodes within the cluster must be tagged at runtime, allowing the customer to specify where each component of the application will be deployed across the cluster. Components can also be tagged with conflicting tags. Replicated will prevent conflicting components from being allocated on the same node.

```yaml
components:
- name: App
  tags:
  - app
  conflicts:
  - lb
  cluster: true
  ...
```

{{< linked_headline "Instance Count" >}}

Replicated can also vertically scale the application on a single host at the container level by specifying instance counts using the *cluster_instance_count* property. The *cluster* property is required to enable this feature.

```yaml
components:
- name: App
  ...
  cluster_host_count:
    min: 2
  containers:
  - source: public
    image_name: freighter/worker
    ...
    cluster: true
    cluster_instance_count:
      initial: 3
```

In the example above at least 2 hosts are required. 3 instances of the freighter/worker container will be started on each of these 2 hosts.

{{< linked_headline "Templates" >}}

The cluster property for both components and containers can be templatized. The template function must be parsable as a boolean. In addition, each of the properties of *cluster_host_count* and *cluster_instance_count* can be templatized. In this case the template function must be parsable as an unsigned integer. This was introduced in Replicated {{< version version="2.8.0" >}}.
