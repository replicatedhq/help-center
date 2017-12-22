---
date: "2017-08-23T04:02:20Z"
lastmod: "2017-12-01T00:00:00Z"
title: "Recycling Volume Data"
weight: "999999"
description: "How to re-use a named volume with new data across multiple application versions"
index: "docs"
categories: [ "Developer Resources" ]
aliases: ['docs/packaging-an-application/recycling-volumes/']
tags: ["Application YAML"]
hideFromList: true
---

There are some use cases where re-using a named volume can be useful. For example, if an application is serving its static content via a load balancer, we may package the static content in our main application and use a standard nginx container to actually serve that content.

However, this can cause problems during updates, because existing data in volumes will take precedence over any new data during an update, causing applications to present stale data. To get around this, we can use an ephemeral content to clean a volume before use.

This example uses a cleaner component that mounts the `app-ui` volume. If it doesn't exist at runtime, it will be created. This same, now empty volume is then used in the nginx container to actually present the data.

```yml
components:
- name: cleaner
  containers:
  - source: public
    name: debian
    image_name: debian
    version: jessie
    ephemeral: true
    cmd: '["bash", "-c", "rm -rfv /delete_me/*"]'
    volumes:
      - host_path: app-ui
        container_path: /delete_me
    publish_events:
    - name: Public Folder Cleaned
      trigger: container-start
      subscriptions:
      - component: app
        container: myapp
        action: start
- name: app
  containers:
  - source: myapp
    name: myapp
    image_name: myapp/myapp
    volumes:
      - host_path: app-ui
        container_path: /var/lib/myapp/public
    publish_events:
    - name: Application Start
      trigger: container-start
      subscriptions:
      - component: lb
        container: nginx
        action: start
- name: lb
  containers:
  - source: public
    name: nginx
    image_name: nginx
    version: latest
    cmd: ""
    volumes:
      - host_path: app-ui
        container_path: /usr/share/nginx/html
```

This can also be used to "prepare" data containers for other volumes. As long as sequencing is correct, it is safe to make any modifications to the data volume before it is used in other containers.
