﻿
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var signUpButton = {};	// @button
	var menuItem4 = {};	// @menuItem
	var menuItem3 = {};	// @menuItem
	var menuItem2 = {};	// @menuItem
	var menuItem1 = {};	// @menuItem
	var documentEvent = {};	// @document
// @endregion// @endlock

var sessionCurrentUser;

// eventHandlers// @lock

	signUpButton.click = function signUpButton_click (event)// @startlock
	{// @endlock
		//Sign Up
		//*** Best Pratice ***
		// Use a local datasource object and bind it to the sign up input fields.
		// This will make it easy to change your interface without having to make a change to 
		// the signUp() function.
		crmUtil.signUp(waf.sources.signUpObj);
		
		//*** Anti-pattern ***
		//Don't assign the value directly from the input fields.
		/*
		var mySignUpObj = {
			name: $$('inputUsername').getValue(),
			email: $$('inputEmailAddress').getValue(),
			password: $$('iputPassword').getValue(),
			verifyPassword: $$('inputVerifyPassword').getValue()
		};
		
		crmUtil.signUp(mySignUpObj);
		*/
		//end *** Anti-pattern ***
	};// @lock

	menuItem4.click = function menuItem4_click (event)// @startlock
	{// @endlock
		//Contacts
		$$('bodyComponent').loadComponent({path: '/contacts.waComponent'});
		$$('sideBarComponent').loadComponent({path: '/sideBar.waComponent', userData: {menuItem: "contacts"}});
		crmUtil.menuBarKeepHighlight('menuBar1', 'menuItem4');
	};// @lock

	menuItem3.click = function menuItem3_click (event)// @startlock
	{// @endlock
		//Accounts
		$$('bodyComponent').loadComponent({path: '/accounts.waComponent'});
		$$('sideBarComponent').loadComponent({path: '/sideBar.waComponent', userData: {menuItem: "accounts"}});
		crmUtil.menuBarKeepHighlight('menuBar1', 'menuItem3');
	};// @lock

	menuItem2.click = function menuItem2_click (event)// @startlock
	{// @endlock
		//Leads
		$$('bodyComponent').loadComponent({path: '/leads.waComponent'});
		$$('sideBarComponent').loadComponent({path: '/sideBar.waComponent', userData: {menuItem: "leads"}});
		crmUtil.menuBarKeepHighlight('menuBar1', 'menuItem2');
	};// @lock

	menuItem1.click = function menuItem1_click (event)// @startlock
	{// @endlock
		//Home
		$$('bodyComponent').loadComponent({path: '/home.waComponent'});
		$$('sideBarComponent').loadComponent({path: '/sideBar.waComponent', userData: {menuItem: "home"}});
		crmUtil.menuBarKeepHighlight('menuBar1', 'menuItem1');
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//Let's make sure we load the owner with the Lead, Contact, and Account.
		sources.lead.declareDependencies("owner");
		sources.contact.declareDependencies("owner");
		sources.account.declareDependencies("owner");
		
		waf.widgets.menuBar1.crmGetSelectedMenuItem = function() {
			//This function will allow me to determine which menuItem of menubar1 is highlighted.
			// Even if I navigate to another section without the user clicking on the menubar.
			return this.$domNode.children('li').index(this.$domNode.children('.crm-menuSelected2'));
		};
		
		//Move our signup section into place.
		$("#signUpContainer").css("top", "80px");
		$("#signUpContainer").css("left", "0px");
		
		if (WAF.directory.currentUser() === null) {
			$$("signUpContainer").show(); //show
			$$("bodyContainer").hide(); //hide
			
		} else {
			$$("signUpContainer").hide(); //hide
			$$("bodyContainer").show(); //show	
		} //end - if (WAF.directory.currentUser() === null)
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("signUpButton", "click", signUpButton.click, "WAF");
	WAF.addListener("menuItem4", "click", menuItem4.click, "WAF");
	WAF.addListener("menuItem3", "click", menuItem3.click, "WAF");
	WAF.addListener("menuItem2", "click", menuItem2.click, "WAF");
	WAF.addListener("menuItem1", "click", menuItem1.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
