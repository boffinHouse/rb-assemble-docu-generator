
'use strict';

function createDocu() {
	this.init();
}

createDocu.prototype = {
	init: function() {
		console.log('hello');
	}
};

module.exports = createDocu;