var browserify = require('browserify'),
glob = require('glob');

var bundler = browserify();

console.error('Called with: ' + process.argv.slice(2));
var glob_pattern = process.argv[2];
if (glob_pattern.charAt(0) === "'") { // Needed for Windows compatibility
    glob_pattern = glob_pattern.slice(1, -1);
}

glob(glob_pattern, function (error, srcFiles) {
    if (error) { throw error; }
    srcFiles.forEach(function (srcFile) {
        console.error('- Adding', srcFile);
        bundler.add(srcFile);
    });

    bundler.bundle().pipe(process.stdout);
});