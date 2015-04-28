const
    fs = require("fs"),
    stream = fs.createReadStream(process.argv[2]).pipe(process.stdout);
stream.on("data", function(chunk) {
    process.stdout.write(chunk);
});
stream.on("error", function(err) {
    process.stdderr.write("ERROR: " + err.message + "\n");
});