module.exports = function(grunt) {
  // plugin configuration
  grunt.initConfig({
    uglify: {
      myTarget: {
        files: {
          "public/javascripts/vendor/all.js": ["public/javascripts/vendor/all.js"],
        },
      },
    },
    bower_concat: {
      all: {
        dest: "public/javascripts/vendor/all.js",
        dependencies: {
          "underscore": "jquery",
          "backbone": "underscore",
        },
      },
    },
    handlebars: {
      all: {
        files: {
          "public/javascripts/handlebarsTemplates.js": ["handlebars/**/*.hbs"]
        },
        options: {
          processContent: removeWhitespace,
          processName: extractFileName
        }
      }
    }
  });
  
  // load tasks
  ["grunt-bower-concat", "grunt-contrib-uglify", "grunt-contrib-handlebars"].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });
  
  // register default task
  grunt.registerTask("default", ["bower_concat", "uglify"]);
};

// helper functions
function removeWhitespace(template) {
  return template.replace(/ {2,}/mg, '').replace(/\r|\n/mg, '');
}

function extractFileName(file) {
  return file.match(/\/(.+).hbs$/).pop();
}