---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: A list of scrubbers to apply to all assets. If multiple 'meta.redact' specs are specified, all lists will be used. If a spec specifies a scrubber, it will be run in addition to the global scrubbers.
index: docs
title: meta.redact
weight: "100"
gradient: "purpleToPink"
---

## meta.redact

A list of scrubbers to apply to all assets. If multiple 'meta.redact' specs are specified, all lists will be used. If a spec specifies a scrubber, it will be run in addition to the global scrubbers.


```yaml
collect:
  v1:
    - meta.redact:
        scrubs:
          - regex: abc
            replace: xyz
        output_dir: redact/
```


### Required Parameters


- `scrubs` - the list of scrubbers to apply to all outputs



### Outputs

    
- `scrubs.json` - A list of scrubs that were added globally by this item


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  