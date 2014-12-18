var crypto = require('crypto');
var fs = require('fs');

// var mountFolder = function(connect, dir) {
//     return connect.static(require('path').resolve(dir));
// };

function createFileSha(filenane) {
	var sha = crypto.createHash('sha1');
	return sha.update(fs.readFileSync(filenane));
}

module.exports = function(grunt) {
	grunt.initConfig({
		meta: {
			version: '0.0.5'
		},
    express: {
      options: {
        // Override defaults here
        port:8080
      },
      dev: {
        options: {
          script: './app.js'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['public/js/**/*.js'],
        tasks:  [ 'express:dev'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      less: {
        files: ['public/less/**/*.less'],
        tasks:  [ 'less', 'hashres' ],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    glob_to_multiple: {
      expand: true,
      // flatten: true,
      bare:true,
      cwd: 'public',
      src: ['coffee/**/*.coffee'],
      dest: 'js/',
      ext: '.js'
    },
		// jshint: {
		// 	options: {
		// 		"asi" : false,
		// 		"bitwise" : true,
		// 		"boss" : false,
		// 		"curly" : true,
		// 		"debug": false,
		// 		"devel": false,
		// 		"eqeqeq": true,
		// 		"evil": false,
		// 		"expr": true,
		// 		"forin": false,
		// 		"immed": true,
		// 		"latedef" : false,
		// 		"laxbreak": false,
		// 		"multistr": true,
		// 		"newcap": true,
		// 		"noarg": true,
		// 		"node" : true,
		// 		"browser": true,
		// 		"noempty": false,
		// 		"nonew": true,
		// 		"onevar": false,
		// 		"plusplus": false,
		// 		"regexp": false,
		// 		"strict": false,
		// 		"sub": false,
		// 		"trailing" : true,
		// 		"undef": true,
		// 		globals: {
		// 			jQuery: true,
		// 			Backbone: true,
		// 			_: true,
		// 			$: true,
		// 			require: true,
		// 			define: true
		// 		}
		// 	},
			js: ['public/js/**/*.js', 'source/**/*.js']
		},

		requirejs: {
			js: {
				options: {
					baseUrl: "public/js",
					mainConfigFile: "public/js/main.js",
					name: 'main',
					out: "public/build/main.js"
				}
			},
			css: {
				options: {
					baseUrl: 'public/css',
					cssIn: "public/css/main.css",
					out: "public/build/main.css",
					cssImportIgnore: null,
					optimizeCss: 'default'
				}
			}
		},
    clean: {
      dev: './public/build/' 
    },

		hashres: {
			options: {
				fileNameFormat: '${name}-${hash}.${ext}'
			},
			prod: {
				src: [
					'public/build/main.js',
					'public/build/main.css'
				],
				dest: { src: 'tools/client/index.js', out: 'source/client/index.js' }
			}
		},
    less: {
      development: {
        options: {
        },
        files: {
          "public/css/main.css": "public/less/index.less"
        }
      }
    }
	});

	// Laoded tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-hashres2');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');



	// Default task.
	grunt.registerTask('default', [ 'requirejs', 'hashres']);
  grunt.registerTask('dev', ['clean', 'requirejs', 'less','hashres', 'express', 'watch']);


};
