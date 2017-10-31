---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Creating a Multi-Node Cassandra Cluster"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Nodes", "Clusters"]
---

It is critical for some of our vendor's applications to offer a Highly Available (HA) solution to their
customers. Hardware fails, plugs get disconnected but your application must do its best to stay running!

In this article I am going to set up a [Cassandra](http://cassandra.apache.org/) cluster that runs on
3 physical hosts with replication. With this setup a host can be completely lost and a new host can
replace it with 0 data loss.

## Step 1: Create Cassandra Component with a Tag and Host Count

```yaml
components:
- name: Cassandra
  tags:
  - cassandra
  cluster: true
  cluster_host_count:
    min: 2
    max: 3
```

- First we create our [tags](/docs/packaging-an-application/clustering/#tags), these will be used in the Replicated on-prem UI to assign this component to the desired hosts. Each host that gets tagged with a cassandra tag will run this component.

![Cassandra Tags](/images/post-screens/cassandra-tags.png)

- We then set `cluster` to `true` to tell Replicated that we will be running in a clustered fashion and set `min` and `max` nodes.

## Step 2: Set up the container

```yaml
  containers:
  - source: public
    image_name: cassandra
    display_name: cassandra
    ephemeral: false
    version: 2.1.12
    restart:
      policy: always
    volumes:
    - host_path: /opt/cassandra-data-volume/data
      container_path: /var/lib/cassandra/data
    - host_path: /opt/cassandra-data-volume/commitlog
      container_path: /var/lib/cassandra/commitlog
    - host_path: /var/log/testapp/cassandra
      container_path: /var/log/cassandra
    env_vars:
    - name: CASSANDRA_BROADCAST_ADDRESS
      value: '{{repl ThisNodePrivateIPAddress }}'
    - name: CASSANDRA_SEEDS
      value: '{{repl range $index, $host := NodePrivateIPAddressAll "Cassandra" "cassandra" }}{{repl if eq $index 1}},{{repl end}}{{repl if lt $index 2}}{{repl $host}}{{repl end}}{{repl end}}'
    ports:
    - private_port: "9042"
      public_port: "9042"
      port_type: tcp
    - private_port: "7000"
      public_port: "7000"
      port_type: tcp
    - private_port: "7001"
      public_port: "7001"
      port_type: tcp
    - private_port: "7199"
      public_port: "7199"
      port_type: tcp
    - private_port: "9160"
      public_port: "9160"
      port_type: tcp
```

*Cassandra implements the concept of [Seed Nodes](http://wiki.apache.org/cassandra/FAQ#seed) to
accomplish its ability to cluster. At least one Seed node should exist, it enables new nodes to
join the cluster. Seed Nodes also act as gossip hot spots and have the most current information
on them. All nodes in a cluster should have the same list of seed nodes in a cluster but not all
nodes should be seeds.*

- We set the env_var `CASSANDRA_BROADCAST_ADDRESS` using the [`ThisNodePrivateIPAddress`](/docs/packaging-an-application/template-functions/#thisnodeprivateipaddress) template function to get the unique private IP of the containers host. This tells the local cassandra instance its own ip.
- Lastly we generate a list of seed nodes using a little Replicated magic to set the env_var `CASSANDRA_SEEDS` using [Go Templates](/docs/packaging-an-application/template-functions/) and [`NodePrivateIPAddressAll`](/docs/packaging-an-application/template-functions/#NodePrivateIPAddressAll). I only want to have 2 cassandra seed nodes but you can implement it however you like by slightly altering the template below:

```go
//Loop through all Hosts that have a cassandra container on it
{{repl range $index, $host := NodePrivateIPAddressAll "Cassandra" "cassandra" }}
//Only make the first 2 containers Seed Nodes
	{{repl if eq $index 1}},{{repl end}}
	{{repl if lt $index 2}}{{repl $host}}{{repl end}}
{{repl end}}'
```

**When testing don't forget initialize your Cassandra DB with appropriate keyspace**  
We also make sure to set up our [keyspace](https://docs.datastax.com/en/cql/3.0/cql/cql_reference/create_keyspace_r.html) in
Cassandra correctly to achieve the correct redundancy and replication associated with a 3 node setup. I did
this by going directly into `cqlsh` shell and creating my keyspace like so:

```text
CREATE KEYSPACE replicated_test
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };
```

Check out [Ephemeral Containers](/docs/packaging-an-application/components-and-containers/#ephemeral)
for running migrations!

And there you have it, your very own Cassandra Cluster!

[Download Full Replicated YAML Example](https://github.com/replicatedhq/repl-yaml-samples/blob/master/apps/replicated_cassandra_cluster.yml).
