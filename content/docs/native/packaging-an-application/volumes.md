---
date: "2016-07-03T04:02:20Z"
title: "Container Volumes"
description: "Defining and controlling container volumes"
weight: "203"
categories: [ "Packaging a Native Application" ]
index: ["docs/native", "docs"]
icon: "replicatedCircle"
---

{{< linked_headline "Container Volumes" >}}

The `volumes` key defines an array of volumes to be created and mounted when using the Replicated Native Scheduler. Only the `host_path` and `container_path` keys are required for each volume. When new versions of your container are deployed, the volume will be mounted into the updated container.

Named Volumes: You may create a "named" volume by providing a host_path without a leading "/" (ex. `host_path: dbdata`) which becomes the name of the volume. On creation, named volumes will link the information inside the `container_path` into the `host_path` location and will act as a shared folder between your host and your docker container. Only folders can be named volumes.

Host Volumes: If you would like to have the volume mounted at a specific location on the host then you will provide a host_path value with a leading "/" (ex. `host_path: /dbdata`). Host volumes will bind-mount the `host_path` contents into the `container_path` location and will act as a shared mount between your host and your docker container. Folders or files can be bind-mounted host volumes. The Replicated Native Scheduler will automatically create any host volume directories on the node, if they are not already present.

Required properties:

- `host_path` For named volumes, this is the volume name (ex. dbdata). For host volumes, this is the absolute host location for the volume (ex. /dbdata).
- `container_path` The absolute location inside the container the volume will bind to (ex. /var/lib/mysql).

Optional properties:

- `permission` an octal permission string (defaults to `0644` for files, `0755` for folders).
- `owner` uid of the user inside the container.
- `options` {{< version version="2.3.0" >}} optional volume settings in an array of strings, a `ro` entry puts the volume into read-only mode.
- `is_ephemeral` {{< version version="2.3.5" >}} Ephemeral volumes do not prevent containers from being re-allocated across nodes. Ephemeral volumes will also be excluded from snapshots.
- `is_excluded_from_backup` exclude this volume from backup if Snapshots enabled.
- `when` {{< version version="2.31.0" >}} exclude this volume when the template evaluates to false

```yaml
    volumes:
    - host_path: /dbdata
      container_path: /var/lib/mysql
      permission: "0755"
      owner: "100"
      is_ephemeral: false
      is_excluded_from_backup: true
      options: ["rw"]
      when: '{{repl ConfigOptionEquals "has_local_db_data" "1"}}'
```

Note: Replicated will only set the permissions and owner when the directory is created. If the directory already exists on the server, then these keys will not be respected.

Replicated supports `volumes_from` to attach several mounts from a colocated container.

```yaml
  - source: public
    ...
    name: datastore
    publish_events:
    - name: Datastore started
      trigger: port-listen
      data: '6379'
      subscriptions:
      - component: DBs
        container: alpine
        action: start
  - source: public
    image_name: alpine
    version: 3
    ephemeral: true
    cmd: '["migrate_data.sh"]'
    volumes_from: ["datastore"]
```

The container using `volumes_from` must start after any containers it mounts from. This can be controlled with the Replicated Native Scheduler [events and orchestration](/docs/native/packaging-an-application/events-and-orchestration/) controls. The `volumes_from` property takes an array of strings where each string identifies a named container running on the same server.

{{< linked_headline "Logs" >}}

We can configure logs for containers by specifying the max number of logs files and the max size of the log files. The max size string should include
the size, k for kilobytes, m for megabytes or g for gigabytes. Log settings at the component level are inherited by the container and will be
used unless overwritten.

```yaml
components:
  - name: sample-agent
    logs:
      max_size: 200k
      max_files: 2
    containers:
      - source: replicated
        logs:
          max_size: 500k
          max_files: 5
```
