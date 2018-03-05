---
date: "2016-07-03T04:02:20Z"
title: "Config Files"
description: "Creating and mounting dynamic files into a container"
weight: "205"
categories: [ "Packaging a Native Application" ]
index: "docs/native"
icon: "replicatedCircle"
---

{{< linked_headline "Config Files" >}}


Your application may have config files that require dynamic values. These values may be input by the person installing the software, values specific to the environment your application is running in, values created by other containers or read from the embedded license via the License API. To accomplish this, Replicated allows templating of its config values using the Go template language with a repl escape sequence. When your application runs, Replicated will process the templates, and you have full access to the the Replicated template library.

The next section contains inline configuration files that we can supply to our container. Replicated will create a file within the container with the specified path (filename) and contents. You may optionally specify an octal permissions mode as a string (file_mode), and/or the numeric uid of a user & group (file_owner) to be applied to the resulting file in the container.

```yaml
    config_files:
    - filename: /elasticsearch/config/elasticsearch.yml
      file_mode: "0644"
      file_owner: "100"
      contents: |
        path:
          data: /data/data
          logs: /data/log
          plugins: /elasticsearch/plugins
          work: /data/work
        http.cors.enabled: true
        http.cors.allow-origin: /https?:\/\/{{repl ConfigOption "hostname" }}(:[0-9]+)?/
```

{{< linked_headline "Customer Files" >}}

Similar to config files, the Replicated Native Scheduler supports mounting a customer supplied file, in it's entirity, into a container. This is defined as a `customer_file` and an example is below.

Sometimes it can be helpful to allow a customer to supply a file to your app. A good example of this is when your customer should supply an SSL certificate and private key. To add customer supplied files to your container, you must first define the file as a config option, and then create a link to it in any container that needs that file. Replicated will prompt for the file to be uploaded and will ensure that the file is at the correct location in the container when it is started.

It can also be helpful to request a customer supplied file. This file can be referenced by the name parameter and will be created within the container at the specified path (filename).

```yaml
    customer_files:
    - name: logstash_input_lumberjack_cert_file
      filename: /opt/certs/logstash-forwarder.crt
      file_mode: "0600"
      file_owner: "0"
    - name: logstash_input_lumberjack_key_file
      filename: /opt/certs/logstash-forwarder.key
      file_mode: "0600"
      file_owner: "0"
```
