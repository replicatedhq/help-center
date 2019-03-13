---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: An `azure_aks` asset generates a terraform file that will create an Azure AKS Cluster.
index: docs
title: azure_aks
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle)

## azure_aks

An `azure_aks` asset generates a terraform file that will create an Azure AKS Cluster.

It also populates a template function `AzureAKS` that takes the name of the cluster and returns the path to the generated kubeconfig for the cluster. This template function is only valid after the asset has been generated as part of the `render` lifecycle step, but can be used by later assets within that step. The file itself is created when the generated terraform is applied, whether by the `terraform` lifecycle step or otherwise. This is intended to be used within the [kubectlApply](/api/ship-lifecycle/kubectlapply/) lifecycle step.



### Required Parameters


- `cluster_name` - The name of the cluster.


- `location` - The location of the resource group specified in resource_group_name


- `node_count` - The number of nodes to create in the cluster


- `node_type` - The size of VM to create for each node in the cluster


- `resource_group_name` - The name of a resource group within the subscription specified in subscription_id


- `service_principal_id` - The Application ID of a registered application.


- `service_principal_secret` - A key associated with a registered application.


- `subscription_id` - An Azure subscription ID


- `tenant_id` - The tenant ID, also known as Directory ID, from Azure Active Directory



### Optional Parameters


- `description` - A description for the cluster.


- `dest` - The path within `installer/` to place the generated file. Defaults to `azure_aks.tf`


- `disk_gb` - The size of the disk the the operating system will be installed on for each node in the cluster


- `kubernetes_version` - The cluster version to create


- `mode` - Ignored


- `public_key` - Enables SSH access to the nodes in the cluster with the corresponding private key


- `when` - This asset will be included when 'when' is omitted or true


### Examples

```yaml
assets:
  v1:
    - azure_aks:
        tenant_id: 5c87f096-eafc-41e1-82f3-1d2282887dff
        subscription_id: 75cfa510-7123-4812-89bb-fc0286968bf5
        service_principal_id: 651ed514-6d89-4e51-adaf-c3d3f6dac5a3
        service_principal_secret: hvS/lhixCYsPxXgFt04Ilj14NLU4o8LOAIDSAktrwbo=
        resource_group_name: DefaultResourceGroup-EUS
        location: East US
        kubernetes_version: v1.11.2
        cluster_name: AKS cluster
        public_key: >-
          ssh-rsa
          AAAAB3NzaC1yc2EAAAADAQABAAAAgQDdEcdAqClaNZdHAGHhiSBobJo5ZUL3sDfrZbBQinLvx3HN/9UaXp5mimlzhUkUQwX4jPqJ78w52idmXItd55HVboSQ8uKaRicgLLaNhSqrNpb+W3k2RToRPsjuaCi6a8XET0kcma6NaIbae9n0+nKzTtadX/hkrPEMS56BYpnHjQ==
          user@example.com
        node_count: '3'
        node_type: Standard_D1_v2
        disk_gb: '50'
```
