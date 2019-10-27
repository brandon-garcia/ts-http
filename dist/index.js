"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var https = require("https");
var HttpError = (function (_super) {
    __extends(HttpError, _super);
    function HttpError(message, response) {
        var _this = _super.call(this, message) || this;
        _this.response = response;
        return _this;
    }
    return HttpError;
}(Error));
exports.HttpError = HttpError;
exports.throwIfHttpError = function (response) {
    if (response.statusCode >= 400) {
        throw new HttpError("HTTP " + response.statusCode + " " + response.statusMessage, response);
    }
    return response;
};
exports.sendHttpRequest = function (options) {
    return new Promise(function (resolve, reject) {
        var req = https.request(options, function (res) {
            var data;
            var isError = false;
            res.on("data", function (chunk) {
                if (data == null) {
                    data = chunk.toString();
                }
                else {
                    data += chunk.toString();
                }
            });
            res.on("error", function (error) {
                reject(error);
                isError = true;
            });
            res.on("end", function () {
                if (!isError) {
                    if (res.statusCode == null) {
                        reject(new Error("missing status code"));
                        return;
                    }
                    if (res.statusMessage == null) {
                        reject(new Error("missing status message"));
                        return;
                    }
                    var response = {
                        data: data,
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
//# sourceMappingURL=index.js.map