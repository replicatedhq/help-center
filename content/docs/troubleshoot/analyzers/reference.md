---
date: "2019-06-04T12:00:00Z"
title: "Reference Doc"
description: "Analyzer spec reference documentation"
weight: "1910"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Analyzer Reference Documentation

## Analyzer

A single analyzer to run on the collect spec. An analyzer is comprised of `registerVariables` and `evaluateConditions` to display an `insight` on failure or success.

### Optional Parameters

- 'name' - The name of the analyzer

- 'labels' - Key, value pairs used to organize and identify the analyzer

- 'insight' - The insight to be displayed upon success [spec](#insight)

- 'registerVariables' - A list of variables to register, can be used in evaluateConditions expressions [spec](#variable)

- 'evaluateConditions' - A list of conditions to evaluate in order [spec](#evaluatecondition)

### Usage

An example is shown below for the 'os.ubuntu' analyzer.

```
analyze:
  v1:
    - name: os.ubuntu
      insight:
        primary: OS is Ubuntu
        detail: Operating System is Ubuntu
        severity: info
      registerVariables:
        - name: os
          os: {}
      evaluateConditions:
        - condition:
            stringCompare:
              eq: ubuntu
            variableRef: os
          insightOnError:
            primary: Failed to detect OS
            detail: Operating System is Ubuntu
            severity: debug
          insightOnFalse:
            primary: OS is not Ubuntu
            detail: Operating System is not Ubuntu
            severity: debug
```

## Insight

An insight represents information to be surfaced to the user upon analysis. It consists of a primary and detailed message as well as a severity.

### Required Parameters

- 'primary' - A short message to display to the user

- 'detail' - A detailed message to display to the user

### Optional Parameters

- 'name' - The name of the insight

- 'labels' - Key, value pairs used to organize and identify the insight

- 'severity' - The severity of the insight (default info)

## Variable

A variable registered by name. Information can be extracted into the variable and used in conditions to surface insights. For a list of variables see [here](/api/analyze-yaml-variable-specs/root/).

### Required Parameters

- 'name' - The name of the variable

### Optional Parameters

- 'labels' - Key, value pairs used to organize and identify the variable

## EvaluateCondition

A condition to be evaluated and surface an insight. Conditions will be evaluated in order. An error or failure will halt execution. Insights can be specified to display in these cases (`insightOnError`, `insightOnFalse`).

### Required Parameters

- 'condition' - The condition to be evaluated [spec](#condition)

### Optional Parameters

- 'name' - The name of the condition

- 'labels' - Key, value pairs used to organize and identify the condition

- 'insightOnError' - The insight to be displayed when the condition results in an error

- 'insightOnFalse' - The insight to be displayed when the condition evaluates to false

## Condition

A condition that results in true, false, or an error. For a list of conditions see [here](/api/analyze-yaml-condition-specs/root/).

### Optional Parameters

- 'name' - The name of the condition

- 'labels' - Key, value pairs used to organize and identify the condition

- 'variableRef' - The input variable to the condition.
