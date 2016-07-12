/*
 * grunt-rwd
 * http://gruntjs.com/
 *
 * Copyright (c) 2016 Binary Pursuits All Rights Reserved
 * Licensed under the MIT license.
 */

"use strict";

var fs = require("fs");

module.exports = function (grunt) {

	grunt.registerMultiTask("rwd", "Capture various screenshots", function () {

		var done = this.async();
		
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			destination: "./screenshots/",
			breakpoints: [
				{
					name: "smartphone-portrait",
					width: 320,
					height: 480
				},
				{
					name: "smartphone-landscape",
					width: 480,
					height: 320
				},
				{
					name: "tablet-portrait",
					width: 768,
					height: 1024
				},
				{
					name: "tablet-landscape",
					width: 1024,
					height: 768
				},
				{
					name: "desktop-standard",
					width: 1280,
					height: 1024
				},
				{
					name: "desktop-large",
					width: 1920,
					height: 1080
				}
			]
		});

		var length = this.data.links.length;
		var current = 0;

		this.data.links.forEach(function (link) {

			fs.writeFileSync(__dirname + "/breakpoints.json", JSON.stringify(options.breakpoints));

			grunt.util.spawn({
				cmd: "casperjs",
				args: [__dirname + "/scripts/adaptive.js", link.target, link.name],
				fallback: function (error, result, code)
				{
					if (error)
					{
						return grunt.fail.fatal(error);
					}

					console.log("result -> ", result);
					console.log("code -> ", code);
				}
			},
			function () {

				current++;

				grunt.log.writeln("Finished link " + current);

				if (current === length)
				{
					done();
				}

			});
		});

	});

};
