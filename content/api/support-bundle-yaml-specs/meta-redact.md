---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Redaction to apply to all assets. If multiple 'meta.redact' specs are specified, all lists will be used. If a spec specifies a scrubber, it will be run in addition to the global scrubbers.
index: docs
title: meta.redact
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## meta.redact

**type object**

Redaction to apply to all assets. If multiple 'meta.redact' specs are specified, all lists will be used. If a spec specifies a scrubber, it will be run in addition to the global scrubbers.


```yaml
collect:
  v1:
    - meta.redact:
        scrubs:
          - regex: abc
            replace: xyz
        files:
          - '**/secret.json'
        output_dir: redact/
```


### Required Parameters


- `scrubs` - the list of scrubbers to apply to all outputs



### Optional Parameters


- `files` - the list of file patterns to redact



### Outputs

    
- `scrubs.json` - A list of scrubs that were added globally by this item

- `file_redactions.json` - A list of file redaction patterns that were added globally by this item


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  