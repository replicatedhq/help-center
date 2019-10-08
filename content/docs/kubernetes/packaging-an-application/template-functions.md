---
date: "2016-07-03T04:02:20Z"
title: "Template Functions"
description: "The dynamic configuration management functionality available throughout the Replicated YAML."
weight: "2606"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

Template functions are marked by the double curly bracket + *"repl"* escape sequence. They allow for user input to be dynamically inserted into application configuration values. The sequence should be `{{repl`, not `{{ repl`.

### Go Templates
Replicated uses Go's [template engine](http://golang.org/pkg/text/template) to execute the following functions.  In addition to the functions listed here, all of the Go template runtime is available.  Please note that Go template functions must still be escaped with "repl" escape sequence as demonstrated below.

```go
{{repl if pipeline}} T1 {{repl else}} T0 {{repl end}}
```

{{< linked_headline "Replicated Template Function" >}}

{{< template_function name="ConfigOption" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ConfigOption(optionName string) string
```
Returns the value of the config option as a string.
The config screen and associated options are described [here](/docs/config-screen/config-yaml/).
```yaml
properties:
  app_url: http://{{repl ConfigOption "hostname" }}
```

{{< template_function name="ConfigOptionData" replicated="true" kubernetes="true" swarm="true" >}}
(only supports `type: file`)

```go
func ConfigOptionData(fileName string) string
```
Returns the contents of the file uploaded for a configuration option as a string.
```yaml
kind: Secret
metadata:
  name: www-tls
data:
  cert: '{{repl ConfigOptionData "ssl_cert" | Base64Encode }}'
```

{{< template_function name="ConfigOptionEquals" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ConfigOptionEquals(optionName string, expectedValue string) bool
```
Returns true if the configuration option value is equal to the supplied value.
```yaml
---
# kind: scheduler-kubernetes
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: backend
  annotations:
    ingress.kubernetes.io/force-ssl-redirect: “{{repl if ConfigOptionEquals "http_enabled" "1" }}false{{repl else}}true{{repl end}}”
spec:
  backend:
    serviceName: frontend
    servicePort: 80
```

{{< template_function name="ConfigOptionNotEquals" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ConfigOptionNotEquals(optionName string, expectedValue string) bool
```
Returns true if the configuration option value is not equal to the supplied value.
```yaml
---
# kind: scheduler-kubernetes
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: backend
  annotations:
    ingress.kubernetes.io/force-ssl-redirect: “{{repl if ConfigOptionNotEquals "http_enabled" "1" }}true{{repl else}}false{{repl end}}”
spec:
  backend:
    serviceName: frontend
    servicePort: 80
```

{{< template_function name="LicenseFieldValue" replicated="true" kubernetes="true" swarm="true" >}}
```go
func LicenseFieldValue(customLicenseFieldName string) string
```
Returns the value for the Custom License Field as a string.
```yaml
env:
- name: MAX_USERS
  value: '{{repl LicenseFieldValue "maximum_users" }}'
```

{{< template_function name="LicenseProperty" replicated="true" kubernetes="true" swarm="true" >}}
```go
func LicenseProperty(propertyName string) string
```
Returns a property from the License as a string.  Valid propertyNames are "assignee", "channel.name", "expiration.date", "expiration.policy", and "license.id".
```yaml
env:
- name: LICENSE_ID
  value: '{{repl LicenseProperty "license.id" }}'
```

{{< template_function name="AppID" replicated="true" kubernetes="true" swarm="true" >}}
```go
func AppID() string
```
Returns the app id.
```yaml
env:
- name: APP_ID
  value: '{{repl AppID }}'
```

{{< template_function name="AppVersion" replicated="true" kubernetes="true" swarm="true" >}}
```go
func AppVersion() int
```
Returns the app version sequence.
```yaml
env:
- name: APP_VERSION
  value: '{{repl AppVersion }}'
```

{{< template_function name="AppVersionFirst" replicated="true" kubernetes="true" swarm="true" >}}
```go
func AppVersionFirst() int
```
Returns the version sequence of the first version installed.
```yaml
env:
- name: APP_VERSION_FIRST
  value: '{{repl AppVersionFirst }}'
```

{{< template_function name="AppVersionCurrent" replicated="true" kubernetes="true" swarm="true" >}}
```go
func AppVersionCurrent() int
```
Returns the current app version sequence.
```yaml
env:
- name: APP_VERSION_CURRENT
  value: '{{repl AppVersionCurrent }}'
```

{{< template_function name="RunOffline" replicated="true" kubernetes="true" swarm="true" >}}
```go
func RunOffline() bool
```
Returns whether or not we are running in airgap mode.
```yaml
env:
- name: IS_AIRGAP
  value: '{{repl RunOffline }}'
```

{{< template_function name="AppSetting" replicated="true" kubernetes="true" swarm="true" >}}
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
env:
- name: VERSION
  value: '{{repl AppSetting "version.label"}}'
- name: RELEASE_NOTES
  value: '{{repl AppSetting "release.notes"}}'
- name: INSTALL_DATE
  value: '{{repl AppSetting "install.date"}}'
- name: RELEASE_DATE
  value: '{{repl AppSetting "release.date"}}'
- name: RELEASE_CHANNEL
  value: '{{repl AppSetting "release.channel"}}'
```

{{< template_function name="ConsoleSetting" replicated="true" kubernetes="true" swarm="true" >}}
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

{{< template_function name="ConsoleSettingEquals" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ConsoleSettingEquals(name string, value string) bool
```
Returns a bool indicating if the value is the currently applied value for ConsoleSetting with name.

{{< template_function name="ConsoleSettingNotEquals" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ConsoleSettingNotEquals(name string, value string) bool
```
Returns a bool indicating if the value is not the currently applied value for ConsoleSetting with name.

{{< template_function name="LdapCopyAuthFrom" replicated="true" kubernetes="true" swarm="true" >}}
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
env:
- name: LDAP_HOSTNAME
  value: '{{repl LdapCopyAuthFrom "Hostname"}}'
```

{{< template_function name="Now" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Now() string
```
Returns the current timestamp as an RFC3339 formatted string.
```yaml
env:
- name: START_TIME
  value: '{{repl Now }}'
```

{{< template_function name="NowFmt" replicated="true" kubernetes="true" swarm="true" >}}
```go
func NowFmt(format string) string
```
Returns the current timestamp as a formatted string. See Golang's time formatting guidelines [here](https://golang.org/pkg/time/#pkg-constants).
```yaml
env:
- name: START_DATE
  value: '{{repl Now "20060102" }}'
```

{{< template_function name="TrimSpace" replicated="true" kubernetes="true" swarm="true" >}}
```go
func TrimSpace(s string) string
```
Trim returns a string with all leading and trailing spaces removed.
```yaml
env:
- name: VALUE
  value: '{{repl ConfigOption "str_value" | TrimSpace }}'
```

{{< template_function name="Trim" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Trim(s string, args ...string) string
```
Trim returns a string with all leading and trailing string contained in the optional args removed (default space).
```yaml
env:
- name: VALUE
  value: '{{repl ConfigOption "str_value" | Trim " " "." }}'
```

{{< template_function name="Split" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Split(s string, sep string) []string
```
Split slices s into all substrings separated by sep and returns an array of the substrings between those separators.
```yaml
env:
- name: BROKEN_APART_A_B_C
  value: '{{repl Split "A,B,C" "," }}'
```

Combining `Split` and `index`:
Assuming the `github_url` param is set to `https://github.mycorp.internal:3131`, the following would set
`GITHUB_HOSTNAME` to `github.mycorp.internal`.
```yaml
env:
- name: GITHUB_HOSTNAME
  value: '{{repl index (Split (index (Split (ConfigOption "github_url") "/") 2) ":") 0}}'
```


{{< template_function name="ToLower" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ToLower(stringToAlter string) string
```
Returns the string, in lowercase.
```yaml
env:
- name: COMPANY_NAME
  value: '{{repl ConfigOption "company_name" | ToLower }}'
```

{{< template_function name="ToUpper" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ToUpper(stringToAlter string) string
```
Returns the string, in uppercase.
```yaml
env:
- name: COMPANY_NAME
  value: '{{repl ConfigOption "company_name" | ToUpper }}'
```

{{< template_function name="HumanSize" replicated="true" kubernetes="true" swarm="true" >}}
```go
func HumanSize(size interface{}) string
```
HumanSize returns a human-readable approximation of a size in bytes capped at 4 valid numbers (eg. "2.746 MB", "796 KB"). The size must be a integer or floating point number.
```yaml
env:
- name: MIN_SIZE_HUMAN
  value: '{{repl ConfigOption "min_size_bytes" | HumanSize }}'
```

{{< template_function name="UrlEncode" replicated="true" kubernetes="true" swarm="true" >}}
```go
func UrlEncode(stringToEncode string) string
```
Returns the string, url encoded.
```yaml
env:
- name: SMTP_CONNECTION_URL
  value: '{{repl ConfigOption "smtp_email" | UrlEncode }}:{{repl ConfigOption "smtp_password" | UrlEncode }}@smtp.example.com:587'
```

{{< template_function name="Base64Encode" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Base64Encode(stringToEncode string) string
```
Returns a Base64 encoded string.
```yaml
env:
- name: NAME_64_VALUE
  value: '{{repl ConfigOption "name" | Base64Encode }}'
```

{{< template_function name="Base64Decode" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Base64Decode(stringToDecode string) string
```
Returns decoded string from a Base64 stored value.
```yaml
env:
- name: NAME_PLAIN_TEXT
  value: '{{repl ConfigOption "base_64_encoded_name" | Base64Decode }}'
```

{{< template_function name="ParseBool" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ParseBool(str string) bool
```
ParseBool returns the boolean value represented by the string.
```yaml
env:
- name: VALUE
  value: '{{repl ConfigOption "str_value" | ParseBool }}'
```

{{< template_function name="ParseFloat" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ParseFloat(str string) float64
```
ParseFloat returns the float value represented by the string.
```yaml
env:
- name: VALUE
  value: '{{repl ConfigOption "str_value" | ParseFloat }}'
```

{{< template_function name="ParseInt" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ParseInt(str string, args ...int) int64
```
ParseInt returns the integer value represented by the string with optional base (default 10).
```yaml
env:
- name: VALUE
  value: '{{repl ConfigOption "str_value" | ParseInt }}'
```

{{< template_function name="ParseUint" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ParseUint(str string, args ...int) uint64
```
ParseUint returns the unsigned integer value represented by the string with optional base (default 10).
```yaml
env:
- name: VALUE
  value: '{{repl ConfigOption "str_value" | ParseUint }}'
```

{{< template_function name="Add" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Add(x interface{}, y interface{}) interface{}
```
Adds x and y.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer.
```yaml
env:
- name: MAX_USERS_PLUS_ONE
  value: '{{repl Add (LicenseFieldValue "maximum_users") 1}}'
```

{{< template_function name="Sub" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Sub(x interface{}, y interface{}) interface{}
```
Subtracts y from x.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer.
```yaml
env:
- name: MAX_USERS_MINUS_ONE
  value: '{{repl Sub (LicenseFieldValue "maximum_users") 1}}'
```

{{< template_function name="Mult" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Mult(x interface{}, y interface{}) interface{}
```
Multiplies x and y.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer.
```yaml
env:
- name: DOUBLE_NUM_ADDRESSES
  value: '{{repl Mult (NodePrivateIPAddressAll "DB" "redis" | len) 2}}'
```

{{< template_function name="Div" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Div(x interface{}, y interface{}) interface{}
```
Divides x by y.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer and will be rounded down.
```yaml
env:
- name: HALF_MAX_USERS
  value: '{{repl Div (LicenseFieldValue "maximum_users") 2.0}}'
```

{{< template_function name="Namespace" replicated="false" kubernetes="true" swarm="true" >}}
```go
func Namespace() string
```

Namespace returns the value of the namespace the vendor application is installed in.


{{< template_function name="PremkitAPIAddress" replicated="false" kubernetes="true" swarm="true" >}}
```go
PremkitAPIAddress() string
```

PremkitAPIAddress returns the address of the Premkit service in the cluster.

{{< template_function name="StatsdAddress" replicated="false" kubernetes="true" swarm="true" >}}
```go
StatsdAddress() string
```

StatsdAddress returns the address of the Statsd service in the cluster.

## Notes

When referencing another container in a template object, you must make sure the referenced container is started first.  Please see the [Events and Orchestration](/docs/packaging-an-application/events-and-orchestration/) section for more information on orchestrating container startup.

## Sprig

[Sprig 2.19.0 template functions](https://github.com/Masterminds/sprig) can be used with the `repl` prefix.

```yaml
env:
- name: HELLO
  value: '{{repl "hello!" | upper | repeat 5 }}'
```
