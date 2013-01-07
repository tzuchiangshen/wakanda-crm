﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var loginNameField = getHtmlId('loginNameTextField'),
	loginPasswordField = getHtmlId('loginPasswordTextField'),
	errorMsg = getHtmlId('errorMessageRichText'),
	loginContainerRef = getHtmlId('loginContainer'),
	logoutContainerRef = getHtmlId('logoutContainer'),
	statusMsg = getHtmlId('signInStatusMessage');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'login';
	// @endregion// @endlock

	function toggleLogin(toggle) {
		if (toggle == "logout") {
			$("#" + loginContainerRef).fadeIn(900, function() {$$(loginNameField).focus();});; //show
			$("#" + logoutContainerRef).fadeOut(400); //hide 
		} else {
			$("#" + loginContainerRef).fadeOut(400); //hide() 
			$("#" + logoutContainerRef).fadeIn(900); //show() 
		}
	}
	
	
	function signIn() {
		if (waf.directory.loginByPassword($("#" + loginNameField).val(), $("#" + loginPasswordField).val())) {
			//Our user signed in successfully.
			sessionCurrentUser = waf.directory.currentUser(); // Set the current user
			
			$$(statusMsg).setValue("Signed in as: " + waf.directory.currentUser().fullName);
			$$(loginNameField).setValue("");
			$$(loginPasswordField).setValue("");
			$$(errorMsg).setValue("");
			$$(loginNameField).focus();
			toggleLogin("login");
			
		} else {
			$$(errorMsg).setValue("Invalid login.");
			$$(statusMsg).setValue("");
		}
		
		$$("signUpContainer").hide(); //hide
		$$("bodyContainer").show(); //show	
		waf.widgets.bodyComponent.loadComponent("home.waComponent");
		crmUtil.menuBarKeepHighlight('menuBar1', 'menuItem1');
		//Load the recent items into our recent items container.
		sessionCurrentUser = waf.directory.currentUser(); // Set the current user to default.
		crmUtil.loadRecentItems('recentItemsBodyContainer');
	}
	
	
	this.load = function (data) {// @lock
		//Move our logout section into place.
		$("#" + logoutContainerRef).css("top", "0px");
		$("#" + logoutContainerRef).css("left", "0px");			
			
		//If we have a current user signed in then show login container, else show logout container.
		if (waf.directory.currentUser() === null) { //WAF.directory.currentUser().fullName === "default guest"
			//No user is signed in.
			$("#" + loginContainerRef).show(200, function() {$$(loginNameField).focus();}); //show
			$("#" + logoutContainerRef).hide(); //hide
		} else {
			//We have a user signed in.
			$("#" + loginContainerRef).hide(); //hide
			$("#" + logoutContainerRef).show(); //show
			$$(statusMsg).setValue("Signed in as: " + waf.directory.currentUser().fullName); 	
		}
		
		//Make return key trigger login when user name or password input fields have focus.
		$("#" + loginNameField + ", #" + loginPasswordField).live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			signIn();
	    	}
		});
	// @region namespaceDeclaration// @startlock
	var loginButton = {};	// @button
	var logoutButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	loginButton.click = function loginButton_click (event)// @startlock
	{// @endlock
		signIn();
	};// @lock

	logoutButton.click = function logoutButton_click (event)// @startlock
	{// @endlock
		if (WAF.directory.logout()) {
			$$("signUpContainer").show(); //show
			$$("bodyContainer").hide(); //hide
			//sessionCurrentUser = waf.directory.currentUser(); // Set the current user to default.
			//Load the recent items into our recent items container.
			//crmUtil.loadRecentItems('recentItemsBodyContainer');
			$('#recentItemsBodyContainer').html('');
			//waf.widgets.bodyComponent.loadComponent("home.waComponent");
			toggleLogin("logout");
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_loginButton", "click", loginButton.click, "WAF");
	WAF.addListener(this.id + "_logoutButton", "click", logoutButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
