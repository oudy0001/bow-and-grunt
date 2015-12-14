module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.  
copy: {
  main: {
    files: [

      // flattens results to a single level
      {expand: true, flatten: true, src: [ "bower_components/jquery/dist/*.js", "bower_components/bootstrap/dist/js/*.js"], dest: 'dist/js', filter: 'isFile'},
      {expand: true, flatten: true, src: [ "bower_components/bootstrap/dist/css/*.css", "bower_components/font-awesome/css/*.css"], dest: 'dist/css', filter: 'isFile'},
      {expand: true, flatten: true, src: [ "www/*"], dest: 'dist', filter: 'isFile'},

    ],
  },
},
      uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: ['dist/js/events.js',
              'bower_components/jquery/dist/jquery.js',
              'bower_components/bootstrap/dist/js/bootsrtap.js',
             ],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    }, 
      cssmin: {
  target: {
    files: [{
      expand: true,
        flatten: true,
      src: ['www/styles/*.css', 'bower_components/bootstrap/dist/css/bootstrap.css', 'bower_components/font-awesome/css/font-awesome.css'],
      dest: 'dist/css',
      ext: '.min.css'
    }]
  }
},
      logvar: 
      {
          data: '<%= pkg.author.name %>'
      },
      clean: {
          js: ['dist/*/*.js','!dist/*/*.min.js'],
          css: ['dist/*/*.css','!dist/*/*.min.css'],
          other: ['dist/*.min.map']
        }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

//  grunt.registerTask('logvar', function(){
//	grunt.log.write(grunt.config.get('logvar').data);
//});
  // Default task.
  grunt.registerTask('default', ['copy', 'uglify', 'cssmin', 'clean']);
    
};
