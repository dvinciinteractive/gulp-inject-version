var fs = require('fs'),
    through = require('through2'),
    gutil = require('gulp-util'),
    plugin_name = 'gulp-inject-version',
    defaults = {
        package_file: 'package.json',
        version_property: 'version',
        prepend: 'v',
        append: '',
        replace: '%%GULP_INJECT_VERSION%%'
    };

module.exports = function (opts) {
    var opt_key,
        inject = function (file, encoding, callback) {
            var package_obj,
                version_text;

            if (file.isNull()) {
                return callback(null, file);
            }

            if (file.isStream()) {
                return callback(new gutil.PluginError(plugin_name, 'doesn\'t support Streams'));
            }

            fs.readFile(opts.package_file, 'utf8', function (err, data) {
                if (err) {
                    return callback(new gutil.PluginError(plugin_name, opts.package_file + ' could not be read.\n\t' + err.toString()));
                } else {
                    try {
                        package_obj = JSON.parse(data);

                        if (package_obj[opts.version_property]) {
                            version_text = [
                                opts.prepend,
                                package_obj[opts.version_property],
                                opts.append,
                            ].join('');

                            file.contents = new Buffer(file.contents.toString().replace(opts.replace, version_text));
                            callback(null, file);
                        } else {
                            return callback(new gutil.PluginError(plugin_name, opts.version_property + ' not found in package data object.'));
                        }
                    } catch (ignore) {
                        return callback(new gutil.PluginError(plugin_name, opts.package_file + ' not valid JSON'));
                    }
              }
            });
        };

    opts = opts || {};

    for (opt_key in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, opt_key)) {
            opts[opt_key] = (opts[opt_key] !== undefined) ? opts[opt_key] : defaults[opt_key];
        }
    }

    return through.obj(inject);
};