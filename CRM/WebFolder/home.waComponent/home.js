
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var jQueryButton = getHtmlId('button2');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'home';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		$("#" + jQueryButton).on('click', function() {console.log("jQuery click");});
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
