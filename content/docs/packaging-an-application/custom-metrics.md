---
date: "2016-07-02T00:00:00Z"
lastmod: "2016-07-02T00:00:00Z"
title: "Custom Metrics"
weight: "217"
categories: [ "Packaging an Application" ]
tags: [ "Application YAML" ]
index: "docs"
---

All Replicated installations come with a StatsD/Graphite/Carbon container that can be used by the application to report data to StatsD. Application YAML can also include optional custom monitors that will be used to display additional charts in Replicated dashboard. Applications can also query Graphite directly.

{{< linked_headline "Defining Metrics" >}}

Add `custom_metrics` as a root element to the application YAML. The following elements are supported:

- `target` - This is the full key name for your metric. It should use the Graphite naming conventions. The format is restricted to regex rules supported by Carbon.
- `retention` - The retention period defined using the new Carbon format: `frequency:history`
- `aggregation_method` - One of the aggregation methods supported by Carbon: `average`, `sum`, `min`, `max`, and `last`.
- `xfiles_factor` - This is a value between 0 and 1 that defines what percentage of samples must be present in order for aggregate to a non-null value.

Detailed information about `retention`, `aggregation_method`, and `xfiles_factor` can be found in Carbon documentation.

### Example

```yaml
custom_metrics:
- target: stats.gauges.myapp100.disk.*.*
  retention: "1s:10m,1m:20m,1h:30d"
  aggregation_method: "average"
  xfiles_factor: 0.3
- target: stats.gauges.myapp100.ping.*
  retention: "1s:7d"
  aggregation_method: "last"
  xfiles_factor: 0.6
```

### Limitations

Please note that changing retention and aggregation settings will have no effect on keys that already exist in Carbon.

StatsD is configured to use the flush interval of 1 second. Using average aggregators with bucket size greater than 1 second may result in inaccurate data.

{{< linked_headline "Defining Monitors" >}}

Each custom monitor will be added as a tile to the Replicated dashboard. The following elements are supported

- `name` - String that will appear as the top label for the graph
- `target` - Deprecated.  Use `targets`.
- `targets` - An array of strings that will be used as the `target` in Graphite query. Wildcards, lists, and functions are all allowed. See Graphite documentation for more details.
- `from` -  Start time for displayed data.  Relative and absolute times are supported.  See Graphite documentation for more details.
- `until` -  End time for displayed data.  Relative and absolute times are supported.  See Graphite documentation for more details.
- `display.label_unit` - String that will be placed on the Y axis labels.
- `display.label_scale` - Scale to be used on the Y axis. Possible values are:
  - `metric` - Y axes will scaled using metric units in 1K increments. The string specified in `label_unit` will be added as the postfix.
  - `none` - No scale will be applied.
- `display.label_range_override` - This value is used to indicate that the minimum and the maximum points on the Y axis will be overridden.
- `display.label_min` - The minimum value to show on the Y axis.
- `display.label_max` - The maximum value to show on the Y axis.
- `display.label_count` - Number of labels to show on the Y axis (not counting the one at the origin).
- `display.fill_color` - The color to use to fill the area under the graph line.  If this value is omitted, a color will be selected automatically.
- `display.stroke_color` - The color to use for the graph line.  If this value is omitted, a color will be selected automatically.
- `display.css_class_name` - The name of the CSS class to use for background colors.

Colors can be specified using one of the standard web color formats:

- HEX color, for example `#10FF60`
- RGB color, for example `rgb(100, 0, 50)`
- RGBA color, for example `rgba(100, 0, 50, 0.5)`

`from` and `until` fields are optional.  If omitted, the tile will display the last 15 minutes of data.  If a larger time window is used, retention policies must be configured accordingly.

### Example

```yaml
monitors:
  cpuacct:
  - DB,redis
  memory:
  - DB,redis
  custom:
  - name: Disk Usage (bytes)
    targets:
      - stats.gauges.myapp100.disk.*.free
      - stats.gauges.myapp100.disk.*.total
    from: "-3days"
    until: "-30minutes"
    display:
      label_unit: B
      label_scale: metric
      label_min: 30000000000 # gigabytes
      label_max: 40000000000
      label_range_override: true
      label_count: 2
      fill_color: rgba(100, 0, 50, 0.5)
      stroke_color: "#ff1060"
      css_class_name: app1-custom-metrics
  - name: Disk Free (%)
    targets:
      - scale(divideSeries(stats.gauges.myapp100.disk.*.free,stats.gauges.myapp100.disk.*.total),100) # Show values between 0 and 100
    display:
      label_unit: "%"
      label_scale: none
      label_count: 3
      fill_color: rgba(0, 100, 50, 0.5)
      stroke_color: "#10FF60"
      css_class_name: app1-custom-metrics
```

{{< linked_headline "Ports" >}}

By default, Replicated will use dynamic ports for Graphite and StatsD.  These can be discovered by examining the
graphite container. Static ports can be defined using the graphite and the statsd sections of app YAML.
The graphite port can be accessed via web browser for a full Graphite dashboard.

Because Graphite uses TCP and StatsD uses UDP, the same port number can be used for both.

### Example

```yaml
graphite:
  port: 8899
statsd:
  port: 8899
```

{{< linked_headline "Custom CSS" >}}

Custom CSS can be used to define background colors for each metric's tile and chart background. CSS class name must match the name specified in the css_class_name tag.

```css
/* custom graphs */
.app1-custom-metrics {
  background-color: #999910;
}
.app1-custom-metrics  .app1-custom-metrics-chart {
  background-color: #109999;
}
```

The CSS can be added in Vendor Web dashboard in [App Settings](https://vendor.replicated.com/#/settings).

{{< linked_headline "Integration API" >}}

StatsD host can be discovered via Replicated Console Settings. The following Go function will return the current endpoint. Note that this value can change, and applications should periodically query Integration API to obtain the current endpoint.

```go
func GetStatsdEndpoint() (string, error) {
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{
			InsecureSkipVerify: true,
		},
	}
	// Do not create a new client for every request in production code.
	httpClient = &http.Client{Transport: tr}

	apiEndpoint := os.Getenv("REPLICATED_INTEGRATIONAPI")
	if apiEndpoint == "" {
		return "", errors.New("REPLICATED_INTEGRATIONAPI is not set")
	}

	url := fmt.Sprintf("%s/console/v1/option?name=statsd.endpoint", apiEndpoint)
	resp, err := httpClient.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", errors.New("Integration API returned unexpected status %v", resp.StatusCode)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}
```

{{< linked_headline "Installed Configuration" >}}

The Graphite/StatsD/Carbon container managed by Replicated has some baked in configurations. These defaults will apply to all data that matches the specified patterns. If application sends data to this container and the application has no matching custom_metrics, these defaults will be applied permanently.

Please note that statsd-config.js cannot be customized at this time.

### statsd-config.js
```json
{
  graphiteHost: "127.0.0.1",
  graphitePort: 2003,
  port: 8125,
  flushInterval: 1000,
  backends: [ "./backends/graphite" ],
  deleteIdleStats: true,
  deleteGauges: true
}
```

### storage-aggregation.conf
```text
[default] pattern = .* aggregationMethod = average xFilesFactor = 0.5
storage-schemas.conf

[default] pattern = .* retentions = 2s:20m
```
