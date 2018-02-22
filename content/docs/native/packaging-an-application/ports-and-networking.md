---
date: "2016-07-03T04:02:20Z"
title: "Ports / Networking"
description: "Defining containers exposed ports and container-to-container communication"
weight: "205"
categories: [ "Packaging a Native Application" ]
index: "docs/native"
icon: "replicatedCircle"
---

{{< linked_headline "Ports" >}}

The Replicated Native Scheduler does not ship with an overlay network. All container-to-container communcation has to occur on the host networking stack.

All ports listed in the Dockerfile with the EXPOSE directive will be automatically exposed when started. The Docker runtime will choose a random port, ensuring that there are no conflicts. If you need to specify a specific public (host) port, you can list it here.

Common examples of when it is necessary to list an exposed port are for web server containers, or servers which have clients that are incapable of discovering dynamic port mappings.

Port mappings support the Replicated template library.

We can use the ports property to expose a container's port (private_port) and bind it to the host (public_port). The when property allows us to conditionally expose and bind that port when some prior condition is satisfied. Use the interface property to force the public port to be bound on a specific network interface. The public_port property is optional as of {{< version version="2.8.0" >}} allowing a port to be exposed but not bound.

```yaml
    ports:
    - private_port: "80"
      public_port: "80"
      port_type: tcp
      when: '{{repl ConfigOptionEquals "http_enabled" "1" }}'
    - private_port: "443"
      public_port: "443"
      interface: eth0
      port_type: tcp
      when: '{{repl ConfigOptionEquals "https_enabled" "1" }}'
```

