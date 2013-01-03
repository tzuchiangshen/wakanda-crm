
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var homeContainerSignUp = getHtmlId('homeContainerSignUp'),
		homeContainerSplash = getHtmlId('homeContainerSplash');
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'home';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		console.log("onLoad: " + WAF.directory.currentUser());
		
		//Move our signup section into place.
		$("#" + homeContainerSignUp).css("top", "0px");
		$("#" + homeContainerSignUp).css("left", "0px");		
		
		
		if (WAF.directory.currentUser() === null) {
			$("#" + homeContainerSignUp).show(); //show
			$("#" + homeContainerSplash).hide(); //hide
		} else {
			$("#" + homeContainerSignUp).hide(); //hide
			$("#" + homeContainerSplash).show(); //show
		}
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
