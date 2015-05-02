"use strict";

/*  Run: node --harmony net-watcher-json-client.js
    Using JSON instead of plain text for communicating between service and client.
 */

const
    net = require("net"),
    client = net.connect({port: 5432});

client.on("data", function(data) {
    let message = JSON.parse(data);
    if (message.type === "watching") {
        console.log("Now watching: " + message.file);
    } else if (message.type === "changed") {
        let date = new Date(message.timestamp);
        console.log("File " + message.file + "changed at " + date);
    } else {
        console.log(message);
        throw Error("Unrecognized message type");
    }
});