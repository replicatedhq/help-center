---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: An `amazon_eks` asset generates a terraform file that will create an Amazon EKS Cluster.
index: docs
title: amazon_eks
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle)

## amazon_eks

An `amazon_eks` asset generates a terraform file that will create an Amazon EKS Cluster.

It also populates a template function `AmazonEKS` that takes the name of the cluster and returns the path to the generated kubeconfig for the cluster. This template function is only valid after the asset has been generated as part of the `render` lifecycle step, but can be used by later assets within that step. The file itself is created when the generated terraform is applied, whether by the `terraform` lifecycle step or otherwise. This is intended to be used within the [kubectlApply](/api/ship-lifecycle/kubectlapply/) lifecycle step.



### Required Parameters


- `autoscaling_groups` - Autoscaling groups to include in your EKS cluster

    required:

  - `group_size` - The number of instances to be included in the group

  - `machine_type` - The AWS instance type to use within the group

  - `name` - The name to give the created autoscaling group


- `cluster_name` - The name of the created EKS cluster


- `region` - The AWS region to build the cluster in. At time of writing, AWS supports EKS in us-east and us-west



### Optional Parameters


- `created_vpc` - The VPC to create for the EKS cluster

    required:

  - `private_subnets` - The private subnets to create within the VPC. All workers will be placed on these subnets

  - `public_subnets` - The public subnets to create within the VPC

  - `vpc_cidr` - The CIDR to use for this VPC

  - `zones` - The availability zones to create subnets within


- `dest` - The path within `installer/` to place the generated file. Defaults to `amazon_eks.tf`


- `existing_vpc` - The existing VPC to use for the EKS cluster

    required:

  - `private_subnets` - The private subnets to use within the VPC. All workers will be placed on these subnets

  - `public_subnets` - The public subnets to use within the VPC

  - `vpc_id` - The ID of the existing VPC to use


- `mode` - Ignored


- `when` - This asset will be included when 'when' is omitted or true


### Examples

```yaml
assets:
  v1:
    - amazon_eks:
        cluster_name: existing-vpc-cluster
        region: us-east-1
        existing_vpc:
          vpc_id: abc123
          public_subnets:
            - abc123-1
            - abc123-2
          private_subnets:
            - xyz789-1
            - xyz789-2
        autoscaling_groups:
          - name: group1
            group_size: '2'
            machine_type: m5.large
          - name: group2
            group_size: '1'
            machine_type: t2.large
```

```yaml
assets:
  v1:
    - amazon_eks:
        cluster_name: new-vpc-cluster
        region: us-west-2
        created_vpc:
          zones:
            - us-west-2a
            - us-west-2b
          vpc_cidr: 10.0.0.0/16
          public_subnets:
            - 10.0.1.0/24
            - 10.0.2.0/24
          private_subnets:
            - 10.0.129.0/24
            - 10.0.130.0/24
        autoscaling_groups:
          - name: firstgroup
            group_size: '3'
            machine_type: m5.large
```
