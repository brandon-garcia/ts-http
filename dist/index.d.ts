/// <reference types="node" />
import * as https from "https";
import * as http from "http";
export interface IHttpRequest extends https.RequestOptions {
    data?: string | Buffer;
}
export interface IHttpResponse {
    headers: http.IncomingHttpHeaders;
    data?: string;
    statusCode: number;
    statusMessage: string;
}
export declare const sendHttpRequest: (options: IHttpRequest) => Promise<IHttpResponse>;
