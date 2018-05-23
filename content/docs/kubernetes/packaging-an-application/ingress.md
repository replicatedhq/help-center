---
date: "2016-07-03T04:02:20Z"
title: "Ingress Controllers"
description: "An overview of the various sections of the Replicated YAML."
weight: "2602"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{< linked_headline "Ingress Controllers" >}}

If your application contains [Kubernetes Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/), this may require some changes to be compatible with Replicated. Ingress resources are unique in Kubernetes because a cluster must have a functional ingress controller running before an ingress resource type can be deployed.

{{< linked_headline "Ingress in the Cloud" >}}

When running Kubernetes in a cloud provider or in a managed Kubernetes stack such as GKE or Azure Container Service, the cloud provider often deploys and configures an ingress controller into every cluster automatically. These are propietary controllers that make use of the other infrastructure components offered by the cloud provider. For example, a GKE cluster has an ingress controller that will automatically provision a Google Cloud Load Balancer with an external IP address.

{{< linked_headline "Ingress in the Replicated Appliance" >}}

Replicated ships with the [Contour](https://github.com/heptio/contour) ingress controller, which runs as a DaemonSet in the `heptio-contour` namespace.
A NodePort service forwards incoming traffic on ports 80 and 443 to Contour through every node in your cluster.

The Contour ingress controller supports a variety of [options through annotations](https://github.com/heptio/contour/blob/master/docs/annotations.md).
These options may not be supported in all your customers' cloud environments with different ingress controller implementations.

{{< linked_headline "Ingress with TLS on Contour" >}}

To configure Contour to serve HTTPS requests on port 443, first define a Secret in your yaml that contains a certificate and private key.
This certificate may come from a file uploaded on the customer's config screen or can be generated with the `cert_out` command as shown below.

Contour uses Envoy's SNI feature to provide TLS support.
This requires that your certificate be associated with a valid host domain name (not an IP address) and the hostname appears in the ingress's `spec.tls.hosts` and `spec.rules.host` fields as shown below.

```yaml
---
# kind: replicated
cmds:
- name: cert_out
  cmd: cert
  args:
  - "2048"
  - "newbravo.replicated.com"
config:
- name: HiddenCertValues
  items:
  - type: file
    name: newcert_privatekey
    hidden: true
    data_cmd:
      name: cert_out
      value_at: 0
  - type: file
    name: newcert_cert
    hidden: true
    data_cmd:
      name: cert_out
      value_at: 1
  - type: file
    name: newcert_ca
    hidden: true
    data_cmd:
      name: cert_out
      value_at: 2
---
# kind: scheduler-kubernetes
apiVersion: v1
kind: Secret
metadata:
  name: tls
data:
  tls.crt: '{{repl ConfigOptionData "newcert_cert" | Base64Encode }}'
  tls.key: '{{repl ConfigOptionData "newcert_privatekey" | Base64Encode }}'
---
# kind: scheduler-kubernetes
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: backend
spec:
  tls:
  - secretName: tls
    hosts:
    - newbravo.replicated.com
  rules:
  - host: newbravo.replicated.com
    http:
      paths:
      - path: /
        backend:
          serviceName: frontend
          servicePort: 80
```
