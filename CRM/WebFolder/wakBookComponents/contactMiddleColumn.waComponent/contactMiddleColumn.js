
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var middleColumnContainer = getHtmlId("middleColumnContainer"),
		middleColumnContainer$ = getHtmlObj("middleColumnContainer"),
		contactsList = getHtmlId("contactsList"),
		contactsList$ = getHtmlObj("contactsList");
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'contactMiddleColumn';
	// @endregion// @endlock

	function loadContacts() {
	
	}
	
	this.load = function (data) {// @lock
		console.log(contactsList$);
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
