"use-strict";

var casper = require('casper').create();
var breakpoints = require('./breakpoints.json');

var url, page;

var pad = function (number)
{
	var r = String(number);
	if (r.length === 1)
	{
		r = '0' + r;
	}
	return r;
};

var screenshotNow = new Date(),
	screenshotDateTime = screenshotNow.getFullYear() + pad(screenshotNow.getMonth() + 1) + pad(screenshotNow.getDate()) + '-' + pad(screenshotNow.getHours()) + pad(screenshotNow.getMinutes());

if (casper.cli.args.length < 2) {
	casper
		.echo("Usage: $ casperjs adaptive.js http://example.com homepage")
		.exit(1)
		;
} else {
	url = casper.cli.args[0];
	page = casper.cli.args[1];
}

casper.start(url, function () {
	this.echo('Current location is ' + this.getCurrentUrl(), 'info');
});

casper.each(breakpoints, function (casper, breakpoint) {

	this.then(function () {
		this.breakpoint(breakpoint.width, breakpoint.height);
	});
	
	this.thenOpen(url, function () {
		this.wait(5000);
	});
	
	this.then(function () {
		var _height = this.evaluate(function() {
			return document.body.clientHeight;
		});
		
		var _width = this.evaluate(function() {
			return document.body.clientWidth;
		});
		
		this.echo('Screenshot for ' + breakpoint.name + ' (' + breakpoint.width + 'x' + breakpoint.height + ')', 'info');
		this.capture('./build/screenshots/' + screenshotDateTime + '/' + page + '/' + breakpoint.name + '-' + breakpoint.width + 'x' + breakpoint.height + '.png', {
			top: 0,
			left: 0,
			width: _width,
			height: _height
		});
	});
	
});

casper.then(function () {
	this.exit();
});

casper.run();






