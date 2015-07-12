module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngAnnotate: {
      options: {
      	singleQuotes: true,
      	separator: ';'
      },
      app1: {
      	files: {/*
      		'app.js': [
          'public/assets/js/module.config.js',
      		'public/assets/js/controllers/mainCtrl.js',
      		'public/assets/js/controllers/addCarCtrl.js',
      		'public/assets/js/controllers/addCardCtrl.js',
      		'public/assets/js/controllers/addNoteCtrl.js',
      		'public/assets/js/controllers/carCtrl.js',
      		'public/assets/js/controllers/cardCtrl.js',
      		'public/assets/js/controllers/delCarCtrl.js',
      		'public/assets/js/controllers/detCarCtrl.js',
      		'public/assets/js/controllers/editCarCtrl.js',
      		'public/assets/js/controllers/guestCtrl.js',
      		'public/assets/js/controllers/noteCtrl.js',
      		'public/assets/js/controllers/panelCtrl.js',
      		'public/assets/js/controllers/settingsCtrl.js',
      		'public/assets/js/directives/fileSelector.js',
      		'public/assets/js/directives/userMenuToggle.js']*/
      		'public/assets/js/app.min.js' : ['public/assets/js/lib/angular-ui-router.min.js', 'public/assets/js/lib/ui-bootstrap-custom-tpls-0.12.0.min.js', 'public/assets/js/app.min.js']
      	}
      }
    },
    uglify: {
    	my_target: {
    		files: {
    			'public/assets/js/app.min.js': ['app.js']
    		}
    	}
    }
  });
grunt.loadNpmTasks('grunt-ng-annotate', 'grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-uglify');
};