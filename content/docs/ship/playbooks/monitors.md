---
date: "2018-05-02T01:19:20Z"
title: "Datadog Monitors"
description: "Delivering Datadog monitors with a Ship application"
weight: "44006"
categories: [ "Ship Playbooks" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Monitoring With Datadog" >}}

If an application can send metrics to Datadog, it's useful to provide documentation and scripts to help configure the enterprise Datadog account with the appropriate dashboard(s) to understand the application.

{{< linked_headline "Delivering a observe/datadog directory" >}}

```yaml
assets:
  v1:
    - inline:
        dest: ./observe/datadog/README.md
        contents: |
          ## Datadog Dashboards

          This application can be configured to post metrics to your Datadog account. This directory contains resources to understand these metrics and create dashboards and alerts.

          When you are ready to deploy the dashboards to your Datadog account, simple run the following script:

          ```shell
          export DD_API_KEY=''
          export DD_APPLICATION_KEY=''

          pip install dog_http_api
          ./create_datadog_dashboards.py
          ```

    - inline:
        dest: ./observe/datadog/create_datadog_dashboards.py
        mode: 0777
        contents: |
          from dogapi import dog_http_api as api

          ##### Parameters #####

          # Credentials
          api.api_key = os.environ['DD_API_KEY']
          api.application_key = os.environ['DD_APPLICATION_KEY']

          # Dashboard information
          title = "Application"
          description = "Dashboard"

          # Metrics
          METRICS = {
              "SYSTEM_METRICS": """
                  system.cpu.system
                  system.mem.free
              """

              ,"ES_COUNTERS": """
                  elasticsearch.docs.count
              """

              ,"ES_GAUGES": """
                  elasticsearch.active_primary_shards
              """
          }

          def define_metric(metric, type="gauge"):
              if type == "counter":
                  rate = True
              else:
                  rate = False

              return {
                  "name": metric,
                  "rate": rate
              }

          def define_graph(metric):
              query = metric['name']

              if len(HOSTS) == 0:
                  HOSTS.append('*')

              requests = []
              hosts = HOSTS.split('\n')
              hosts = filter(None, hosts)
              for h in hosts:
                  if h == '*':
                      q = query + "{*}"
                  else:
                      q = query + "{host:" + h.strip() + "}"
                  if metric['rate'] is True:
                      q = "rate(" + q + ")"
                  requests.append({"q": q})

              return {
                  "definition": {
                      "events": [],
                      "requests": requests,
                  "viz": "timeseries"
                  },
                  "title": metric['name']
              }

            # Generate graphs
            graphs = []
            for key in METRICS:
                if key.find("GAUGE") != -1:
                    type = "gauge"
                else:
                    type = "counter"

                metrics = METRICS[key].strip('\t').split('\n')
                metrics = filter(None, metrics)
                print metrics
                for m in metrics:
                    metric = define_metric(m.strip(), type)
                    graph = define_graph(metric)
                    graphs.append(graph)

            # Let's send the API request to create the dashboard
            api.create_dashboard(title, description, graphs)
```