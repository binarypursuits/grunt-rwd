"use strict";

var casper = require('casper').create();

var path = casper.cli.args[0];
var url = casper.cli.args[1];
var name = casper.cli.args[2];
var width = casper.cli.args[3];
var height = casper.cli.args[4];

casper.start(url, function() {
	this.echo('Current location is ' + this.getCurrentUrl(), 'info');
});

casper.then(function () {

	this.then(function () {
		this.viewport(width, height);
	});
	
	this.thenOpen(url, function () {
		//this.wait(5000);
		this.echo('Screenshot for ' + name + ' (' + width + 'x' + height + ')', 'info');
	});
	
	//this.then(function () {
	this.on("load.finished", function(){
		var _height = this.evaluate(function() {
			return document.body.clientHeight;
		});
		
		var _width = this.evaluate(function() {
			return document.body.clientWidth;
		});
		
		this.echo('Screenshot for ' + name + ' (' + width + 'x' + height + ')', 'info');
		
		this.capture(path + '/' + name + '/' + width + 'x' + height + '.png', {
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


