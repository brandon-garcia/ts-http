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
export interface IHttpError {
    message: string;
    response: IHttpResponse;
}
export declare class HttpError extends Error implements IHttpError {
    response: IHttpResponse;
    constructor(message: string, response: IHttpResponse);
}
export declare const throwIfHttpError: (response: IHttpResponse) => IHttpResponse;
export declare const sendHttpRequest: (options: IHttpRequest) => Promise<IHttpResponse>;
