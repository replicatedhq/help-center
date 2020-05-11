---
date: "2020-05-11T12:00:00Z"
title: "KOTS"
description: "KOTS Replicated Classic customer support."
weight: "2705"
categories: [ "kots" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

[Replicated KOTS](https://kots.io/vendor/packaging/packaging-an-app/) provides software vendors with the tools they need to operationalize and scale the distribution of their Kubernetes application into enterprise environments. Similar to Replicated Classic, these tools include Kubernetes-native versions of release channels, customer license management, automated troubleshooting and a next-generation end-customer admin experience. KOTS applications can be installed into various environments and Kubernetes clusters, from airgapped, bare metal Kubernetes installs to managed offering such as EKS, GKE and AKS, and many options in between.

{{< linked_headline "KOTS Customer Synchronization" >}}

To help make the transition from Replicated Classic to [Replicated KOTS](https://kots.io/vendor/packaging/packaging-an-app/), Replicated allows for mapping Classic customer channels to KOTS channels. When a channel is mapped, Replicated will automatically synchronize all Classic customers to the mapped KOTS channel. KOTS will accept both KOTS license YAML files as well as Classic license RLI files for these customers. RLI files are not supported in airgapped environments.

**For access to this feature, please send us an email at [contact@replicated.com](mailto:contact@replicated.com) and we'll be happy to help.**

Replicated will synchronize all new and existing customers from the Classic application channel to the KOTS application channel. All changes made to properties of the customer will be maintained including those to Custom fields. Actions taken such as archiving and unarchiving the customer will be synchronized as well. The default channel of the Replicated Classic customer will be synchronized; multi-channel synchronization is not supported. Customers that originate from the KOTS application will not be synchronized. Changes made to properties of the KOTS customer that cannot be mapped, including Custom fields unique to the KOTS customer, will not be overridden by changes to the Classic customer.

{{< linked_headline "Mapped Customer Properties" >}}

The following properties will be mapped directly from the Classic customer to the KOTS customer:

| Property |
|----------|
| Customer name |
| Customer type |
| Expiration policy |
| Expiration date |
| Airgap Download Enabled |
