const fs = require("fs");
fs.writeFile("target.txt", "Writing to file", function(err) {
    if (err) {
        throw err
    }
    console.log("File Saved!");
})