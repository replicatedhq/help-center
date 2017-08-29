+++
date = "2017-08-29T00:00:00Z"
lastmod = "2017-08-29T00:00:00Z"
title = "Airgap Intermediate Version Error"
weight = "999999"
categories = [ "Knowledgebase", "Supporting Your Customers" ]
+++

Below is an example of an Airgap installation failing due to missing intermediate verion(s) in a required build. The best way to resolve this issue would be to create a new license and and Airgap package as outlined in this [documentation](https://help.replicated.com/docs/distributing-an-application/airgapped-installations/)
```shell
docker logs replicated
ERROR 2016/08/26 20:55:05 airgap/airgap.go:224 No Major.Minor.Patch elements found
ERROR 2016/08/26 20:55:05 premkit/log/gin.go:52 [GIN] 500 | 33.939218035s |  | POST    /v0.1/license/airgap
```