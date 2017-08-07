---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Networking Setup"
weight: "999999"
categories: [ "Knowledgebase", "Supporting Your Customers" ]
index: "docs"
---

Enterprise customers frequently run iptables on their servers. If you need a quick
refresher on iptables, take a look at this quick [tutorial](http://www.howtogeek.com/177621/the-beginners-guide-to-iptables-the-linux-firewall/).
Most installations of iptables have a default rule to deny traffic unless otherwise
allowed. This will often prevent your containers from connecting to each other. You
obviously don't want this, but the customer environment is defaulting to deny everything.

## Avoiding trouble with iptables

We want to help you avoid this problem on the next installation by clearly communicating
this requirement to your customers. Most
[installation documentation](https://support.replicated.com/hc/en-us/articles/216652467-Customer-Facing-Installation-Instructions)
lists the ports that must be opened between the users and the server network, but not
internally. A common approach is to list the installation requirements like this:

```
- at least 8 cores and 16 GB of RAM
- inbound access to ports 8800, 80 and 443
- 250GB of SSD storage
```

To avoid iptables troubles, add a new bullet point to your requirements:

```
- internal communication on ports 3306, 6379 and 11211 on the server
```

This will help prepare your customer for the installation.

Your customer won't want to open a Postgres or Redis port to everything and it's a good
practice to allow them to write the most restrictive iptables rules possible. If all of
your containers run on a single host, the Replicated YML has the ability to define some
services to bind only to the `docker0` interface, which generally isn't routable off of
the single server. But this interface is still subjected to the iptables rules, and still
must be configured. Often, customers will be more willing to change iptables rules on
the `docker0` interface than they would be to change them on the eth0 interface. When
you bind only to the `docker0` interface, the ports won't be available to port scan and
other vulnerability scans that will inevitably be run against your installation.

## Detecting iptables trouble

Sometimes when your customer installs your software, things don't work as well as they
have in all of your tests. Knowing how to troubleshoot to diagnose and quickly resolve
the problem is important. At Replicated, our goal is to make all of your installations
painless and successful, but there's one piece that we can't control – the customer's
environment.

Most networking problems present themselves early during an installation. If your
containers appear to start and die quickly or Replicated won't successfully start your
app but instead shows a message like this on the dashboard:

![Port Timeout](/static/port-timeout.png)

it's very possibly a networking problem. This is one of the easiest things to troubleshoot
and resolve, once you have some tools ready.

# Basic Troubleshooting

## Support Bundle

As always, the first place to start is by requesting a support bundle and examining it. You'll
want to look at the docker stdout/stderr for your containers, and see if you are having a
communication problem between them. For example, if postgres is part of your stack, you
might find a message like this in your api container:

```shell
psql: could not connect to server: Connection refused Is the server running on host host.domain.com and accepting TCP/IP connections on port 5432?
```

But it's weird, because you see postgres running. The container is there. You can even see port 5432
listening in the `netstat` output of the host in the support bundle. Why can't this other container
establish a connection?

## iptables

It's almost always iptables.

### Ad-hoc commands to confirm it's iptables

On one recent troubleshooting session, the customer didn't know if iptables might be causing the
problem. So we decided to test connectivity on docker0. It went something like this:

**Customer**: The app won't start. It says “Error waiting for ports to enter listening state”.  
**Vendor**: Can you send us a support bundle?  
*[pause for time to examine support bundle]*  
**Vendor**: Ok, I see that our rails app can't connect to our MongoDB container. What's the ip address of the docker0 interface on this server?  
**Customer**: echo $(ip addr | grep docker0 -A5 | grep "inet " | head -n1 | cut -d "" -f3,2 | awk '{ print $2}' | cut -d "/" -f1,1) says it's 172.17.0.5.  
**Vendor**: Uh, great? Can you try telnet 172.17.0.5 27017?  
**Customer**: It connects. MongoDB is definitely listening.  
**Vendor**: Ok, can you try to connect from inside a container too? Run docker run -it ubuntu /bin/bash and you'll get a # prompt. Run the same telnet command in there.  
**Customer**: It cannot connect from there. Ah. Let me edit my iptables ruleset.  

Now the customer has a very simple, reproducible environment that doesn't have the complexity of your
config files and envvars and everything else. They can simply change iptables and run the failing telnet
command until iptables is allowing the traffic.

### Keep it updated

This problem will creep back up any time a new port is opened, or a new cache/database is used, or any
architecture change is deployed. The final step is to make sure you have a process to keep this
documentation current.

One idea we really like is to test your Replicated deployments on a server with iptables enabled. When
you add a new component or connection, it will fail until you edit the iptables configuration. This
will remind you to keep your docs updated and communicate the new port to your customers.
