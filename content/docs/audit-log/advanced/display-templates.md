---
date: "2016-07-03T04:02:20Z"
title: "Display Templates"
description: "Customize how audit events are displayed"
weight: "1803"
categories: [ "Advanced Audit Logging" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

Display templates is an important part of controlling how the events are rendered in the browser, exports or over any other stream. Display Templates cause an additional field to be returned on event objects from the Audit Log APIs.

A display template has the following components:

## Definitions

### Name
The name is internal only to the admin site. This is a place for you to record what the template is attempting to do.

### Rules
The rules field is a collection of rules that will be evaluated by the Replicated Audit Log rules engine to determine if this template shoud be applied to the event. We'll cover that in detail shortly. But the idea is that you can have multiple rules, and the first one that matches will control how the event is rendered.

### Template
A handlebars-enabled, markdown rendered display template to use when the rules evaluate to true for a particular event. This ultimately is the text that you want to show for the matching events.

## Rules
Rules are processed against the event object. The best example is with actual data: you can click the Raw object in the admin site and see any actual event object. This is the exact context that is sent into the rule engine.

Rules are expressed as an array of comparators. When the *value* of the *path* matches the *comparator*, the rule evaluates to true and the template is applied. The Audit Log supports a large number of comparators, a [full list of comparators is available](/docs/audit-log/advanced/template-comparators).

### Examples

This rule matches when the `action` is set to the string "document.edit":

```json
[
    {
        "comparator": "is",
        "path": "action",
        "value": "document.edit"
    }
]
```

This rule matches when the `action` is set to the string "document.edit" AND the type of the document is set to "spreadsheet":

```json
[
    {
        "comparator": "is",
        "path": "action",
        "value": "document.edit"
    },
    {
        "comparator": "is",
        "path": "target.type",
        "value": "spreadsheet"
    }
]
```

## Templates

Templates are a handlebars string that will be used to display the event. The context of the handlebars engine is the event object, and the output is a markdown string.

### Examples

Partial Event:
```json
{
    "action": "document.create",
    "actor": {
        "name": "Dr. Evil",
    },
    "target": {
        "type": "spreadsheet",
        "name": "Master Plan For World Domination.xlsx"
    }
}
```

Template:
```
{{ actor.name }} created the document {{ target.name }}
```

Result:
**Dr. Evil** created the document **Master Plan For World Domination**
