/*
 * rb-assemble-docu-generator
 */

'use strict';

var fs = require('fs-extra');
var kss = require('kss');
var _ = require('lodash-node');
var inflection = require('inflection');
var matter = require('gray-matter');
var helpers = require('../lib/helpers');


module.exports = function(params, fn) {
	var grunt = params.grunt;
	var assemble = params.assemble;
	var kssOptions = assemble.options.kssnode || {};


	console.log('Running "assemble-docu-generator" plugin...');



	fs.readFile(kssOptions.page, 'utf8', function(err, data) {

		if(err) {return fn(err);}

		//Check if options.src is an directory
		if(!fs.lstatSync(kssOptions.src).isDirectory()) {
			return fn(new Error('"' + kssOptions.src + '" is not a directory'));
		}


		kss.traverse(kssOptions.src, {mask: kssOptions.mask || '*.css'}, function(err, kssData) {
			assembleDocumentation(assemble, data, kssData, kssOptions, function(err, data) {
				if (err) { return fn(err); }

				fn();
			});
		});
	});

	/**
	 * Generate static html files from KSS documentation with assemble
	 *
	 * @param {Object} assemble Main Assemble object.
	 * @param {String} page Handlebars layout content.
	 * @param {Object} kssData KSS Node Styleguide collection.
	 * @param {Object} options Options.
	 * @param {Function} next Callback.
	 */
	function assembleDocumentation(assemble, page, kssData, options, next) {
		var pageObj;
		var sections = kssData.section();
		var sectionRoots = [];
		var pages = {};
		var parsedPage = matter(page);


		//utils.createDataLookup(options.dest, 'assemble-newdata', page);
		fs.writeFile(options.dest + '/assemble-data.json', JSON.stringify(page,null, 2), function() {
			console.log("arguments", arguments);
		});

		if(!sections.length) {
			return next(new Error('No KSS documentation is found in source files.'));
		}

		//Gather all of the sections first indexes in case they don't have a main element.
		sections.forEach(function(section, i) {
			var rootSection = section.reference().match(/[0-9]*[a-zA-z]*\.?/)[0].replace('.', '');

			fs.writeFile(options.dest + '/kss-section-' + i +'.json', JSON.stringify(section,null, 2), function() {});

			//Check if rootSection already exist
			if(!~sectionRoots.indexOf(rootSection)) {
				sectionRoots.push(rootSection);
			}
		});

		sectionRoots.sort();

		sectionRoots.forEach(function(section, i) {
			var sectionRoot = kssData.section(section);
			var pageContext = _.clone(parsedPage.data, true);
			var childSections = [];
			//Todo change this to error if no title is found
			var sectionTitle = (typeof sectionRoot.header === 'function') ? sectionRoot.header() : '';
			var assembleCollections = assemble.options.collections;
			childSections  = kssData.section(section + '.*');


			pageObj = {
				data: _.extend(pageContext, {
					sections: getDataSections(childSections),
					sectionRootNumber: section,
					sectionRoots: sectionRoots,
					title: sectionTitle
				}),
				dest: options.dest + '/documentation-' + sectionTitle.toLowerCase() + '.html',
				page: parsedPage.content
			};

			//add KSS data to assemble
			assembleCollections.pages.items[0].pages.push(pageObj);

			//_(assembleCollections).forEach(function(item, i) {
			//
			//	assembleCollections[i] = assemble.util.update(item, pageObj, pageContext);
			//});
		});

		return next();
	}

	/**
	 * Convert an array of `section` to a Data object.
	 *
	 * @param {Array} sections List of sections.
	 */
	function getDataSections(sections) {

		sections = sections.map(function(section) {
			var sectionData = {
				header: section.header(),
				description: section.description(),
				reference: section.reference(),
				depth: section.depth(),
				deprecated: section.deprecated(),
				experimental: section.experimental(),
				markup: section.markup(),
				modifiers: dataModifiers(section.modifiers()),
				parentRef: ''
			};

			return sectionData;
		});

		return sections;
	}

	/**
	 * Convert an array of `KssModifier` instances to an Data object
	 *
	 * @param {Array} modifiers List of modifiers.
	 */
	function dataModifiers(modifiers) {
		return modifiers.map(function(modifier) {
			return {
				name: modifier.name(),
				description: modifier.description(),
				className: modifier.className(),
				modifierMarkup: modifier.markup()
			};
		});
	}
};

module.exports.options = {
  stage: 'assemble:post:pages'
};



