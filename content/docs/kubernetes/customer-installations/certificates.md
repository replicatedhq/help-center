---
date: "2020-04-17T12:00:00Z"
title: "Managing Certificates for Kubernetes Components"
description: "Details on how certs are generated and rotated"
keywords: "installing, certifcates"
weight: "2718"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
aliases: [docs/distributing-an-application/installing-on-kubernetes]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{<kotsdocs>}}
To learn about how KOTS and kURL handle certificate rotation, check out the [kurl.sh docs on TLS Certificates](https://kurl.sh/docs/install-with-kurl/setup-tls-certs#kubernetes-control-plane).
{{</kotsdocs>}}

Certificates used by Kubernetes control plane components such as the Kubernetes API server have a lifetime of 1 year.
Replicated has several mechanisms to ensure these certificates are rotated before they expire.

{{< linked_headline "Automatic Rotation" >}}

Replicated 2.43+ provides automatic certificate rotation for the Kubernetes control plane.
Replicated will schedule a Job on each primary Node once a week to check the expiry of certificates in `/etc/kubernetes`.
If a Node is found to have any certificate expiring in less than 100 days, all certificates on that Node will be rotated.
No Job is scheduled on secondary nodes because the kubelet is able to automatically rotate its own certificate before it expires.
(The kubelet is the only Kubernetes component running on secondary nodes that uses a certificate.)
These weekly certificate rotation Jobs and their Pods will be automatically deleted after completion unless there is a failure or the Replicated log level is set to "debug".
The default weekly schedule can be changed by setting the `KubernetesCertRotationSchedule` param to a different cron expression and restarting the Replicated pod.

On the first node where the Replicated install script was run there is a known issue where the kubelet will continue to use the certificate generated during installation rather than its automatically renewed certificate.
The certificate rotation Job will check for this issue and fix `/etc/kubernetes/kubelet.conf` to point to the renewed certificates.

{{< linked_headline "Rotation During Upgrade" >}}

All certificates are automatically upgraded whenever the Replicated install script is re-run and triggers an [upgrade](/docs/kubernetes/customer-installations/installing/#compatible-kubernetes-versions) of the installed version of Kubernetes.
For example, upgrading Replicated from 2.37.1 to 2.38.0 would upgrade Kubernetes from 1.13.5 to 1.15.3, which would cause all certificates to be rotated.


{{< linked_headline "Manual Rotation" >}}

Use the following commands on all primary nodes to monitor and rotate certificates as needed:

```bash
kubeadm alpha certs check-expiration
```
```bash
kubeadm alpha certs renew all
```
