"use strict";
/*
    LDJ buffering client module. Responsible for handling split JSON messages.
    We use the 'stream' parameter to buffer input. The goal, to take the incoming raw data
    from the stream and convert it into message events containing the parse messages objects.
 */

const
    events = require("events"),
    util = require("util"),

    // client constructor
    LDJClient = function(stream) {
        events.EventEmitter.call(this); // similar to calling 'super()'
        let
            self = this,
            buffer = "";
    // First, we append raw data to the end of the buffer and then pull the completed messages off
    // the front. Each message is sent through JSON.parse() and finally emitted by LDJClient as a
    // message event view 'self.emit()'.
           stream.on("data", function(data) {
            buffer += data;
            let boundary = buffer.indexOf("\n");
            while (boundary !== -1) {
                let input = buffer.substr(0, boundary);
                buffer = buffer.substr(boundary + 1);
                self.emit("message", JSON.parse(input));
                boundary = buffer.indexOf("\n");
            }
        });
    };

util.inherits(LDJClient, events.EventEmitter);

// expose module methods
exports.LDJClient = LDJClient;
exports.connect = function(stream) {
    return new LDJClient(stream)
};