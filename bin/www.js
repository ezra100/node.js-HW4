#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appX = require("../app");
const debugModule = require("debug");
const https = require("https");
const fs = require("fs");
const path = require("path");
let app = appX.default;
let debug = debugModule("hw5:server");
// since we cannot add an enviroment variable in VSCode we'll just enable it form here
debug.enabled = true;
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
/**
 * Create HTTPS server.
 */
var privateKey = fs.readFileSync(path.join(__dirname, "../cert/key.pem"), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, "../cert/cert.pem"), 'utf8');
var credentials = { key: privateKey, cert: certificate,
    passphrase: "asdf" };
let server = https.createServer(credentials, app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    debug("Listening on " + bind);
}
//# sourceMappingURL=www.js.map