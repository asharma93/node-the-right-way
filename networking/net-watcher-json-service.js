"use strict";

/* Run: node --harmony net-watcher-json-service.js
   Using JSON instead of plain text for communicating between service and client.
 */
const
    fs = require("fs"),
    net = require("net"),
    filename = process.argv[2], // 3rd cli argument

    server = net.createServer(function(connection) {

        // reporting: Write to the console and then to the client
        console.log("Subscriber connected");
        connection.write(JSON.stringify({
            type: "watching",
            file: filename
        }) + "\n");

        // watcher setup
        let watcher = fs.watch(filename, function() {
            connection.write(JSON.stringify({
                type: "changed",
                file: filename,
                timestamp: Date.now()
            }) + "\n");
        });

        // cleanup
        connection.on("close", function() {
            console.log("Subscriber disconnected.");
            watcher.close();
        })
    });

    if (!filename) {
        throw Error("No target filename was specified");
    }
    // TCP socket
    server.listen(5432, function() {
        console.log("Listening for subscribers...")
    });
