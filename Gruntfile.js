module.exports = function(grunt) {

	var gzip = require("gzip-js");

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
						'src/core/isFunction.js',
						'src/core/isArray.js',
						'src/core/noop.js',
						'src/core/loupe.js',
						'src/core/extend.js',
						'src/core/cls.js',
						'src/core/each.js',
						'src/core/selector.js',
						'src/core/clear.js',
						'src/event/event.js',
						'src/color/hexMap.js',
						'src/color/random.js',
						'src/math/math.js',
						'src/math/d.js',
						'src/math/color.js',
						'src/math/transform.js',
						'src/math/numeric.js',
						'src/animation/timer.js',
						'src/animation/linear.js',
						'src/animation/animate.js',
						'src/dom/attr.js',
						'src/dom/create.js',
						'src/dom/style.js',
						'src/data/analyze_linear.js',
						'src/data/data.js',
						'src/data/linear_sync.js',
						'src/data/sync.js',
						'src/transformations/linear.js',
						'src/transformations/transform.js',
						'src/engines/engines.js',
						'src/engines/svg/shape.js',
						'src/engines/svg/text.js',
						'src/engines/svg/line.js',
						'src/engines/svg/circle.js',
						'src/engines/svg/polyline.js',
						'src/engines/svg/polygon.js',
						'src/engines/svg/rect.js',
						'src/engines/svg/path.js',
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
	grunt.registerTask( "default", [ "concat", "uglify",  "compare_size" ] );
};