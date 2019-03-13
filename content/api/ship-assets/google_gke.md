---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: A `google_gke` asset generates a terraform file that will create a Google GKE Cluster.
index: docs
title: google_gke
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/overview) | [Config](/api/ship-config/overview) | [Lifecycle](/api/ship-lifecycle/overview)

## google_gke

A `google_gke` asset generates a terraform file that will create a Google GKE Cluster.

It also populates a template function `GoogleGKE` that takes the name of the cluster and returns the path to the generated kubeconfig for the cluster. This template function is only valid after the asset has been generated as part of the `render` lifecycle step, but can be used by later assets within that step. The file itself is created when the generated terraform is applied, whether by the `terraform` lifecycle step or otherwise. This is intended to be used within the [kubectlApply](/api/ship-lifecycle/kubectlapply/) lifecycle step.



### Required Parameters


- `cluster_name` - The name of the cluster.



### Optional Parameters


- `additional_zones` - A comma separated list of additional Google Compute Engine locations in which the cluster's nodes should be located. If additional zones are configured, the number of nodes specified in initial_node_count is created in all specified zones.


- `credentials` - Base64 encoded contents of a file that contains your service account private key in JSON format.


- `dest` - The path within `installer/` to place the generated file. Defaults to `google_gke.tf`


- `initial_node_count` - The number of nodes to create in this cluster (not including the Kubernetes master). Defaults to 3.


- `machine_type` - The name of a Google Compute Engine machine type. Defaults to n1-standard-1.


- `min_master_version` - The minimum version of the master. GKE will auto-update the master to new versions, so this does not guarantee the current master version--use the read-only master_version field to obtain that. If unset, the cluster's version will be set by GKE to the version of the most recent official release (which is not necessarily the latest version).


- `mode` - Ignored


- `project` - The ID of the project to apply any resources to.


- `region` - The region to operate under, if not specified by a given resource.


- `when` - This asset will be included when 'when' is omitted or true


- `zone` - The zone that the master and the number of nodes specified in initial_node_count should be created in.


### Examples

```yaml
assets:
  v1:
    - google_gke:
        credentials: <BASE64 ENCODED STRING>
        project: my-project
        region: us-east
        cluster_name: cluster-with-all-options
        zone: us-east1-b
        initial_node_count: '5'
        machine_type: n1-standard-4
        additional_zones: 'us-east1-c,us-east1-d'
        min_master_version: 1.10.6-gke.1
```
