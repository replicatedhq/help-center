+++
date = "2017-09-01T00:00:00Z"
lastmod = "2017-09-01T00:00:00Z"
title = "How to change Private IP Address on a Host"
weight = "999999"
categories = [ "Knowledgebase", "Supporting Your Customers" ]
+++

If host's private IP address is modified, Replicated will be unable to start and will require manual reconfiguration.
Private IP address is defined in two configuration files: `replicated` and `replicated-operator`

RHEL/CentOS file location: `/etc/sysconfig` 

Ubuntu/Debian file location: `/etc/default/`

### Changing Private IP:

In `replicated` config only one value needs to be modified with new IP address: `PRIVATE_ADDRESS`

```shell
cat /etc/sysconfig/replicated
RELEASE_CHANNEL=beta
PRIVATE_ADDRESS=10.138.0.2
SKIP_OPERATOR_INSTALL=0
REPLICATED_OPTS="-e LOG_LEVEL=info -e DAEMON_TOKEN=CgxLAnVRZcYH2Hl5Hjj6W265PyYVfG4u -e NODENAME=replicated"
```

In `replicated-operator` config three values need to be modified with new IP address: `DAEMON_ENDPOINT`, `DAEMON_HOST`, and `PRIVATE_ADDRESS`

```shell
cat /etc/sysconfig/replicated-operator
RELEASE_CHANNEL=beta
DAEMON_ENDPOINT=10.138.0.2:9879
DAEMON_TOKEN=CgxLAnVRZcYH2Hl5Hjj6W265PyYVfG4u
DAEMON_HOST=10.138.0.2
PRIVATE_ADDRESS=10.138.0.2
REPLICATED_OPERATOR_OPTS="-e LOG_LEVEL=info -e TAGS=local -e NODENAME=replicated"
```

After IP address is changed `replicated` and `replicated-operator` service will need to be restarted.

Ubuntu/Debian:
```shell
service replicated restart
service replicated-operator restart
```

RHEL:
```shell
systemctl restart replicated
systemctl restart replicated-operator
```
