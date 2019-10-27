# @bcg-ts/http

Lightweight wrapper around nodejs https requests.

# Install

```
npm install --save --save-exact @bcg-ts/http
```

# Code Overview (src/index.ts)

```
export interface IHttpRequest extends https.RequestOptions {
  data?: string|Buffer;
}

export interface IHttpResponse {
  headers: http.IncomingHttpHeaders;
  data?: string;
  statusCode: number;
  statusMessage: string;
}

export const sendHttpRequest = (options: IHttpRequest): Promise<IHttpResponse> => {
  // ...
};

```

# Example Usage

```
import {sendHttpRequest} from "@bcg-ts/http";

sendHttpRequest({
  hostname: "hostname.com"
  port: 443,
  path: "/my-path",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  data: JSON.stringify({ hello: "world" ]),
})
  .then((response) => {
    console.log(`received response: HTTP ${response.statusCode}`);
  });
```
