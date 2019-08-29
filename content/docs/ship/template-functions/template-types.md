---
date: "2018-05-02T01:19:20Z"
title: "Template Function Types"
description: "Types of template functions available in Ship"
weight: "45002"
categories: [ "Ship Template Functions" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Replicated Ship Template Functions" >}}

Template functions are the key to providing dynamic contents or behavior within a Ship application.
They can be used to generate the contents of rendered files, skip unneeded steps, and provide more relevant messaging to users, along with a multitude of other things.
Ship template functions extend those available within the [text/template](https://golang.org/pkg/text/template/) package of Go.

All Ship template functions must begin with `{{repl`, rather than the standard `{{`. See [Static Functions](#static-functions) for some examples.

{{< linked_headline "Template Function List" >}}

The many template functions available within Ship can be thought of as belonging to several categories.

{{< linked_headline "Sprig" >}}

Many of the utility functions provided come from Sprig, a third-party library of Go template functions. 
The Sprig documentation can be found [here](https://masterminds.github.io/sprig/).

{{< linked_headline "Static Functions" >}}

Additional utility functions, shared with Replicated Vendor.
Implementations of these functions can be found [here](https://github.com/replicatedhq/ship/blob/master/pkg/templates/static_context.go).

{{< template_function name="Now" >}}
```go
func Now() string
```
Returns the current timestamp as an RFC3339 formatted string.
```yaml
'{{repl Now }}'
```

{{< template_function name="NowFmt" >}}
```go
func NowFmt(format string) string
```
Returns the current timestamp as a formatted string. See Go's time formatting guidelines [here](https://golang.org/pkg/time/#pkg-constants).
```yaml
'{{repl Now "20060102" }}'
```

{{< template_function name="ToLower" >}}
```go
func ToLower(stringToAlter string) string
```
Returns the string, in lowercase.
```yaml
'{{repl ConfigOption "company_name" | ToLower }}'
```

{{< template_function name="ToUpper" >}}
```go
func ToUpper(stringToAlter string) string
```
Returns the string, in uppercase.
```yaml
'{{repl ConfigOption "company_name" | ToUpper }}'
```

{{< template_function name="TrimSpace" >}}
```go
func TrimSpace(s string) string
```
Trim returns a string with all leading and trailing spaces removed.
```yaml
'{{repl ConfigOption "str_value" | TrimSpace }}'
```

{{< template_function name="Trim" >}}
```go
func Trim(s string, args ...string) string
```
Trim returns a string with all leading and trailing string contained in the optional args removed (default space).
```yaml
'{{repl ConfigOption "str_value" | Trim " " "." }}'
```

{{< template_function name="UrlEncode" >}}
```go
func UrlEncode(stringToEncode string) string
```
Returns the string, url encoded.
Equivalent to the [`QueryEscape`](https://godoc.org/net/url#QueryEscape) function within the golang `net/url` library.
```yaml
'{{repl ConfigOption "smtp_email" | UrlEncode }}:{{repl ConfigOption "smtp_password" | UrlEncode }}@smtp.example.com:587'
```

{{< template_function name="UrlEncode" >}}
```go
func UrlPathEscape(stringToEncode string) string
```
Returns the string, url *path* encoded.
Equivalent to the [`PathEscape`](https://godoc.org/net/url#PathEscape) function within the golang `net/url` library.
```yaml
'{{repl ConfigOption "smtp_email" | UrlPathEscape }}:{{repl ConfigOption "smtp_password" | UrlPathEscape }}@smtp.example.com:587'
```

{{< template_function name="Base64Encode" >}}
```go
func Base64Encode(stringToEncode string) string
```
Returns a Base64 encoded string.
```yaml
'{{repl ConfigOption "name" | Base64Encode }}'
```

{{< template_function name="Base64Decode" >}}
```go
func Base64Decode(stringToDecode string) string
```
Returns decoded string from a Base64 stored value.
```yaml
'{{repl ConfigOption "base_64_encoded_name" | Base64Decode }}'
```

{{< template_function name="Split" >}}
```go
func Split(s string, sep string) []string
```
Split slices s into all substrings separated by sep and returns an array of the substrings between those separators.
```yaml
'{{repl Split "A,B,C" "," }}'
```

Combining `Split` and `index`:
Assuming the `github_url` param is set to `https://github.mycorp.internal:3131`, the following would set
`GITHUB_HOSTNAME` to `github.mycorp.internal`.
```yaml
'{{repl index (Split (index (Split (ConfigOption "github_url") "/") 2) ":") 0}}'
```

{{< template_function name="RandomString" >}}
```go
func RandomString(length uint64, providedCharset ...string) string
```
Returns a random string with the desired length and charset.
Provided charsets must be Perl formatted and match individual characters.
If no charset is provided, `[_A-Za-z0-9]` will be used.

Each time that this function is called, it will return a different value.
```yaml
'{{repl RandomString 64}}'
```
Or for a total of 64 `a`s and `b`s:
```yaml
'{{repl RandomString 64 "[ab]" }}'
```

{{< template_function name="Add" >}}
```go
func Add(x interface{}, y interface{}) interface{}
```
Adds x and y.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer.
```yaml
'{{repl Add (LicenseFieldValue "maximum_users") 1}}'
```

{{< template_function name="Sub" >}}
```go
func Sub(x interface{}, y interface{}) interface{}
```
Subtracts y from x.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer.
```yaml
'{{repl Sub (LicenseFieldValue "maximum_users") 1}}'
```

{{< template_function name="Mult" >}}
```go
func Mult(x interface{}, y interface{}) interface{}
```
Multiplies x and y.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer.
```yaml
'{{repl Mult (NodePrivateIPAddressAll "DB" "redis" | len) 2}}'
```

{{< template_function name="Div" >}}
```go
func Div(x interface{}, y interface{}) interface{}
```
Divides x by y.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer and will be rounded down.
```yaml
'{{repl Div (LicenseFieldValue "maximum_users") 2.0}}'
```

{{< template_function name="ParseBool" >}}
```go
func ParseBool(str string) bool
```
ParseBool returns the boolean value represented by the string.
```yaml
'{{repl ConfigOption "str_value" | ParseBool }}'
```

{{< template_function name="ParseFloat" >}}
```go
func ParseFloat(str string) float64
```
ParseFloat returns the float value represented by the string.
```yaml
'{{repl ConfigOption "str_value" | ParseFloat }}'
```

{{< template_function name="ParseInt" >}}
```go
func ParseInt(str string, args ...int) int64
```
ParseInt returns the integer value represented by the string with optional base (default 10).
```yaml
'{{repl ConfigOption "str_value" | ParseInt }}'
```

{{< template_function name="ParseUint" >}}
```go
func ParseUint(str string, args ...int) uint64
```
ParseUint returns the unsigned integer value represented by the string with optional base (default 10).
```yaml
'{{repl ConfigOption "str_value" | ParseUint }}'
```

{{< template_function name="HumanSize" >}}
```go
func HumanSize(size interface{}) string
```
HumanSize returns a human-readable approximation of a size in bytes capped at 4 valid numbers (eg. "2.746 MB", "796 KB"). The size must be a integer or floating point number.
```yaml
'{{repl ConfigOption "min_size_bytes" | HumanSize }}'
```

{{< template_function name="KubeSeal" >}}
```go
func KubeSeal(certData string, namespace string, name string, value string) string
```

{{< linked_headline "Installation Context Functions" >}}

Functions that refer to properties of the running ship installation, such as the license ID or app release notes.
Implementations of these functions can be found [here](https://github.com/replicatedhq/ship/blob/master/pkg/templates/installation_context.go).

{{< template_function name="ShipCustomerRelease" >}}
```go
func ShipCustomerRelease() string
```
ShipCustomerRelease returns a copy of the release metadata struct, marshalled as yaml.
```yaml
'{{repl ShipCustomerRelease }}'
```

{{< template_function name="EntitlementValue" >}}
```go
func EntitlementValue(name string) string
```
EntitlementValue returns the value of the entitlement with the provided name.
```yaml
'{{repl EntitlementValue "numSeats" }}'
```

{{< template_function name="LicenseFieldValue" >}}
```go
func LicenseFieldValue(name string) string
```
LicenseFieldValue returns the value of the entitlement with the provided name. Is an alias for EntitlementValue.
```yaml
'{{repl LicenseFieldValue "numSeats" }}'
```

{{< template_function name="CollectSpec" >}}
```go
func CollectSpec() string
```
CollectSpec returns the Collect Spec currently promoted to the channel to which your license is associated.
```yaml
'{{repl CollectSpec }}'
```

{{< template_function name="AnalyzeSpec" >}}
```go
func AnalyzeSpec() string
```
AnalyzeSpec returns the Analyze Spec currently promoted to the channel to which your license is associated.
```yaml
'{{repl AnalyzeSpec }}'
```

{{< template_function name="Installation" >}}
```go
func Installation(field string) string
```
Possible Options:

| Key | Type |
| --- | ---- |
| state_file_path | string |
| customer_id | string |
| semver | string |
| channel_name | string |
| channel_id | string |
| release_id | string |
| installation_id | string |
| release_notes | []string |
| app_slug | []string |
| license_id | string |

Installation returns the value of the property with the provided key.
```yaml
'{{repl Installation "license_id" }}'
```

{{< linked_headline "Config Context Functions" >}}

Functions that refer to 
Implementations of these functions can be found [here](https://github.com/replicatedhq/ship/blob/master/pkg/templates/config_context.go).

{{< template_function name="ConfigOption" >}}
```go
func ConfigOption(optionName string) string
```
Returns the value of the config option as a string.
The config screen and associated options are described [here](/docs/ship/config/overview).
```yaml
'{{repl ConfigOption "hostname" }}'
```

{{< template_function name="ConfigOptionData" >}}

```go
func ConfigOptionData(fileName string) string
```
Returns the base64 decoded value of a config option.
```yaml
'{{repl ConfigOptionData "ssl_key"}}'
```

{{< template_function name="ConfigOptionEquals" >}}
```go
func ConfigOptionEquals(optionName string, expectedValue string) bool
```
Returns true if the configuration option value is equal to the supplied value.
```yaml
'{{repl ConfigOptionEquals "http_enabled" "1" }}'
```

{{< template_function name="ConfigOptionNotEquals" >}}
```go
func ConfigOptionNotEquals(optionName string, expectedValue string) bool
```
Returns true if the configuration option value is not equal to the supplied value.
```yaml
'{{repl ConfigOptionNotEquals "http_enabled" "1" }}'
```

{{< linked_headline "Ship Context Functions" >}}

Functions that refer to parts of Ship's state.
This includes paths to generated kubeconfigs and utilities to generate public key infrastructure.
Implementations of these functions can be found [here](https://github.com/replicatedhq/ship/blob/master/pkg/templates/ship_context.go).

{{< template_function name="AmazonEKS" >}}

```go
func AmazonEKS(cluster string) string
```
Returns the path to the generated kubeconfig for the cluster created with the named AmazonEKS asset.
```yaml
'{{repl AmazonEKS "my_cluster"}}'
```

{{< template_function name="GoogleGKE" >}}

```go
func GoogleGKE(cluster string) string
```
Returns the path to the generated kubeconfig for the cluster created with the named GoogleGKE asset.
```yaml
'{{repl GoogleGKE "my_cluster"}}'
```

{{< template_function name="AzureAKS" >}}

```go
func AzureAKS(cluster string) string
```
Returns the path to the generated kubeconfig for the cluster created with the named AzureAKS asset.
```yaml
'{{repl AzureAKS "my_cluster"}}'
```



{{< template_function name="GetCaKey" >}}

```go
func GetCaKey(caName string, caType string) string
```
Returns a key for a certificate authority with the desired properties.
If a CA with this name has been requested before, the same value will be returned.
The type can be RSA or ECDSA, with acceptable values being `rsa-2048`, `rsa-4096`, `rsa-8192`, `P256` or `P521`.
If no type is provided, `rsa-2048` will be used.
```yaml
'{{repl GetCaKey "my_certificate_authority" "P521"}}'
```

{{< template_function name="GetCaCert" >}}

```go
func GetCaCert(caName string) string
```
Returns a cert for a previously generated certificate authority.
Must be called after `GetCaKey` has been called for the desired CA name.
```yaml
'{{repl GetCaCert "my_certificate_authority"}}'
```


{{< template_function name="GetKey" >}}

```go
func GetKey(certName string, caName string, hosts string, certType string) string
```
Returns a key for a cert with the desired properties.
`hosts` is a set of hosts that the certificate should be valid for, seperated by commas, such as `example1.com,subdomain.example.io`.
If a cert with this name has been requested before, the same value will be returned, even if other request parameters differ.
If a CA with the desired name has been requested before, that CA will be used to sign the generated cert for the requested hosts.
If a CA with the desired name has not been requested before, one will be generated with the same type as this cert.
The type can be RSA or ECDSA, with acceptable values being `rsa-2048`, `rsa-4096`, `rsa-8192`, `P256` or `P521`.
If no type is provided, `rsa-2048` will be used.
```yaml
'{{repl GetKey "my_cert" "my_certificate_authority" "example.com,myexampleapp.io,help.replicated.com" "P521"}}'
```

{{< template_function name="GetCert" >}}

```go
func GetCert(caName string) string
```
Returns a cert for a previously generated key.
Must be called after `GetKey` has been called for the desired cert name.
```yaml
'{{repl GetCert "my_cert"}}'
```
