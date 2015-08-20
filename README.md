# gulp-inject-version

Gulp plugin for reading a version number out of a JSON file and injecting it into text based files.

By default, this plugin will read the `version` property from your project's `package.json`. It will then search the content of all files in the stream for the text `%%GULP_INJECT_VERSION%%` and replace that text with `vX.Y.Z` _(where `X.Y.Z` is the version number it read from `package.json`)_.

## installation

### [npm](https://www.npmjs.com)
````bash
npm install gulp-inject-version
````

## usage
````javascript
var injectVersion = require('gulp-inject-version');

gulp.task('build', function () {
    return gulp.src('src/index.html')
        .pipe(injectVersion())
        // whatever else you want to do to index.html...
        .pipe(gulp.dest('dist'));
});
````

In this usage example, if `src/index.html` contained the html
````html
<div class="footer">My Project %%GULP_INJECT_VERSION%%</div>
````
and the `version` property in your project's `package.json` was set to `'1.0.3'`, then after running you'd find that `dist/index.html` now contains the replacement text:
````html
<div class="footer">My Project v1.0.3</div>
````

## options
An options object can be passed into the plugin like so:
````javascript
var injectVersion = require('gulp-inject-version');

gulp.task('build', function () {
    return gulp.src('src/index.html')
        .pipe(injectVersion({
            package_file: 'bower.json',
            // your other option overrides here
        }))
        // whatever else you want to do to index.html...
        .pipe(gulp.dest('dist'));
});
````

Option properties that you can override are:

Option property|type|description|default value
---------------|----|-----------|--------------
package_file     | string | The JSON containing file from which we should read the version                | 'package.json'
version_property | string | The name of the property that holds the version text within the JSON file     | 'version'
prepend          | string | A string to prepend to the outputted version text                             | 'v'
append           | string | A string to append to the outputted version text                              | ''
replace          | string | The placeholder text to be replaced with the version text in the source files | '%%GULP_INJECT_VERSION%%'