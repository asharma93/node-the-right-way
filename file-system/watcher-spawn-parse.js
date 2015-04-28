"use strict"

const
    fs = require("fs"),
    spawn = require("child_process").spawn,// require the child process module and only the 'spawn' func
    filename = process.argv[2]; // 3rd cli argument

if (!filename) {
    throw Error("A file to watch must be specified");
}
fs.watch(filename, function() {
    let // similar to var
        ls = spawn("ls", ["-lh", filename]),// ls <- process [-lh, filename] <- args
        output = "";
    ls.stdout.on("data", function(chunk) { // listen for data events
        output += chunk.toString();
    });
    ls.on("close", function() {
        let parts = output.split(/\s+/); // split sequence 1 or more whitespace regex
        console.dir([parts[0], parts[2], parts[8]]); // which parts to output
    });

});
console.log("Now watching " + filename + " for changes...");