"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = require("agile-client/dist");
/**
 * WebSocket client that communicates in a Request-Response manner with the server
 */
var WebsocketAgileClient = /** @class */ (function () {
    function WebsocketAgileClient(config) {
        this.clientConfig = config;
    }
    /**
     * Connect to the WebSocket server
     */
    WebsocketAgileClient.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // connect to the WebSocket server
            _this.ws = new WebSocket(_this.clientConfig.serverUrl);
            _this.ws.onopen = function () {
                // connection established
                // create the AC instance
                _this.ac = new dist_1.AgileClient(_this.clientConfig.requestTimeout);
                // overwrite the default message handler of the AC
                _this.ac.handleMessage = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return _this.handleMessage.apply(_this, args);
                };
                // the client is now connected to the WebSocket server
                resolve();
            };
            _this.ws.onerror = function (err) {
                // connection failed
                reject(err);
            };
            // wait for messages from the WebSocket server
            _this.ws.onmessage = function (event) {
                // configure the AC to handle the messages received over the WebSocket connection
                _this.ac.receiveMessage(_this.ws, event.data);
            };
        });
    };
    /**
     * TO BE OVERWRITTEN
     * Handle a received message. By default, always respond with an ACK
     */
    WebsocketAgileClient.prototype.handleMessage = function (message, executor) {
        executor.resolve('OK');
    };
    /**
     * Send a message to the WebSocket server
     */
    WebsocketAgileClient.prototype.sendMessage = function (message) {
        // send messages through the AC
        return this.ac.sendMessage(this.ws, message);
    };
    return WebsocketAgileClient;
}());
exports.WebsocketAgileClient = WebsocketAgileClient;
