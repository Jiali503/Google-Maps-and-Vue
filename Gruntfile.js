module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        outputStyle: "expanded",
        precision: 5
      },
      dist: {
        files: {
          './dist/styles.css': './src/scss/styles.scss'
        }
      }
    },
    concat: {
      options: {
        separator: '\n\n',
      },
      dist: {
        src: [
          './node_modules/jquery/dist/jquery.js',
          './node_modules/vue/dist/vue.js',
          './node_modules/http-vue-loader/src/httpVueLoader.js'
        ],
        dest: './dist/vendor.js'
      }
    },
    watch: {
      styles: {
        files: ['./src/scss/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.registerTask('default', ['sass', 'concat', 'watch']);
};
