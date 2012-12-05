
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'logout';
	// @endregion// @endlock
	var statusMsg = getHtmlId('signInStatusMessage');
	
	this.load = function (data) {// @lock
		$$(statusMsg).setValue("Signed in as: " + waf.directory.currentUser().fullName);
	// @region namespaceDeclaration// @startlock
	var logoutButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	logoutButton.click = function logoutButton_click (event)// @startlock
	{// @endlock
		if (WAF.directory.logout()) {
			//$$(id).removeComponent();
			$$(id).loadComponent({path: '/LoginComponentViews/login.waComponent'});
			$$('bodyComponent').removeComponent();
			$$('bodyContainer').hide();
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_logoutButton", "click", logoutButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
