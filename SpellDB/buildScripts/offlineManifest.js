const glob = require('glob');
const fs = require("fs");
glob("www/**/*.*", function (err, files) {
    var manifest = "CACHE MANIFEST\r\n";
    manifest += "# Cache Buster UTC Offset: " + Date.now() + "\r\n";
    manifest += "# Cache Everything\r\n\r\n";

    files.forEach(v => {
        if (v != "/www/manifest.appcache") {
            manifest += v.substr(4) + "\r\n"; // don't need the "www/" part
        }
    });

    manifest += "\r\nNETWORK:\r\n*\r\n";
    fs.writeFileSync("www/manifest.appcache", manifest);
})