"use-strict";

/*
    This is the SUB portion of ZeroMQ. We are explicitly subscribing
    to all messages on port 5432 calling 'subscriber.subscribe("")'.
    This tells ZeroMQ that we want to receive all messages. We can target
    specific messages by providing a String that acts as a prefix filter.
    Run: node --harmony zmq-watcher-sub.js
 */
const
    zmq = require("zmq"),
    // create the subscriber endpoint
    subscriber = zmq.socket("sub");

// subscribe to all messages
subscriber.subscribe("");

// handle messages from publisher
subscriber.on("message", function(data) {
    let
        message = JSON.parse(data),
        date = new Date(message.timestamp);
    console.log("File '" + message.file + "' changed at " + date);
});

// Establishing the connection. Connect to a publisher
subscriber.connect("tcp://localhost:5432");