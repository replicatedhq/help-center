---
categories: [ "Reference" ]
index: false
title: Support Bundle YAML Specs
url: "categories/support-bundle-yaml-specs"
weight: "12000"
hideFromList: true
---

## Support Bundle Collection Specs

Support Bundle collection specs can be used to define and customize what kinds diagnostic
information you want to collect to debug your application. All Support Bundle specs support the following shared parameters:

### Required Parameters

- `output_dir` - The directory in the bundle to store the collection results

### Optional Parameters

- `timeout_seconds` - An amount of time to allow a collection to run before abandoning it

- `description` - A description of the file(s) being collected

- `scrub` - A `regex` and `replace` specification for removing sensitive data from files in the bundle

- `meta` - A `name` and `labels` that can be used to organize and identify support bundle elements in generated bundles

### Usage

An example is shown below for the `os.read-file` collector.

```yaml
specs:
  - os.read-file:
      # path on the host
      filepath: /etc/goodtool.conf
      # path in the bundle
      output_dir: /files/etc/goodtool-conf
      # a description that will be included in the bundle
      description: The GoodTool application configuration file
      # give up if we can't read the file in 10 seconds
      timeout_seconds: 10
      # scrub anything that might be sensitive
      scrub:
        regex: (db_password|api_secret_key) = (.*)
        replace: $1 = REDACTED
      # metadata that will be included in the bundle
      meta:
        name: goodtool_conf
        labels:
          area: "configuration"
          type: "readfile"
```
