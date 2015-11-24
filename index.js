/*
 * rb-assemble-docu-generator
 */

'use strict';

const kss = require('kss');
const _ = require('lodash-node');
const inflection = require('inflection');
const matter = require('gray-matter');
const promise = require('bluebird');
const fs = promise.promisifyAll(require('fs-extra'));



function livingStyleguide(params, next)  {
	var kssData;
	const grunt = params.grunt;
	const assemble = params.assemble;
	const kssOptions = assemble.options.kssnode;
	let parsedPage = fs.readFileSync(kssOptions.page, 'utf8');


	fs.readFileAsync(kssOptions.page, 'utf8')
		.then(function(data) {
			console.log(data);
		});
	//Check if options.src is an directory
	if(!fs.lstatSync(kssOptions.src).isDirectory()) {
		return next(new Error('"' + kssOptions.src + '" is not a directory'));
	}

	//kss.traverse(kssOptions.src, {mask: kssOptions.mask || '.css'}, (err, kssData) => {
	//	getRootSections(kssData);
	//
	//	return next();
	//});


	//Gather all of the sections first indexes in case they don't have a main element.
	var getRootSections = (kssData) => {
		let sections = kssData.section() || {};
		let rootSections = [];
		if(!sections.length) {
			return next(new Error('No KSS documentation is found in source files.'));
		}

		sections.forEach((section, i) => {
			var rootSection = section.reference().match(/[0-9]*[a-zA-z]*\.?/)[0].replace('.', '');

			//Check if rootSection already exist
			if(!~rootSections.indexOf(rootSection)) {
				rootSections.push(rootSection);
			}

			rootSections.sort();
		});

		createNewData(rootSections, kssData);
	};

	var createNewData = (rootSections, kssData) => {

		rootSections.forEach((section, i) => {
			var sectionRoot = kssData.section(section);
			//var pageContext = _.clone(parsedPage.data, true);
			var assembleCollections = assemble.options.collections;
			var childSections =  kssData.section(section + '.*');


		});
	};

}



module.exports = exports = livingStyleguide;
