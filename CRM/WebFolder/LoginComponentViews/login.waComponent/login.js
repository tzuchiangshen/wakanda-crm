
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'login';
	// @endregion// @endlock
	var loginNameField = getHtmlId('loginNameTextField'),
	loginPasswordField = getHtmlId('loginPasswordTextField'),
	errorMsg = getHtmlId('errorMessageRichText');
	
	function signIn() {
		if (waf.directory.loginByPassword(waf.sources.loginObject.name, waf.sources.loginObject.password)) {
			//$$(id).removeComponent();
			$$(id).loadComponent({path: '/LoginComponentViews/logout.waComponent'});
			$$('bodyComponent').loadComponent({path: '/home.waComponent'});
			$$('bodyContainer').show();
		} else {
			$$(errorMsg).setValue('Invalid login.');
			$$('bodyContainer').hide();
		}
	}

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var loginButton = {};	// @button
	// @endregion// @endlock

	$$(loginNameField).setValue("");
	$$(loginPasswordField).setValue("");
	$$(errorMsg).setValue("");
	$("#" + loginNameField + ", #" + loginPasswordField).live('keyup', function (e) {
   		if ( e.keyCode == 13 ){
   			signIn();
    	}
	});
		
	// eventHandlers// @lock

	loginButton.click = function loginButton_click (event)// @startlock
	{// @endlock
		signIn();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_loginButton", "click", loginButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
