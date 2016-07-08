# grunt-rwd

> Screen capture various RWD Breakpoints

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-rwd --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-rwd');
```

## The "rwd" task

### Overview
In your project's Gruntfile, add a section named `rwd` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  rwd: {
    options: {
      // Task-specific options go here.
	  destination: "./screenshots",
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
    },
    links: [
      // Target-specific internal pages here.
		{
			name: "Google",
			target: "http://google.com"
		}
    ],
  },
});
```

### Options

#### options.destination
Type: `String`
Default value: `'./screenshots'`

A string value that determines where all images will be saved

#### options.breakpoints
Type: `Array`
Default value: `'[
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
			]'`

An Array of breakpoints that is used to generate the various screenshots for each supplied link.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
	rwd: {
		options: {
			destination: './build/screens',
			breakpoints:
			[
				{
					name: "desktop",
					width: 1920,
					height: 1080
				},
				{
					name: "smartdevice",
					width: 1024,
					height: 768
				}
			]
		},
		links:
		[
			{
				name: "Google",
				target: "http://google.com"
			}
		]
	},
});
```

## Release History
_(Nothing yet)_
