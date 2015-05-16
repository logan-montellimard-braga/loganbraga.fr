module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.initConfig({
    concat: {
      js: {
        options: {
          separator: ';\n',
        },
        src: [
          'app/bower_components/particles.js/particles.js',
          'app/bower_components/foundation/js/vendor/fastclick.js',
          'app/bower_components/angular/angular.js',
          'app/bower_components/angular-route/angular-route.js',
          'app/bower_components/angular-animate/angular-animate.js',
          'app/bower_components/lodash/lodash.js',
          'app/bower_components/angular-google-maps/dist/angular-google-maps.js',
          'app/app.js',
          'app/components/*/*.js'
        ],
        dest: 'app/assets/js/prod_app.js'
      },
      css: {
        options: {
          separator: '\n',
        },
        src: [
          'app/assets/css/vendor/loaders.custom.min.css',
          'app/bower_components/foundation/css/normalize.min.css',
          'app/assets/css/vendor/foundation.custom.min.css',
          'app/assets/css/app.css'
        ],
        dest: 'app/assets/css/prod_app.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 versions', '> 5%', 'last 3 Android versions', 'last 2 BlackBerry versions', 'ie 8', 'ie 9']
      },
      css: {
        src: 'app/assets/css/prod_app.css'
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      css: {
        files: {
          'app/assets/css/prod_app.min.css': ['app/assets/css/prod_app.css']
        }
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      js: {
        files: {
          'app/assets/js/prod_app.min.js': ['app/assets/js/prod_app.js']
        }
      }
    }
  });

  grunt.registerTask('prod', 'Prepare for production by running all tasks', function() {
    grunt.task.run([
      'concat',
      'autoprefixer',
      'cssmin',
      'uglify'
    ]);
  });
};
