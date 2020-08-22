var browserify = require('browserify');
var babelify = require("babelify");
var glob = require('glob');

var bundler = browserify();

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
    if (process.argv.length < 3 || process.argv[3] != 'dev') {
        process.env.NODE_ENV = 'production';
        bundler
            .transform('unassertify', { global: true })
            .transform('envify', {
                global: true,
                _: 'purge',
                NODE_ENV: "production"
            })
            .transform(babelify.configure({
                presets: ["@babel/preset-env", "@babel/preset-react"],
                plugins: ["@babel/plugin-proposal-class-properties"]
            }))
            .transform('uglifyify', { global: true })
            .plugin('common-shakeify')
            .plugin('browser-pack-flat/plugin')
            .bundle()
            .pipe(require('minify-stream')({ sourceMap: false }))
            .pipe(process.stdout);
    }
    else {
        process.env.NODE_ENV = 'development';
        bundler
            .transform('envify', {
                global: true,
                _: 'purge',
                NODE_ENV: "development"
            })
            .transform(babelify.configure({
                presets: ["@babel/preset-env", "@babel/preset-react"],
                plugins: ["@babel/plugin-proposal-class-properties"]
            }))
            .bundle()
            .pipe(process.stdout);
    }
});