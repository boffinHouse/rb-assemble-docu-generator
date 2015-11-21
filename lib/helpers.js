
'use strict';

var helpers = module.exports = {};


//Only for Developement remove when script is finished
helpers.createDataLookup = function createDataLookup(dest, fileName, data) {
	fs.writeFile(dest + '/' + fileName + '.json', JSON.stringify(data ,null, 2));
};