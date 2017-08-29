+++
date = "2017-08-29T00:00:00Z"
lastmod = "2017-08-29T00:00:00Z"
title = "Choosing an IP Address"
weight = "999999"
categories = [ "Knowledgebase", "Supporting Your Customers" ]
+++

Replicated will give you the option to choose between the IP address of the primary network interface (normally eth0) and docker0 which is a virtual Ethernet bridge that automatically forwards packets between attached network interfaces. When using [Replicated's Clustering](https://help.replicated.com/docs/packaging-an-application/clustering/) option the interface docker0 can not be used because connectivity will not be provided to other host running Replicated.

Here is a list of private network IP address ranges that your network interface is likely to have:

```shell
192.168.0.0 - 192.168.255.255 (65,536 IP addresses)
172.16.0.0 - 172.31.255.255 (1,048,576 IP addresses)
10.0.0.0 - 10.255.255.255 (16,777,216 IP addresses)
If there is only a single host running the application and any required containers the interface docker0 can be used.
```