module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        copy: {
            main: {
                files: [{
                    expand: true, // set to true to enable the below options.
                    cwd: 'bower_components',
                    flatten: true, // remove all paths from src dir.
                    src: ['knockout/dist/knockout.js', 'q/q.js', 'requirejs/require.js', 'jquery/dist/jquery.js'],
                    dest: 'app/www/lib/'
                }]
            }
        },
        run: {
            options: {
                cwd: 'app'
            },
            server: {
                args: ['app.js']
            }
        }
    });

    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-run');

    // Register the grunt tasks.
    grunt.registerTask('dev', ['copy', 'run']);
    grunt.registerTask('default', ['dev']);
};