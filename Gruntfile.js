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
    secret: grunt.file.readJSON('secret.json'),
    sshexec: {
      deploy: {
        command: [
          'cd /home/danny/public/fitb.apps.swa.by/',
          'git pull',
          'sudo npm install',
          '<%= secret.password %>',
          'bower install',
          'forever stop app.js',
          'forever start app.js'
        ],
        options: {
          path: '/home/danny/public/fitb.apps.swa.by/',
          host: '<%= secret.host %>',
          privateKey: grunt.file.read("id_rsa"),
          username: '<%= secret.username %>',
          password: '<%= secret.password %>',
          showProgress: true
        }
      }
    },
    express: {
      options: {
        // Override defaults here
        port:8000,
        node_env: 'development'
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
      api: {
        files: ['source/api/*'],
        task: [ 'express:dev'],
        options: {
          spawn: false
        }
      },
      less: {
        files: ['public/**/*.less'],
        tasks:  [ 'less', 'hashres' ],
        options: {
          spawn: false,
          livereload: true
        }
      }
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
          "public/css/main.css": "public/less/global.less"
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
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ssh');
  // grunt.loadNpmTasks('grunt-contrib-coffee');



	// Default task.
	grunt.registerTask('default', [ 'requirejs', 'hashres']);
  grunt.registerTask('dev', ['clean', 'requirejs', 'less','hashres:prod', 'express', 'watch']);
  grunt.registerTask('build', [ 'clean', 'requirejs', 'less','hashres']);
  grunt.registerTask('deploy',['sshexec:deploy']);

};
