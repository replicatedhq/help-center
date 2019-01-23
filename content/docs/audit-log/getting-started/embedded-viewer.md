---
date: "2016-07-03T04:02:20Z"
title: "Embedded Viewer"
description: "Embed the log viewer component into your frontend web app"
weight: "1605"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

Now that you've reported some audit events, it's time to expose them to your end users. The Replicated Audit Log has an advanced, customizable log viewer that you can embed into your own site. While APIs are available as well, the quickest way to expose events to your users is to embed the log viewer.

Note: Currently, a React-based site is required to embed the viewer, but support for embedding without React will be available soon.

## Installing
There are a few short steps to getting the embedded viewer integrated into your site.

<!-- todo add a swimlane diagram or something here -->

1. Install the `retraced-logs-viewer` package from npm and include in your site.
1. Request a viewer token from the Publisher API to identify which group/scope the viewer should be limited to. 
1. Render the `<RetracedEventsBrowser/>` React component as part of your application.


An example of this workflow can be found in the [retraced-demo-react](https://github.com/retracedhq/retraced-demo-react) project.

### Obtain a viewer token from the Publisher API

When using the embedded viewer component, the browser will communicate directly with the Audit Log API to search and show audit log events. Before that happens though, you need to create a short-lived "viewer token" to authenticate the user to the audit log API and ensure the shown events are scoped properly. While you can use a Publisher API token to retrieve a viewer token, the publisher token should never be sent down to the client. The retrieval of the viewer token should happen on the backend. A basic workflow might look like:

<!-- todo add a swimlane diagram or something here if not above -->

- A user loads or navigates to an audit log page in your app
- Your frontend makes a request to your backend to retrieve the viewer token
- Your backend verifies the identity of the user triggering the request 
- Your backend makes a request to retrieve a viewer token from the Publisher API (using your long-lived Publisher token)
- Your backend sends down the viewer token to the frontend
- Your frontend passes the viewer token to the Events Browser component

This is one example--depending on your architecture you may end up tweaking or expanding this workflow.

### Render the component

With a viewer token, you can render the events viewer:

Inside a React Component
```javascript
    function render() {
        return (
            <RetracedEventsBrowser
              auditLogToken=<YOUR_VIEWER_TOKEN>
              header="My Audit Log"
              mount={true} />
        )
    }
```

or, without JSX:
```html
ReactDOM.render(
  React.createElement(
    RetracedEventsBrowser,
    { auditLogToken: <VIEWER_TOKEN>, mount: true },
  ),
  document.getElementById('main')
);
```

Provided you've already [published some audit events](/docs/audit-log/getting-started/first-event), if everything is working, you should see something like 


![](/images/audit-log/embedded-viewer.png) 

#### Options
The embedded viewer supports quite a few options, but they all have defaults. The table below describes the keys that are possible to override in the component properties.

| Key | Default Value | Value Type | Description |
|--------|--------|-----------|-------------|
| admin  | `true` | `boolean` | A bool to indicate if the admin/settings button is possible to show. This will never force it to show, this setting is provided to completely disable this button at times. |
| export | `true` | `boolean` | A bool to indicate if the export button should be shown on the footer. |
| crud   | `cud`  | `string`  | The default search filter options to enable. By default, read items are not shown. |
| theme  | `light`| `string`  | The theme to use. Supports `dark` and `light`. |
| header | `Audit Log` | `string`  | A header to show beside the search box. |
| apiTokenHelpURL | https://preview.retraced.io/documentation/exposing-retraced-data/enterprise-api/ | `string`  | A help link for the "How to Use Audit Log API Tokens" text in the API tokens modal. |
| searchHelpURL   | https://preview.retraced.io/documentation/exposing-retraced-data/viewer/#search  | `string`  | A help link for the "Get Help With Search" text in search filters modal. |
| customClass   | ``  | `string`  | One or more space-separated CSS classes to apply to the outermost viewer `<div/>`
| host   | `https://api.retraced.io`  | `string`  | Viewer API host to use. Usually the same as your Publisher API base URL.
| mount   | `false`  | `boolean`  | Determines whether to mount the component. Handy if you need to wait until a token is returned from your backend.

