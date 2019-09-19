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

Replicated deploys with the [Contour](https://github.com/heptio/contour) ingress controller, which runs in the `heptio-contour` namespace.
A NodePort service forwards incoming traffic on ports 80 and 443 to Contour through every node in your cluster.

The Contour ingress controller supports a variety of [options through annotations](https://github.com/heptio/contour/blob/master/docs/annotations.md).
These options may not be supported in all your customers' cloud environments with different ingress controller implementations.

{{< linked_headline "Ingress with TLS Termination on Contour" >}}

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
  - "myapp.somebigbank.internal"
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
type: kubernetes.io/tls
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
    - myapp.somebigbank.internal
  backend:
    serviceName: frontend
    servicePort: 80
  rules:
  - host: myapp.somebigbank.internal
    http:
      paths:
      - path: /
        backend:
          serviceName: frontend
          servicePort: 80
```

{{< linked_headline "Ingress with Upstream TLS on Contour" >}}

Add the `contour.heptio.com/upstream-protocol.tls` annotation to the Service specified in your Ingress to enable TLS on requests from Envoy to your application.

```yaml
---
# kind: replicated
cmds:
- name: cert_out
  cmd: cert
  args:
  - "2048"
  - "myapp.somebigbank.internal"
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
type: kubernetes.io/tls
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
    - myapp.somebigbank.internal
  backend:
    serviceName: nginx
    servicePort: 443
  rules:
  - host: myapp.somebigbank.internal
    http:
      paths:
      - path: /
        backend:
          serviceName: nginx
          servicePort: 443
---
#kind: scheduler-kubernetes
apiVersion: "v1"
kind: ConfigMap
metadata:
  name: nginx-conf
data:
  default.conf: |
    server {
      listen 0.0.0.0:443;
      server_name nginx;

      ssl on;
      ssl_certificate /opt/certs/server.cert;
      ssl_certificate_key /opt/certs/server.key;

      location / {
        return 200 'OK';
      }
    }
---
# kind: scheduler-kubernetes
apiVersion: v1
kind: Service
metadata:
  name: nginx
  labels:
    app: nginx
  annotations:
    contour.heptio.com/upstream-protocol.tls: "443"
spec:
  ports:
  - name: https
    port: 443
    protocol: TCP
  selector:
    app: nginx
---
#kind: scheduler-kubernetes
apiVersion: "apps/v1"
kind: Deployment
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - name: https
          containerPort: 443
          protocol: TCP
        volumeMounts:
        - name: tls
          mountPath: /opt/certs
          readOnly: true
        - name: nginx-conf
          mountPath: /etc/nginx/conf.d
      volumes:
      - name: tls
        secret:
          secretName: tls
          items:
          - key: tls.crt
            path: server.cert
          - key: tls.key
            path: server.key
      - name: nginx-conf
        configMap:
          name: nginx-conf
```
