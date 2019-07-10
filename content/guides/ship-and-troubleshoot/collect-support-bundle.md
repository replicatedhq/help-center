---
date: "2019-07-08T12:00:00Z"
title: "Collecting a Support Bundle"
description: "A walkthrough of collecting a Support Bundle from your customer."
weight: "30206"
categories: [ "Ship and Troubleshoot" ]
index: "guides/ship-and-troubleshoot"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
nextPage: "fake-fake-fake"
---

{{< linked_headline "Collecting a Support Bundle" >}}

Now that you have deployed the Troubleshoot component and your Collect Spec alongside your Replicated Ship application, generating a support bundle is as simple as running the following command on your workstation or wherever you have access your cluster with kubectl:

```bash
POD="$(kubectl get pod -l run=troubleshoot --field-selector=status.phase=Running -o jsonpath='{.items[*].metadata.name}')" ; \
    kubectl exec -it $POD -- support-bundle generate --skip-default --no-upload -f /opt/collect.yml && \
    kubectl cp $POD:/out/supportbundle.tar.gz ./supportbundle.tar.gz
```

Running the command will generate a file `supportbundle.tar.gz` in the current directory from which you ran the above command. The bundle will include helpful debugging information from your customer's cluster.

It is recommended to include messaging in your Ship "lifecycle" step to help guide your customer in deploying the Troubleshoot component and collecting a Support Bundle.

```yaml
lifecycle:
  v1:
    - message:
        id: troubleshoot-outro
        contents: |
          ### Troubleshooting Info

          If you have `kubectl` configured locally, you can deploy troubleshoot by running:

            kubectl apply -f installer/k8s/troubleshoot/**

          You can later generate a troubleshoot support bundle by running the following command on your workstation or wherever you have access your cluster with kubectl:

            POD="$(kubectl get pod -l run=troubleshoot --field-selector=status.phase=Running -o jsonpath='{.items[*].metadata.name}')" ; \
                kubectl exec -it $POD -- support-bundle generate --skip-default --no-upload -f /opt/collect.yml && \
                kubectl cp $POD:/out/supportbundle.tar.gz ./supportbundle.tar.gz
```
