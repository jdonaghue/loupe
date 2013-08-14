module.exports = function(grunt) {

	var gzip = require("gzip-js");

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// qunit: {
		// 	files: [ 
		// 		"test/css3-compat/css3-compat.html?engine=peppy#target", 
		// 		"test/jquery/jquery1.html", 
		// 		"test/jquery/jquery2.html" 
		// 	]
		// },
		concat: {
			dist: {
				options: {
					process: function(src, filepath) {

						return (filepath != 'src/start.js' && filepath != 'src/end.js' ? '// Source: ' + filepath + '\n' : '') + src;
					},
				},
				files: {
					'dist/loupe.js': [
						'src/start.js',  
						'src/core/extend.js',
						'src/core/cls.js',
						'src/core/each.js',
						'src/core/fn.js',
						'src/core/noop.js',
						'src/core/loupe.js',
						'src/core/selector.js',
						'src/dom/create.js',
						'src/data/data.js',
						'src/data/sync.js',
						'src/transformations/linear.js',
						'src/transformations/transform.js',
						'src/engines/svg/circle.js',
						'src/engines/svg/rect.js',
						'src/engines/svg/svg.js',
						'src/end.js'
					],
					'loupe.js': ['dist/loupe.js']
				},
			},
		},
		uglify: {
			all: {
				files: {
					"dist/loupe.min.js": [ "dist/loupe.js" ]
				},
				options: {
					compress: { evaluate: false },
					sourceMap: "dist/loupe.min.map",
					beautify: {
						ascii_only: true
					}
				}
			}
		},
		compare_size: {
			files: [ "dist/loupe.js", "dist/loupe.min.js" ],
			options: {
				compress: {
					gz: function( contents ) {
						return gzip.zip( contents, {} ).length;
					}
				},
				cache: "dist/.sizecache.json"
			}
		}
	});

	grunt.registerTask( "commit", function( message ) {
		// Always add dist directory
		exec( "git add dist && git commit -m " + message, this.async() );
	});

	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-compare-size");

	// Default task
	//grunt.registerTask( "default", [ "qunit", "concat", , "uglify", "compare_size" ] );
	grunt.registerTask( "default", [ "concat", "uglify",  "compare_size" ] );

};