
'use strict';

var utils = module.exports = {};


//Only for Developement remove when script is finished
utils.createDataLookup = function createDataLookup(dest, fileName, data) {
	fs.writeFile(dest + '/' + fileName + '.json', JSON.stringify(data ,null, 2));
};