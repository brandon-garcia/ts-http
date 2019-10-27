import * as https from "https";
import * as http from "http";

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
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res: http.IncomingMessage) => {
      let data: string | undefined;
      let isError = false;

      res.on("data", (chunk) => {
        if (data == null) {
          data = chunk.toString();
        } else {
          data += chunk.toString();
        }
      });

      res.on("error", (error) => {
        reject(error);
        isError = true;
      });

      res.on("end", () => {
        if (!isError) {
          if (res.statusCode == null) {
            reject(new Error("missing status code"));
            return;
          }

          if (res.statusMessage == null) {
            reject(new Error("missing status message"));
            return;
          }

          const response: IHttpResponse = {
            data,
            headers: res.headers,
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
          };

          resolve(response);
        }
      });
    });

    if ("data" in options) {
      req.write(options.data);
    }

    req.end();
  });
};
