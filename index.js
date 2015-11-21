/*
 * rb-assemble-docu-generator
 */

'use strict';

var fs = require('fs-extra');
var kss = require('kss');
var _ = require('lodash-node');
var inflection = require('inflection');
var matter = require('gray-matter');



var LivingStyleguide = function(params, next) {
	var grunt = params.grunt;
	var assemble = params.assemble;



	next();
};

//LivingStyleguide.readFile = function() {
//	console.log(this.assemble);
//};

module.exports = exports = LivingStyleguide;
