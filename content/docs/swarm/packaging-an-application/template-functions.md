---
date: "2016-07-03T04:02:20Z"
title: "Template Functions"
description: "Using template functions to make your Swarm YAML dynamic"
weight: "606"
categories: [ "Packaging a Swarm Application" ]
index: ["docs/swarm", "docs"]
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

Template functions are marked by the double curly bracket + *"repl"* escape sequence. They allow for user input to be dynamically inserted into application configuration values. The sequence should be `{{repl`, not `{{ repl`.

### Go Templates
Replicated uses Go's [template package](http://golang.org/pkg/text/template) to execute the following functions.  In addition to the functions listed here, all functions from the Go `text/template` package are available.  Please note that Go template functions must still be escaped with "repl" escape sequence as demonstrated below. This is to ensure other template engines, such as Handlebars or Mustache, or Go templating used in application configuration files will work as expected.

```go
{{repl if pipeline}} T1 {{repl else}} T0 {{repl end}}
```

### Conditionals

Parts of the release YAML can be applied conditionally using Go's templating. This can be used with Docker Swarm to conditionally insert environment variables in situations where empty environment variables can't be used. For example:

```yaml
services:
  app-app:
    image: myapp
    ports:
      - 5000:80
    networks:
      - myapp
    depends_on:
      - redis
    environment:
{{repl if eq (ConsoleSetting "airgap.install") true}}
      - AIRGAP="true"
{{repl end}}
    deploy:
      mode: replicated
      replicas: 2
      labels: [APP=VOTING]
      placement:
        constraints: [node.role == worker]
```

In this instance, the `AIRGAP` environment variable will be inserted into the compose YAML if this release is run on an airgapped installation.

{{< linked_headline "List Of Template Functions In Docker Swarm" >}}

{{< linked_headline "ConfigOption" >}}
```go
func ConfigOption(optionName string) string
```

Returns the value of the config option as a string.
The config screen and associated options are described [here](/docs/config-screen/config-yaml/).

```yaml
properties:
  app_url: http://{{repl ConfigOption "hostname" }}
```


{{< linked_headline "ConfigOptionData" >}}
(only supports `type: file`)

```go
func ConfigOptionData(fileName string) string
```

Returns the contents of the file uploaded for a configuration option as a string.

```yaml
config_files:
- filename: /opt/certs/server.key
  contents: {{repl ConfigOptionData "ssl_key"}}
```


{{< linked_headline "ConfigOptionEquals" >}}
```go
func ConfigOptionEquals(optionName string, expectedValue string) bool
```

Returns true if the configuration option value is equal to the supplied value.

```yaml
environment:
- SMTP_ENABLED={{repl ConfigOptionEquals "smtp_enabled" "1" }}
```


{{< linked_headline "ConfigOptionNotEquals" >}}
```go
func ConfigOptionNotEquals(optionName string, expectedValue string) bool
```

Returns true if the configuration option value is not equal to the supplied value.

```yaml
environment:
- RETURN_TO_SENDER={{repl ConfigOptionNotEquals "address_unknown" "1" }}
```


{{< linked_headline "LicenseFieldValue" >}}
```go
func LicenseFieldValue(customLicenseFieldName string) string
```

Returns the value for the Custom License Field as a string.

```yaml
config_files:
- filename: /opt/app/config.yml
  contents: |
    max_users: '{{repl LicenseFieldValue "maximum_users" }}'
```


{{< linked_headline "LicenseProperty" >}}
```go
func LicenseProperty(propertyName string) string
```
Returns a property from the License as a string.  Valid propertyNames are "assignee", "channel.name", "expiration.date", "expiration.policy", and "license.id".
```yaml
config_files:
- filename: /opt/app/config.yml
  contents: |
    expiration.date: {{repl LicenseProperty "expiration.date"}}
```


{{< linked_headline "AppID" >}}
```go
func AppID() string
```
Returns the app id.
```yaml
environment:
- APP_ID={{repl AppID }}
```


{{< linked_headline "AppVersion" >}}
```go
func AppVersion() int
```
Returns the app version sequence.
```yaml
environment:
- APP_VERSION={{repl AppVersion }}
```


{{< linked_headline "AppVersionFirst" >}}
```go
func AppVersionFirst() int
```
Returns the version sequence of the first version installed.
```yaml
environment:
- APP_VERSION_FIRST={{repl AppVersionFirst }}
```


{{< linked_headline "AppVersionCurrent" >}}
```go
func AppVersionCurrent() int
```
Returns the current app version sequence.
```yaml
environment:
- APP_VERSION_CURRENT={{repl AppVersionCurrent }}
```


{{< linked_headline "RunOffline" >}}
```go
func RunOffline() bool
```
Returns whether or not we are running in airgap mode.
```yaml
environment:
- IS_AIRGAP={{repl RunOffline }}
```


{{< linked_headline "AppSetting" >}}
```go
func AppSetting(key string) string
```
Returns a setting from the current app release.

