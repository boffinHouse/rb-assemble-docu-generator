/*
 * rb-assemble-docu-generator
 * https://github.com/boffinHouse/rb-assemble-docu-generator
 *
 * Copyright (c) 2015 boffinhouse
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        loopfunc: true
      },
      all: ['Gruntfile.js', 'index.js', './lib/**/.js']
    },
    assemble: {
      options: {
        plugins: ['./index.js'],
        layout: ['test/sources/assemble/layouts/default_tpl.hbs'],
        partials: ['test/sources/assemble/partials/**/*.hbs']
      },
      docs: {
        options: {
          kssnode: {
            page: 'test/sources/assemble/docu/documentation.hbs',
            dest: 'test/dist',
            src: 'test/sources/sass', // Source directory with Stylesheets
            mask: '*.scss' // Optional filetype(s) to parse. Default to '*.css'
          }
        },
        files: [{
          expand: true,
          cwd: 'test/sources/assemble/docu',
          src: ['**/*.hbs'],
          dest: 'test/dist'
        }]
      }
    },
    clean: {
      actual: ['test/dist'],
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 3000,
          base: 'test/dist',
          keepalive: true,
          open: true
        }
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['jshint', 'clean', 'assemble']);

};
