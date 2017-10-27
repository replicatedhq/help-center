---
date: "2017-10-25T00:00:00Z"
lastmod: "2017-10-25T00:00:00Z"
title: "Validate Your Yaml"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Replicated Vendor", "API", "YAML", "Lint"]
---

Use Replicated's linting tools enable you to script and automate validation of your YAML.

## Overview

The Replicated Vendor UI will automatically validate your yaml as you write it in the release editor. Replicated ships this same validation functionality as a [standalone NPM Package](https://github.com/replicatedhq/replicated-lint) and CLI toolkit.

<!-- TODO -->
<!-- More examples can be found in the [Blog Post]() -->

## Usage

Install the CLI executable with

```sh
npm install -g replicated-lint
```

Lint with `replicated-lint validate`

```sh
replicated-lint validate -f my-app.yml
```

or pipe from stdin:

```sh
cat my-app.yml | replicated-lint validate -f -
```

Results that have issues will look something like:

```raw
{ type: 'info',
  rule: 'prop-configitem-testproc-run-on-save',
  message: 'If a config item\'s test_proc.run_on_save is not set to \'true\', test_proc\'s will not be checked automatically. Consider setting your test_proc\'s run_on_save to automatically validate inputs',
  positions:
   [ { path: 'config.1.items.2.test_proc',
       start: { position: 8130, line: 325, column: 4 },
       end: { position: 8322, line: 331, column: 0 } },
     { path: 'config.3.test_proc',
       start: { position: 8692, line: 346, column: 2 },
       end: { position: 9141, line: 365, column: 2 } } ],
  links: [ 'https://www.replicated.com/docs/packaging-an-application/test-procs/' ] }

# prop-configitem-testproc-run-on-save continued from line 321
322
323    - name: phone_number
324      type: text
325      test_proc:
326        display_name: Is this a Phone Number?
327        command: regex_match
328        args:
329        - "([0-9]{3})[-]([0-9]{3})[-]([0-9]{4})$"
330        - "That doesn't seem to be a phone number!"
331  - name: auth
332    title: Authentication
333    description: Where will user accounts be provisioned
334    items:

```


### Extending the CLI with custom rules

`replicated-lint` rules can be expressed as JSON, so it is easy to add your own custom rules.

If you have a custom rule set in `no-latest.json`, you can pass it to `replicated-lint` using

```sh
cat my-app.yml | replicated-lint validate -f - --extraRules no-latest.json
```

`--extraRules` can be specified multiple times. An example JSON rule set might look something like

```json
[
  {
    "name": "custom-no-latest",
    "type": "error",
    "message": "Dont use `latest` for container versions",
    "test": {
      "AnyOf": {
        "path": "components",
        "pred": {
          "AnyOf": {
            "path": "containers",
            "pred": {
              "Eq": {
                "path": "version",
                "value": "latest"
              }
            }
          }
        }
      }
    }
  }
]
```

`replicated-lint validate` supports the following options:

```raw
Options:
  --version         Show version number                                [boolean]
  --help            Show help                                          [boolean]
  --infile, -f      Input file to validate. Use "-" for stdin
                                                         [string] [default: "-"]
  --threshold, -t   Threshold of of issues to report
                  [string] [choices: "info", "warn", "error"] [default: "error"]
  --extraRules, -e  Path to file containing JSON definitions for additional yaml
                    rules. Can be specified multiple times.[array] [default: []]
  --reporter, -r    Output Format to use
                     [string] [choices: "console", "junit"] [default: "console"]
  --outputDir, -o   junit reporter only -- path to directory to output junit xml
                    reports                   [string] [default: "test-results"]
```

### Integrating with CI

By default, `replicated-lint validate` will output results to the console, but it is also possible to output machine-readable results as JUnit XML. For example, to output results to a folder `/ci/test-reports`, you could use the following:

```shell
replicated-lint validate -f my-app.yml --reporter junit --outputDir /ci/test-reports
```

This will result in the creation of a file at

```raw
/ci/test-reports/replicated-lint-results.xml
```

For end-to-end examples of using replicated lint with Circle CI or Travis CI, check out the [Automate Your Workflow](/guides/automate-your-workflow) guide.