Possible Options:
`version.label`
`release.notes`
`release.date`
`install.date`
`release.channel`

```yaml
environment:
- VERSION={{repl AppSetting "version.label"}}
- RELEASE_NOTES={{repl AppSetting "release.notes"}}
- INSTALL_DATE={{repl AppSetting "install.date"}}
- RELEASE_DATE={{repl AppSetting "release.date"}}
- RELEASE_CHANNEL={{repl AppSetting "release.channel"}}
```


{{< linked_headline "ConsoleSetting" >}}
```go
func ConsoleSetting(consoleSettingName string) string
```
Returns customer defined console settings for the TLS data or proxy settings. Values are returned as a string.

|Option|Returned Value|
|---|-----------|
|tls.key.name|TLS key filename|
|tls.key.data|TLS key contents|
|tls.cert.name|TLS cert filename|
|tls.cert.data|TLS cert contents|
|tls.authority.cert|TLS certificate authority contents|
|tls.hostname|Hostname used to secure Replicated TLS traffic|
|tls.source|Source of the TLS cert, either "self-signed", "key-cert" or "server-path"|
|http.proxy|Proxy http address (e.g. http://10.128.0.4:3128)|
|http.proxy.enabled|Proxy is enabled when value is 1, not enabled when it is 0|


```yaml
config:
- name: console_info
  title: Console Info
  items:
  - name: key_filename
    type: text
    readonly: true
    value: '{{repl ConsoleSetting "tls.key.name"}}'
```


{{< linked_headline "ConsoleSettingEquals" >}}
```go
func ConsoleSettingEquals(name string, value string) bool
```
Returns a bool indicating if the value is the currently applied value for ConsoleSetting with name.


{{< linked_headline "ConsoleSettingNotEquals" >}}
```go
func ConsoleSettingNotEquals(name string, value string) bool
```
Returns a bool indicating if the value is not the currently applied value for ConsoleSetting with name.


{{< linked_headline "LDAPCopyAuthFrom" >}}
```go
func LdapCopyAuthFrom(keyName string) interface{}
```
Possible Options:

| Key | Type |
| --- | ---- |
| Hostname | string |
| Port | string |
| SearchUsername | string |
| SearchPassword | string |
| BaseDN | string |
| UserSearchDNFirst | string |
| UserSearchDNAll | string |
| RestrictedGroupCNFirst | []string |
| RestrictedGroupCNAll | []string |
| FieldUsername | string |
| LoginUsername | string |
| AdvancedSearchBool | boolean |
| UserQuery | string |
| RestrictedGroupQuery | string |

```yaml
environment:
- LDAP_HOSTNAME={{repl LdapCopyAuthFrom "Hostname"}}
```


{{< linked_headline "Now" >}}
```go
func Now() string
```
Returns the current timestamp as an RFC3339 formatted string.
```yaml
environment:
- START_TIME={{repl Now }}
```


{{< linked_headline "NowFmt" >}}
```go
func NowFmt(format string) string
```
Returns the current timestamp as a formatted string. See Golang's time formatting guidelines [here](https://golang.org/pkg/time/#pkg-constants.
```yaml
environment:
- START_DATE={{repl Now "20060102" }}
```


{{< linked_headline "TrimSpace" >}}
```go
func TrimSpace(s string) string
```
Trim returns a string with all leading and trailing spaces removed.
```yaml
environment:
- VALUE={{repl ConfigOption "str_value" | TrimSpace }}
```


{{< linked_headline "Trim" >}}
```go
func Trim(s string, args ...string) string
```
Trim returns a string with all leading and trailing string contained in the optional args removed (default space).
```yaml
environment:
- VALUE={{repl ConfigOption "str_value" | Trim " " "." }}
```


{{< linked_headline "Split" >}}
```go
func Split(s string, sep string) []string
```
Split slices s into all substrings separated by sep and returns an array of the substrings between those separators.
```yaml
environment:
- BROKEN_APART_A_B_C={{repl Split "A,B,C" "," }}
```

Combining `Split` and `index`:
Assuming the `github_url` param is set to `https://github.mycorp.internal:3131`, the following would set
`GITHUB_HOSTNAME` to `github.mycorp.internal`.
```yaml
environment:
- GITHUB_HOSTNAME={{repl index (Split (index (Split (ConfigOption "github_url") "/") 2) ":") 0}}
```


{{< linked_headline "ToLower" >}}
```go
func ToLower(stringToAlter string) string
```
Returns the string, in lowercase.
```yaml
environment:
- COMPANY_NAME={{repl ConfigOption "company_name" | ToLower }}
```


{{< linked_headline "ToUpper" >}}
```go
func ToUpper(stringToAlter string) string
```
Returns the string, in uppercase.
```yaml
environment:
- COMPANY_NAME={{repl ConfigOption "company_name" | ToUpper }}
```


{{< linked_headline "HumanSize" >}}
```go
func HumanSize(size interface{}) string
```
HumanSize returns a human-readable approximation of a size in bytes capped at 4 valid numbers (eg. "2.746 MB", "796 KB"). The size must be a integer or floating point number.
```yaml
environment:
- MIN_SIZE_HUMAN={{repl ConfigOption "min_size_bytes" | HumanSize }}
```


{{< linked_headline "UrlEncode" >}}
```go
func UrlEncode(stringToEncode string) string
```
Returns the string, url encoded.
```yaml
environment:
- SMTP_CONNECTION_URL={{repl ConfigOption "smtp_email" | UrlEncode }}:{{repl ConfigOption "smtp_password" | UrlEncode }}@smtp.example.com:587
```

{{< linked_headline "Base64Encode" >}}
```go
func Base64Encode(stringToEncode string) string
```
Returns a Base64 encoded string.
```yaml
environment:
- NAME_64_VALUE={{repl ConfigOption "name" | Base64Encode }}
```


{{< linked_headline "Base64Decode" >}}
```go
func Base64Decode(stringToDecode string) string
```
Returns decoded string from a Base64 stored value.
```yaml
environment:
- NAME_PLAIN_TEXT={{repl ConfigOption "base_64_encoded_name" | Base64Decode }}
```


{{< linked_headline "ParseBool" >}}
```go
func ParseBool(str string) bool
```
ParseBool returns the boolean value represented by the string.
```yaml
environment:
- VALUE={{repl ConfigOption "str_value" | ParseBool }}
```


{{< linked_headline "ParseFloat" >}}
```go
func ParseFloat(str string) float64
```
ParseFloat returns the float value represented by the string.
```yaml
environment:
- VALUE={{repl ConfigOption "str_value" | ParseFloat }}
```


{{< linked_headline "ParseInt" >}}
```go
func ParseInt(str string, args ...int) int64
```
ParseInt returns the integer value represented by the string with optional base (default 10).
```yaml
environment:
- VALUE={{repl ConfigOption "str_value" | ParseInt }}
```


{{< linked_headline "ParseUint" >}}
```go
func ParseUint(str string, args ...int) uint64
```
ParseUint returns the unsigned integer value represented by the string with optional base (default 10).
```yaml
environment:
- VALUE={{repl ConfigOption "str_value" | ParseUint }}
```


{{< linked_headline "Add" >}}
```go
func Add(x interface{}, y interface{}) interface{}
```
Adds x and y.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer.
```yaml
environment:
- MAX_USERS_PLUS_ONE={{repl Add (LicenseFieldValue "maximum_users") 1}}
```


{{< linked_headline "Sub" >}}
```go
func Sub(x interface{}, y interface{}) interface{}
```
Subtracts y from x.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer.
```yaml
environment:
- MAX_USERS_MINUS_ONE={{repl Sub (LicenseFieldValue "maximum_users") 1}}
```


{{< linked_headline "Mult" >}}
```go
func Mult(x interface{}, y interface{}) interface{}
```
Multiplies x and y.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer.
```yaml
environment:
- DOUBLE_NUM_ADDRESSES={{repl Mult (NodePrivateIPAddressAll "DB" "redis" | len) 2}}
```


{{< linked_headline "Div" >}}
```go
func Div(x interface{}, y interface{}) interface{}
```
Divides x by y.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer and will be rounded down.
```yaml
environment:
- HALF_MAX_USERS={{repl Div (LicenseFieldValue "maximum_users") 2.0}}
```


{{< linked_headline "Namespace" >}}
```go
func Namespace() string
```

Namespace returns the value of the namespace the vendor application is installed in.


{{< linked_headline "SwarmIngressAddress" >}}
```go
SwarmIngressAddress() string
```

SwarmIngressAddress returns the ingress address of the swarm cluster.

```yaml
properties:
  app_url: '{{repl SwarmIngressAddress }}'
```


{{< linked_headline "PremkitAPIAddress" >}}
```go
PremkitAPIAddress() string
```

PremkitAPIAddress returns the address of the Premkit service in the cluster.

```yaml
services:
  api:
    image: mycompany/myapp:1.0
    environment:
    - REPLICATED_INTEGRATIONAPI={{repl PremkitAPIAddress }}
```


{{< linked_headline "PremkitNetworkName" >}}
```go
PremkitNetworkName() string
```

PremkitNetworkName returns the name of the premkit docker network.


{{< linked_headline "StatsdAddress" >}}
```go
StatsdAddress() string
```

StatsdAddress returns the address of the Statsd service in the cluster.

```yaml
services:
  api:
    image: mycompany/myapp:1.0
    environment:
    - STATSD_HOST={{repl (index (Split (StatsdAddress) ":") 0)}}
    - STATSD_PORT={{repl (index (Split (StatsdAddress) ":") 1)}}
```


{{< linked_headline "StatsdNetworkName" >}}
```go
StatsdNetworkName() string
```

StatsdNetworkName returns the name of the Statsd docker network.
