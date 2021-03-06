/*
 * grunt-adaptive-capture
 * 
 *
 * Copyright (c) 2016 Brian Bolli
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},
		// Configuration to be run (and then tested).
		rwd: {
			default_options: {
				options: {
				},
				links: []
			},
			custom_options: {
				options: {
					destination: "./screenshots/",
					breakpoints: [
						{
							name: "smartdevice",
							width: 1024,
							height: 768
						},
						{
							name: "desktop",
							width: 1280,
							height: 1024
						}
					]
				},
				links: [
					{
						name: "Google",
						target: "http://google.com"
					}
				]
			}
		},
		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'rwd', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
