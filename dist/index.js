"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var https = require("https");
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