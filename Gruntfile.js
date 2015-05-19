module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    src: 'app/src/',
    assets: 'app/dist/',

    sass: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= src %>sass',
          src: ['*.sass'],
          dest: '<%= src %>css',
          ext: '.css'
        }]
      }
    },

    jshint: {
      options: {
        globals: {
          jQuery: true
        }
      },
      files: ['<%= src %>js/main.js']
    },

    csslint: {
      lax: {
        options: {
          csslintrc: '.csslintrc'
        },
        src: '<%= src %>css/*.css'
      }
    },

    concurrent: {
      dev: {
        compile: ['sass'],
        autoprefix: ['autoprefix'],
        lint: ['jshint', 'csslint']
      }
    },

    autoprefixer: {
      no_dest: {
        src: '<%= src %>css/main.css'
      }
    },

    watch: {
      livereload: {
        files: ['app/**/*'],
        options: { livereload: true }
      },
      sass: {
        files: '<%= src %>sass/**/*',
        tasks: 'sass'
      },
      autoprefixer: {
        files: '<%= src %>css/main.css',
        tasks: 'autoprefixer'
      },
      jshint: {
        files: '<%= src %>js/**/*',
        options: { globals: { jQuery: true } },
        tasks: 'newer:jshint'
      },
      csslint: {
        files: '<%= src %>css/*',
        tasks: 'newer:csslint'
      }
    },

    clean: {
      prod: ['<%= assets %>javascripts/*.js', '<%= assets %>stylesheets/*.css']
    },

    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      static: {
        files: {
          '<%= assets %>javascripts/application.min.js': ['<%= src %>js/vendor/*.js', '<%= src %>js/main.js']
        }
      }
    },

    cssmin: {
      static: {
        files: {
          '<%= assets %>stylesheets/application.min.css': ['<%= src %>css/vendor/*.css', '<%= src %>css/main.css']
        }
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= src %>css',
          src: ['*.css', '!main.css'],
          dest: '<%= assets %>stylesheets',
          ext: '.min.css'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  

  grunt.registerTask('default', 'Default Task Alias', ['dev']);

  grunt.registerTask('dev', ['concurrent:dev', 'sass', 'watch']);
  grunt.registerTask('prod', ['clean:prod', 'newer:uglify', 'newer:cssmin']);
};

