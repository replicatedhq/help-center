---
date: "2019-06-04T12:00:00Z"
title: "How To Run"
description: "Running Analyzers"
weight: "1906"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# How to run Analyzers

The Analyze Replicated Troubleshoot utility is distributed in a Docker container that's publicly available at [hub.docker.com/r/replicated/analyze](https://hub.docker.com/r/replicated/analyze).

## Running in the Vendor Portal

Support bundles can be uploaded in the Vendor Portal at [vendor.replicated.com/troubleshoot](https://vendor.replicated.com/troubleshoot). After upload is complete, a series of analyzers will run and produce a screen of insights.

![Support Bundle Analysis](/images/troubleshoot/analyzers.png)

## Running in Docker

Sometimes, it might be the case that you are unable to upload the bundle to the Vendor Portal. In this scenario, a CLI has been made available as a Docker image at `replicated/analyze`. The CLI will perform the same built-in analysis as the Vendor Portal. It is also possible to run a custom analyzer spec. It can be useful in debugging custom specs as well.

```shell
cat /home/ubuntu/supportbundle.tar.gz | \
    docker run --rm -i -v `pwd`:/wrk \
    replicated/analyze run -f /wrk/custom-analyze-spec.yml -
```

For more detailed information on running the CLI, the `-h` flag can be used for help.

```shell
$ docker run --rm replicated/analyze run -h
analyze a troubleshoot bundle archive

Usage:
  analyze run [BUNDLE] [flags]

Flags:
      --bundle-root-subpath string   The subpath within the archive at which the bundle root resides
      --channel-id string            Replicated ChannelID to attempt to get a collector definition from
      --endpoint string              Endpoint to fetch collector definitions fom (default "https://pg.replicated.com/graphql")
  -h, --help                         help for run
  -o, --output string                output format, one of: human|json|yaml (default "human")
  -q, --quiet                        suppress normal output
      --severity-threshold string    the severity threshold at which to exit with an error (default "error")
      --skip-default                 Skip the default analyze spec
  -s, --spec stringArray             spec doc
  -f, --spec-file stringArray        spec file

Global Flags:
  -c, --config string      config file (default is /etc/replicated/analyze.yaml)
      --log-level string   Log level (default "off")
  -v, --verbose            Verbose mode (log-level=debug)
```
