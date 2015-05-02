"use strict";

/* Run: node --harmony net-watcher-json-service.js
    A test Service to ensure we can handle common errors, making this simple program
    more robust. This test will simulate sending a message (single block of JSON) in
    two chunks (which can happen, thus arriving in two separate parts)..
 */
const
    net = require("net"),
    server = net.createServer(function(connection) {

        // reporting: Write to the console and then to the client
        console.log("Subscriber connected");

        // send the first chunk immediattely
        connection.write(
            '{"type": "changed", "file": "targ'
        );

        // after one second, send the next chunk
        let timer = setTimeout(function() {
            connection.write(
                'et.txt", "timestamp": 1358175758495}' + "\n"
            );
            connection.end();
        }, 1000);

        // cleanup
        connection.on("end", function() {
            clearTimeout(timer);
            console.log("Subscriber disconnected.");
        });
    });

    // TCP socket
    server.listen(5432, function() {
        console.log("Test server listening for subscribers...")
    });
