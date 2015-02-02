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
    gitcommit: {
      your_target: {
        options: {
          message: 'Deploy Commit',
          cwd: "."
        },
        files: [
          {
            src: ["public/js/*","source/api/*","source/middleware/*","less/*", "Gruntfile.js"],
            expand: true
          }
        ]
      }
    },
		meta: {
			version: '0.0.5'
		},
    secret: grunt.file.readJSON('secret.json'),
    sshconfig: {
      bonerjs: {
        privateKey: grunt.file.read("id_rsa"),
        host: '<%= secret.host %>',
        username: '<%= secret.username %>',
        password: '<%= secret.password %>',
      }
    },
    sshexec: {
      deploy: {
        command: [
          'cd /home/<%= secret.username %>/public/<%= secret.host %>/',
          'git stash',
          'git pull origin master',
          'echo <%= secret.password %> | sudo -S sudo npm install',
          // 'sudo npm install',
          'bower install',
          'grunt build',
          'forever stop app.js',
          'export NODE_ENV=production',
          'forever start app.js',
          'forever list'
        ].join(' && '),
        options: {
          config: 'bonerjs',
          showProgress: true
        }
      },
      test: {
        command: 'sudo uptime',
        options: {
          config: 'bonerjs',
          pty: true
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
  grunt.loadNpmTasks('grunt-git');
  // grunt.loadNpmTasks('grunt-contrib-coffee');



	// Default task.
	grunt.registerTask('default', [ 'requirejs', 'hashres']);
  grunt.registerTask('dev', ['clean', 'requirejs', 'less','hashres:prod', 'express', 'watch']);
  grunt.registerTask('build', [ 'clean', 'requirejs', 'less','hashres']);
  grunt.registerTask('deploycommit',['gitcommit','sshexec:deploy']);
  grunt.registerTask('deploy',['gitcommit','sshexec:deploy']);


};
