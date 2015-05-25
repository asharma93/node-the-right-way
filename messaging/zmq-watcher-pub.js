"use-strict";

/*
    ZeroMQ is a robust networking package that we will use in this section.
    This is the PUB portion of ZeroMQ that waits for subscribers to connect. Once connected,
    we send a blob of JSON down the wire each time the target.txt file is changed. All
    subscribers will receive the JSON.
    Run: node --harmony zmq-watcher-pub.js target.txt
*/

const
    fs = require("fs"),
    zmq = require("zmq"),
    // Create publisher endpoint
    publisher = zmq.socket("pub"),
    filename = process.argv[2];

fs.watch(filename, function() {
    // send message to any subscribers
    publisher.send(JSON.stringify({
        type: "changed",
        file: "filename",
        timestamp: Date.now()
    }));
});

// Listen on TCP port 5432
publisher.bind("tcp://*:5432", function(err) {
    console.log("Listening for zmq subscribers");
});
