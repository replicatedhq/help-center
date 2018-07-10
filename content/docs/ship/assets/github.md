---
date: "2018-05-02T01:19:20Z"
title: "GitHub"
description: "Deliver assets from private or public GitHub repositories"
weight: "41006"
categories: [ "Ship Assets" ]
index: false
icon: "replicatedShip"
gradient: "console"
hideFromList: true
---

{{< linked_headline "GitHub Asset Type" >}}

GitHub assets can be used to pull content from private or public GitHub repositories. With a GitHub asset, you can deliver any or all of:

- An entire repository
- A directory in a repository
- A single file from a repository

{{< linked_headline "Delivering Assets from Private Repositories" >}}

To deliver an asset from a private github repository, you'll need to install the [Replicated GitHub Application](https://github.com/apps/replicated) into your organization
and give it access to the repositories you'd like to deliver.


{{< linked_headline "Delivering a Single File" >}}

The following example will create a `rook-operator.yml` from [the rook examples repository](https://github.com/rook/rook/blob/master/cluster/examples/kubernetes/ceph/operator.yaml) on the installer's workstation, as well as a script to deploy the operator to an existing Kubernetes cluster.

```yaml
assets:
  v1:
    - github:
        dest: rook-operator.yml
        repo: rook/rook
        ref: 82425aafcc96b6b5e2673fe82dff86a157f806bd
        path: cluster/examples/kubernetes/ceph/operator.yaml

    - inline:
        dest: install.sh
        mode: 0755
        contents: |
          #!/bin/bash
          kubectl apply -f installer/k8s/rook-operator.yml
```

{{< linked_headline "Delivering a directory" >}}

The following example will pull the `guestbook` example from [the kubernetes examples repository](https://github.com/kubernetes/examples/tree/master/guestbook) on the installer's workstation, as well as a script to deploy the guestbook application to an existing Kubernetes cluster.

```yaml
assets:
  v1:
    - github:
        dest: k8s/
        repo: kubernetes/examples
        ref: master
        path: guestbook/

    - inline:
        dest: install.sh
        mode: 0755
        contents: |
          #!/bin/bash
          kubectl apply -f installer/k8s/guestbook/
```
