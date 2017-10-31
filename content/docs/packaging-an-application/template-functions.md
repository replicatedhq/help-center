---
date: "2016-07-03T04:02:20Z"
title: "Template Functions"
description: "The dynamic configuration management functionality available throughout the Replicated YAML."
weight: "209"
categories: [ "Packaging an Application" ]
tags: [ "Application YAML" ]
index: "docs"
---

Template functions are marked by the double curly bracket + *"repl"* escape sequence. They allow for user input to be dynamically inserted into application configuration values. The sequence should be `{{repl`, not `{{ repl`.

Template functions that refer to your containers are always addressed in pairs with "component name" and "image name".  You should use the full image name as it appears in your container definition.

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
config_files:
- filename: /opt/certs/server.key
  contents: {{repl ConfigOptionData "ssl_key"}}
```

{{< template_function name="ConfigOptionEquals" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ConfigOptionEquals(optionName string, expectedValue string) bool
```
Returns true if the configuration option value is equal to the supplied value.
```yaml
ports:
   - private_port: "80"
     public_port: "80"
     port_type: tcp
     when: '{{repl ConfigOptionEquals "http_enabled" "1" }}'
```

{{< template_function name="ConfigOptionNotEquals" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ConfigOptionNotEquals(optionName string, expectedValue string) bool
```
Returns true if the configuration option value is not equal to the supplied value.
```yaml
ports:
   - private_port: "443"
     public_port: "443"
     port_type: tcp
     when: '{{repl ConfigOptionNotEquals "http_enabled" "1" }}'
```

{{< template_function name="NodePrivateIPAddress" replicated="true" kubernetes="false" swarm="false" >}}
```go
func NodePrivateIPAddress(componentName string, imageName string) string
```
Returns Private IP Address of a given Component as a string.

```yaml
env_vars:
- name: REDIS_HOST_PRIVATE
  value: '{{repl NodePrivateIPAddress "DB" "redis" }}'
```
Replaces HostPrivateIpAddress which is deprecated.

{{< template_function name="NodePrivateIPAddressFirst" replicated="true" kubernetes="false" swarm="false" >}}
```go
func NodePrivateIPAddressFirst(componentName string, imageName string) string
```
Returns the first node's Private IP Address of a given Component as a string.

{{< template_function name="NodePrivateIPAddressAll" replicated="true" kubernetes="false" swarm="false" >}}
```go
func NodePrivateIPAddressAll(componentName string, imageName string) []string
```
Returns node private IP addresses for all instances of a given Component as an array of strings.
Replaces HostPrivateIpAddressAll which is deprecated.

Note: `ContainerExposedPortAll`, `NodePrivateIPAddressAll`, `NodePublicIPAddressAll` are guaranteed to return in the same order

{{< template_function name="NodePublicIPAddress" replicated="true" kubernetes="false" swarm="false" >}}
```go
func NodePublicIPAddress(componentName string, imageName string) string
```
Returns Public IP Address of a given Component as a string.
```yaml
env_vars:
- name: REDIS_HOST_PUBLIC
  value: '{{repl NodePublicIPAddress "DB" "redis" }}'
```
Replaces HostPublicIpAddress which is deprecated.

{{< template_function name="NodePublicIPAddressFirst" replicated="true" kubernetes="false" swarm="false" >}}
```go
func NodePublicIPAddressFirst(componentName string, imageName string) string
```
Returns first node's public IP addresses for a given Component as a string.

{{< template_function name="NodePublicIPAddressAll" replicated="true" kubernetes="false" swarm="false" >}}
```go
func NodePublicIPAddressAll(componentName string, imageName string) []string
```
Returns node public IP addresses for all instances of a given Component as an array of strings.
Replaces HostPublicIpAddressAll which is deprecated.

Note: `ContainerExposedPortAll`, `NodePrivateIPAddressAll`, `Node PublicIPAddressAll` are guaranteed to return in the same order

{{< template_function name="ContainerExposedPort" replicated="true" kubernetes="false" swarm="false" >}}
```go
func ContainerExposedPort(componentName string, imageName string, internalPort string) string
```
Returns the node's public port mapped to the supplied exposed container port as a string.

```yaml
env_vars:
- name: REDIS_PORT
  value: '{{repl ContainerExposedPort "DB" "redis" "6379" }}'
```

{{< template_function name="ContainerExposedPortFirst" replicated="true" kubernetes="false" swarm="false" >}}
```go
func ContainerExposedPortFirst(componentName string, imageName string, internalPort string) string
```
Returns the first node's public port mapped to the supplied exposed container port as a string.

```yaml
env_vars:
- name: REDIS_PORT
  value: '{{repl ContainerExposedPortFirst "DB" "redis" "6379" }}'
```

{{< template_function name="ContainerExposedPortAll" replicated="true" kubernetes="false" swarm="false" >}}
```go
func ContainerExposedPortAll(componentName string, imageName string, internalPort string) string
```
Returns the node public port mapped to the supplied exposed container port for all instances of a given Component as an array of strings.

Note: `ContainerExposedPortAll`, `NodePrivateIPAddressAll`, `NodePublicIPAddressAll` are guaranteed to return in the same order

{{< template_function name="LicenseFieldValue" replicated="true" kubernetes="true" swarm="true" >}}
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

{{< template_function name="LicenseProperty" replicated="true" kubernetes="true" swarm="true" >}}
```go
func LicenseProperty(propertyName string) string
```
Returns a property from the License as a string.  Valid propertyNames are "assignee", "channel.name", "expiration.date", and "expiration.policy".
```yaml
config_files:
  - filename: /opt/app/config.yml
    contents: |
      expiration.date: {{repl LicenseProperty "expiration.date"}}
```

{{< template_function name="AppID" replicated="true" kubernetes="true" swarm="true" >}}
```go
func AppID() string
```
Returns the app id.
```yaml
env_vars:
- name: APP_ID
  value: '{{repl AppID }}'
```

{{< template_function name="AppVersion" replicated="true" kubernetes="true" swarm="true" >}}
```go
func AppVersion() int
```
Returns the app version sequence.
```yaml
env_vars:
- name: APP_VERSION
  value: '{{repl AppVersion }}'
```

{{< template_function name="AppVersionFirst" replicated="true" kubernetes="true" swarm="true" >}}
```go
func AppVersionFirst() int
```
Returns the version sequence of the first version installed.
```yaml
env_vars:
- name: APP_VERSION_FIRST
  value: '{{repl AppVersionFirst }}'
```

{{< template_function name="AppVersionCurrent" replicated="true" kubernetes="true" swarm="true" >}}
```go
func AppVersionCurrent() int
```
Returns the current app version sequence.
```yaml
env_vars:
- name: APP_VERSION_CURRENT
  value: '{{repl AppVersionCurrent }}'
```

{{< template_function name="RunOffline" replicated="true" kubernetes="true" swarm="true" >}}
```go
func RunOffline() bool
```
Returns whether or not we are running in airgap mode. This is available in the Kubernetes and Swarm implementations, but will always return false.
```yaml
env_vars:
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
env_vars:
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

{{< template_function name="ThisHostInterfaceAddress" replicated="true" kubernetes="false" swarm="false" >}}
Deprecated, please use ThisNodePublicIPAddress, ThisNodePrivateIPAddress or ThisNodeDockerAddress instead.
```go
func ThisHostInterfaceAddress(interfaceName string) string
```
Returns the valid IPv4 address associated with the given network interface of the host on which the current container instance is deployed as a string. For a clustered application this value will be different for each host.
```yaml
env_vars:
- name: CASSANDRA_BROADCAST_ADDRESS_INTERNAL
  value: '{{repl ThisHostInterfaceAddress "docker0" }}'
```

{{< template_function name="ThisNodePublicIPAddress" replicated="true" kubernetes="false" swarm="false" >}}
```go
func ThisNodePublicIPAddress() string
```
Returns the public IP address of the host on which the current container instance is deployed as a string. For a clustered application this value will be different for each host.
```yaml
env_vars:
- name: CASSANDRA_ADDRESS_PUBLIC
  value: '{{repl ThisNodePublicIPAddress }}'
```
Replaces ThisHostPublicIpAddress which is deprecated.

{{< template_function name="ThisNodePrivateIPAddress" replicated="true" kubernetes="false" swarm="false" >}}
```go
func ThisNodePrivateIPAddress() string
```
Returns the private IP address of the host on which the current container instance is deployed as a string. This address is either what was entered manually when host was provisioned or detected from eth0 interface by default. For a clustered application this value will be different for each host.
```yaml
env_vars:
- name: CASSANDRA_BROADCAST_ADDRESS_INTERNAL
  value: '{{repl ThisNodePrivateIPAddress }}'
```
Replaces ThisHostPrivateIpAddress which is depreciated.

{{< template_function name="ThisNodeDockerAddress" replicated="true" kubernetes="false" swarm="false" >}}
```go
func ThisNodeDockerAddress() string
```
Returns the docker0 address on the host on which the current container instance is deployed.
For a clustered application this value will be different for each host.

{{< template_function name="LDAPCopyAuthFrom" replicated="true" kubernetes="true" swarm="true" >}}
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
env_vars:
- name: LDAP_HOSTNAME
  value: '{{repl LdapCopyAuthFrom "Hostname"}}'
```

{{< template_function name="Now" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Now() string
```
Returns the current timestamp as an RFC3339 formatted string.
```yaml
env_vars:
- name: START_TIME
  value: '{{repl Now }}'
```

{{< template_function name="NowFmt" replicated="true" kubernetes="true" swarm="true" >}}
```go
func NowFmt(format string) string
```
Returns the current timestamp as a formatted string. See Golang's time formatting guidelines [here](https://golang.org/pkg/time/#pkg-constants.
```yaml
env_vars:
- name: START_DATE
  value: '{{repl Now "20060102" }}'
```

{{< template_function name="TrimSpace" replicated="true" kubernetes="true" swarm="true" >}}
```go
func TrimSpace(s string) string
```
Trim returns a string with all leading and trailing spaces removed.
```yaml
env_vars:
- name: VALUE
  value: '{{repl ConfigOption "str_value" | Trim }}
```

{{< template_function name="Trim" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Trim(s string, args ...string) string
```
Trim returns a string with all leading and trailing string contained in the optional args removed (default space).
```yaml
env_vars:
- name: VALUE
  value: '{{repl ConfigOption "str_value" | Trim " " "." }}
```

{{< template_function name="Split" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Split(s string, sep string) []string
```
Split slices s into all substrings separated by sep and returns an array of the substrings between those separators.
```yaml
env_vars:
- name: BROKEN_APART_A_B_C
  value: '{{repl Split "A,B,C" "," }}'
```

Combining `Split` and `index`:
Assuming the `github_url` param is set to `https://github.mycorp.internal:3131`, the following would set
`GITHUB_HOSTNAME` to `github.mycorp.internal`.
```yaml
env_vars:
- name: GITHUB_HOSTNAME
  value: '{{repl index (Split (index (Split (ConfigOption "github_url") "/") 2) ":") 0}}'
```


{{< template_function name="ToLower" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ToLower(stringToAlter string) string
```
Returns the string, in lowercase.
```yaml
env_vars:
- name: COMPANY_NAME
  value: '{{repl ConfigOption "company_name" | ToLower }}'
```

{{< template_function name="ToUpper" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ToUpper(stringToAlter string) string
```
Returns the string, in uppercase.
```yaml
env_vars:
- name: COMPANY_NAME
  value: '{{repl ConfigOption "company_name" | ToUpper }}'
```

{{< template_function name="HumanSize" replicated="true" kubernetes="true" swarm="true" >}}
```go
func HumanSize(size interface{}) string
```
HumanSize returns a human-readable approximation of a size in bytes capped at 4 valid numbers (eg. "2.746 MB", "796 KB"). The size must be a integer or floating point number.
```yaml
env_vars:
- name: MIN_SIZE_HUMAN
  value: '{{repl ConfigOption "min_size_bytes" | HumanSize }}
```

{{< template_function name="UrlEncode" replicated="true" kubernetes="true" swarm="true" >}}
```go
func UrlEncode(stringToEncode string) string
```
Returns the string, url encoded.
```yaml
env_vars:
- name: SMTP_CONNECTION_URL
  value: '{{repl ConfigOption "smtp_email" | UrlEncode }}:{{repl ConfigOption "smtp_password" | UrlEncode }}@smtp.example.com:587'
```

{{< template_function name="Base64Encode" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Base64Encode(stringToEncode string) string
```
Returns a Base64 encoded string.
```yaml
env_vars:
- name: NAME_64_VALUE
  value: '{{repl ConfigOption "name" | Base64Encode }}'
```

{{< template_function name="Base64Decode" replicated="true" kubernetes="true" swarm="true" >}}
```go
func Base64Decode(stringToDecode string) string
```
Returns decoded string from a Base64 stored value.
```yaml
env_vars:
- name: NAME_PLAIN_TEXT
  value: '{{repl ConfigOption "base_64_encoded_name" | Base64Decode }}'
```

{{< template_function name="ParseBool" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ParseBool(str string) bool
```
ParseBool returns the boolean value represented by the string.
```yaml
env_vars:
- name: VALUE
  value: '{{repl ConfigOption "str_value" | ParseBool }}'
```

{{< template_function name="ParseFloat" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ParseFloat(str string) float64
```
ParseFloat returns the float value represented by the string.
```yaml
env_vars:
- name: VALUE
  value: '{{repl ConfigOption "str_value" | ParseFloat }}'
```

{{< template_function name="ParseInt" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ParseInt(str string, args ...int) int64
```
ParseInt returns the integer value represented by the string with optional base (default 10).
```yaml
env_vars:
- name: VALUE
  value: '{{repl ConfigOption "str_value" | ParseInt }}'
```

{{< template_function name="ParseUint" replicated="true" kubernetes="true" swarm="true" >}}
```go
func ParseUint(str string, args ...int) uint64
```
ParseUint returns the unsigned integer value represented by the string with optional base (default 10).
```yaml
env_vars:
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
env_vars:
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
env_vars:
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
env_vars:
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
env_vars:
- name: HALF_MAX_USERS
  value: '{{repl Div (LicenseFieldValue "maximum_users") 2.0}}'
```

{{< template_function name="Namespace" replicated="false" kubernetes="true" swarm="true" >}}
```go
func Namespace() string
```

Namespace returns the value of the namespace the vendor application is installed in.

{{< template_function name="ServiceAddress" replicated="false" kubernetes="true" swarm="false" >}}
```go
ServiceAddress(name string, port int32) string
```

ServiceAddress returns the address of the ingress.

```yaml
properties:
  app_url: '{{repl ServiceAddress "frontend" 80 }}'
```

{{< template_function name="IngressAddress" replicated="false" kubernetes="true" swarm="false" >}}
```go
IngressAddress(name string, port int32) string
```

IngressAddress returns the address of the ingress.

```yaml
properties:
  app_url: '{{repl IngressAddress "frontend" 80 }}'
```

{{< template_function name="SwarmIngressAddress" replicated="false" kubernetes="false" swarm="true" >}}
```go
SwarmIngressAddress() string
```

SwarmIngressAddress returns the ingress address of the swarm cluster.

```yaml
properties:
  app_url: '{{repl SwarmIngressAddress }}'
```

{{< template_function name="PremitAPIAddress" replicated="false" kubernetes="true" swarm="true" >}}
```go
PremkitAPIAddress() string
```

PremkitAPIAddress returns the address of the Premkit service in the cluster.

```yaml
spec:
  containers:
  - name: myservice
    image: mycompany/myservice:1.0
    env:
    - name: REPLICATED_INTEGRATIONAPI
      value: {{repl PremkitAPIAddress }}
```

{{< template_function name="PremkitNetworkName" replicated="false" kubernetes="false" swarm="true" >}}
```go
PremkitNetworkName() string
```

PremkitNetworkName returns the name of the premkit docker network.

{{< template_function name="StatsdAddress" replicated="false" kubernetes="true" swarm="true" >}}
```go
StatsdAddress() string
```

StatsdAddress returns the address of the Statsd service in the cluster.

```yaml
spec:
  containers:
  - name: myservice
    image: mycompany/myservice:1.0
    env:
    - name: REPLICATED_STATSD_ADDRESS
      value: {{repl StatsdAddress }}
```

{{< template_function name="StatsdNetworkName" replicated="false" kubernetes="false" swarm="true" >}}
```go
StatsdNetworkName() string
```

StatsdNetworkName returns the name of the Statsd docker network.

## Notes

When referencing another container in a template object, you must make sure the referenced container is started first.  Please see the [Events and Orchestration](/docs/packaging-an-application/events-and-orchestration/) section for more information on orchestrating container startup.
