module.exports = function(grunt) {
    const eachAsync = require('each-async');
    const mkdirp = require('mkdirp');
    const path = require('path');
    const sharp = require('sharp');
    const chalk = require('chalk');

    grunt.registerMultiTask('rendericon', 'Create a pre-rendered adaptive icon for Android', function() {
        const done = this.async();
        const options = this.options({
            foreground: null,
            background: null,
            mask: null,
            crop: {width: 0, height: 0, left: 0, top: 0},
            width: 0,
            height: 0,
        });

        eachAsync(this.files, (file, index, next) => {
            const dest = file.dest;
            const foreground = options.foreground;
            const background = options.background;
            const mask = options.mask;
            const shadow = options.shadow;
            const crop = options.crop;
            const width = file.width ? file.width : options.width;
            const height = file.height ? file.height : options.height;

            mkdirp.sync(path.dirname(dest));

            sharp(background)
                .composite([{input: foreground}])
                .toBuffer()
                .then((buffer) => {
                    sharp(buffer)
                        .composite([{input: mask, blend: 'dest-in'}])
                        .toBuffer()
                        .then((buffer) => {
                            sharp(shadow)
                                .composite([{input: buffer}])
                                .toBuffer()
                                .then((buffer) => {
                                    sharp(buffer)
                                        .extract(crop)
                                        .resize(width, height)
                                        .toFile(dest)
                                        .then(() => {
                                            grunt.log.writeln(
                                                chalk.green('✔ ') + dest +
                                                chalk.gray(' (' + width + ' x ' + height + ')')
                                            );

                                            next();
                                        })
                                        .catch((error) => {
                                            grunt.warn(error);
                                            next(error);
                                        });
                                })
                                .catch((error) => {
                                    grunt.warn(error);
                                    next(error);
                                });
                        })
                        .catch((error) => {
                            grunt.warn(error);
                            next(error);
                        });
                })
                .catch((error) => {
                    grunt.warn(error);
                    next(error);
                });
        }, (error) => {
            if (error) {
                grunt.warn(error);
                done(error);
            } else {
                done();
            }
        });
    });
};
