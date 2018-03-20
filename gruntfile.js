/*

  This gruntfile checks all .scss files in 'source' and compiles
  them to .css and .min.css in 'destination'. After, it runs the 
  files through postcss autoprefixer. To customize this package, 
  edit the 'Package Information' area below.

*/

module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    // Package Information
    name: 'shortnote',
    source: 'src',
    destination: 'dist',

    // Grunt Task
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options:{
          style:'expanded',
        },
        files: {
          '<%= destination %>/<%= name %>.css' : '<%= source %>/<%= name %>.scss'
        }
      },
      prod: {
        options: {
          style: 'compressed',
        },
        files: {
          '<%= destination %>/<%= name %>.min.css' : '<%= source %>/<%= name %>.scss'
        }
      }
    },
    postcss:{
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      dist: {
        src: '<%= destination %>/*.css'
      }
    },
    watch: {
      css: {
        files: '<%= source %>/*.scss',
        tasks: ['sass', 'postcss']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.registerTask('default',['watch']);

}