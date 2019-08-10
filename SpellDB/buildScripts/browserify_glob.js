var browserify = require('browserify');
var babelify = require("babelify");
var glob = require('glob');

var bundler = browserify();

console.error('Called with: ' + process.argv.slice(2));
var glob_pattern = process.argv[2];
if (glob_pattern.charAt(0) === "'") { // Needed for Windows compatibility
    glob_pattern = glob_pattern.slice(1, -1);
}
process.env.NODE_ENV = 'production';

glob(glob_pattern, function (error, srcFiles) {
    if (error) { throw error; }
    var i = 0;
    srcFiles.forEach(function (srcFile) {
        if (true || (i < 18 && srcFile != "src/scripts/main.jsx" && srcFile != "src/scripts/Views/BasePage.jsx" && srcFile != "src/scripts/Views/Spells/SpellList.jsx")) {
            console.error('- Adding', srcFile);
            bundler.add(srcFile);
        }
        i++;
    });
    bundler
        .transform('unassertify', { global: true })
        .transform('envify', {
            global: true,
            _: 'purge',
            NODE_ENV: "production"
        })
        .transform(babelify.configure({
            presets: ["@babel/preset-env", "@babel/preset-react"]
        }))
        .transform('uglifyify', { global: true })
        .plugin('common-shakeify')
        .plugin('browser-pack-flat/plugin')
        .bundle()
        .pipe(require('minify-stream')({ sourceMap: false }))
        .pipe(process.stdout);
});