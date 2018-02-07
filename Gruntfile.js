module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        outputStyle: "expanded",
        precision: 5
      },
      dist: {
        files: {
          './styles.css': './styles.scss'
        }
      }
    },
    watch: {
      styles: {
        files: ['./*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.registerTask('default', ['sass', 'watch']);
};
