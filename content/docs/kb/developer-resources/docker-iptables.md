---
date: "2016-10-05T00:00:00Z"
lastmod: "2016-10-05T00:00:00Z"
title: "Docker IPTables and the No-Chain Error"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Docker"]
---

When Docker starts it registers a DOCKER chain into iptables to allow communication between ports exposed on the
containers it manages.

The iptables chain can be verified by running `iptables -L` (Replicated 2.0 install shown here)

```
# iptables -L
...
Chain DOCKER (1 references)
target     prot opt source               destination         
ACCEPT     tcp  --  anywhere             172.17.0.2           tcp dpt:9879
ACCEPT     tcp  --  anywhere             172.17.0.2           tcp dpt:9878
ACCEPT     tcp  --  anywhere             172.17.0.2           tcp dpt:9877
ACCEPT     tcp  --  anywhere             172.17.0.2           tcp dpt:9876
ACCEPT     tcp  --  anywhere             172.17.0.2           tcp dpt:9875
ACCEPT     tcp  --  anywhere             172.17.0.2           tcp dpt:9874
ACCEPT     tcp  --  anywhere             172.17.0.3           tcp dpt:8800

Chain DOCKER-ISOLATION (1 references)
target     prot opt source               destination         
RETURN     all  --  anywhere             anywhere 
```

During development if you delete the DOCKER chain or the iptables rules get dropped (e.g. by a restart of 
firewalld) Docker will start logging iptables errors such as "failed programming external connectivity ... 
iptables: No chain/target/match by that name".

To resolve simply restart Docker and the correct iptables rules will be created.

