"use strict";

/* Run: node --harmony net-watcher.js target.txt
   Run: nc -U /tmp/watcher.sock (nc stands for NetCat - TCP/UDP for Unix machines. Local.)

   Firstly, we create a server object that includes 3 callback function
    -   Reports that the connection has been established (both to client with
        connection.write and to the console.
    -   Begins listening for changes to the target file and sends changed info to
        the client through 'connection.write.'
    -   Listen for and handle the connections 'close' event. Stop watching the file using
        the watcher object 'watcher.close'.
 */
const
    fs = require("fs"),
    net = require("net"),
    filename = process.argv[2], // 3rd cli argument

    server = net.createServer(function(connection) {

        // reporting: Write to the console and then to the client
        console.log("Subscriber connected");
        connection.write("Now watching " + filename + " for changes... \n");

        // watcher setup
        let watcher = fs.watch(filename, function() {
            connection.write("File " + filename + " changed: " + Date.now() + "\n");
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
    //server.listen(5432, function() {
    //    console.log("Listening for subscribers...")
    //});
    // Unix Socket:
    server.listen("/tmp/watcher.sock", function() {
        console.log("Listening for subscribers...")
    });
