(function(){
	
	"use strict";

	var Promise = require('bluebird');
	var TaskQueue = require('./scripts/TaskQueue');
	var exec = require('child_process').exec;

	var endpointQueue = new TaskQueue(1);
	var breakpointQueue = new TaskQueue(1);
	
	var done;

	module.exports = function (grunt) {

		function ScrapeParams(destination, url, name, width, height)
		{
			this.destination = destination;
			this.url = url;
			this.name = name;
			this.width = width;
			this.height = height;
		}

		var spawnPromise = function(params)
		{
			return new Promise(function(resolve, reject){
				exec("casperjs ./tasks/scripts/adaptive.js " + params.destination + " " + params.url + " " + params.name + " " + params.width + " " + params.height, function(error, stdout, stderr){
					if (error) return reject(error);
					resolve(stdout);
				});
			});
		};
		
		var parseBreakpoints = function(endpoint, breakpoints, destination)
		{
			var length = breakpoints.length;

			if (length === 0)
			{
				return Promise.resolve();
			}
			
			grunt.log.writeln('Parsing ' + length + ' breakpoints...');

			return new Promise(function(resolve, reject){
				
				var completed = 0;
				
				for (var i = 0; i < length; i++)
				{
					(function(breakpoint){
						
						var task = function()
						{
							var params = new ScrapeParams(destination, endpoint.url, endpoint.name, breakpoint.width, breakpoint.height);
							return spawnPromise(params)
								.then(function(result){
									grunt.log.writeln(result);
									if (++completed === length)
									{
										resolve();
									}
								})
								.catch(reject);
						};
						
						breakpointQueue.pushTask(task);
						
					})(breakpoints[i]);
				}
				
			});
		};

		var parseEndpoints = function(endpoints, breakpoints, destination)
		{
			var length = endpoints.length;

			if (length === 0)
			{
				return Promise.resolve();
			}
			
			grunt.log.writeln('Parsing ' + length + ' endpoints...');

			return new Promise(function(resolve, reject){
				
				var completed = 0;
				
				for (var i = 0; i < length; i++)
				{
					(function(endpoint){
						var task = function() {
							return parseBreakpoints(endpoint, breakpoints, destination)
								.then(function(){
									if (++completed === length)
									{
										resolve();
									}
								})
								.catch(reject);
						};
						
						endpointQueue.pushTask(task);
						
					})(endpoints[i]);
				}
			});
		};

		grunt.registerTask("rwd", "Build task to capture images of various website pages and viewports to test responsive web design.", function () {

			done = this.async();
			
			var options = this.options({
				destination: "./build/screenshots/",
				endpoints: [
					{
						url: 'http://hilco',
						name: 'home'
					},
					{
						url: 'http://hilco/all-items',
						name: 'inventory'
					}

				],
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

			parseEndpoints(options.endpoints, options.breakpoints, options.destination)
				.then(function(){
					done();
				})
				.catch(function(e){
					grunt.fatal(e);
				});
		});

	};

})();