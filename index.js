/*
 * rb-assemble-docu-generator
 */

'use strict';

var fs = require('fs-extra');
var kss = require('kss');
var _ = require('lodash-node');
var inflection = require('inflection');
var matter = require('gray-matter');



var livingStyleguide = function(params, next) {
	var grunt = params.grunt;
	var assemble = params.assemble;
	var kssOptions = assemble.options.kssnode || {};

	this.readNewFile();


	fs.readFile(kssOptions.src, 'utf8', function() {

	});

	next();
};

livingStyleguid.prototype = {
	readNewFile: function() {
		console.log('hello');
	}
};

//LivingStyleguide.readFile = function() {
//	console.log(this.assemble);
//};

module.exports = exports = livingStyleguide;
