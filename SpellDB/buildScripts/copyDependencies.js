const fs = require("fs");
const path = require("path");
const glob = require('glob');

glob("node_modules/@fortawesome/fontawesome-free/webfonts/*.*", function (error, srcFiles) {
    if (error) { throw error; }
    srcFiles.forEach(function (srcFile) {

        console.error('- Copying', srcFile, "to", "www/webfonts/" + path.basename(srcFile));
        fs.copyFileSync(srcFile, "www/webfonts/" + path.basename(srcFile));
    });
});
