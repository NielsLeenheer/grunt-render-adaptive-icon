module.exports = function(grunt) {

    grunt.initConfig({
        rendericon: {
            android_icons: {
                options: {
                    foreground: 'example/template/foreground.png',
                    background: 'example/template/background.png',
                    mask: 'example/template/mask.png',
                    shadow: 'example/template/shadow.png',
                    crop: { width: 768, height: 768, left: 128, top: 128 }
                },

                files: [
                    { width: 36, height: 36, dest: 'example/output/ldpi-icon.png' },
                    { width: 48, height: 48, dest: 'example/output/mdpi-icon.png' },
                    { width: 72, height: 72, dest: 'example/output/hdpi-icon.png' },
                    { width: 96, height: 96, dest: 'example/output/xhdpi-icon.png' },
                    { width: 144, height: 144, dest: 'example/output/xxhdpi-icon.png' },
                    { width: 192, height: 192, dest: 'example/output/xxxhdpi-icon.png' },
                    { 
                        width: 512, height: 512, dest: 'example/output/google-play.png', 
                        mask: false, crop: { width: 720, height: 720, left: 152, top: 152 } 
                    }
                ]
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.registerTask('test', 'rendericon:android_icons');
};
