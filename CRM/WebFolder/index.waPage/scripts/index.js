
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var menuItem2 = {};	// @menuItem
	var menuItem1 = {};	// @menuItem
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	menuItem2.click = function menuItem2_click (event)// @startlock
	{// @endlock
		//Leads
		$$('bodyComponent').loadComponent({path: '/leads.waComponent'});
	};// @lock

	menuItem1.click = function menuItem1_click (event)// @startlock
	{// @endlock
		//Home
		$$('bodyComponent').loadComponent({path: '/home.waComponent'});
		
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		if (WAF.directory.currentUser() === null) {
			$$('bodyComponent').removeComponent();
			$$('loginComponent').loadComponent({path: '/LoginComponentViews/login.waComponent'});
			$$('bodyContainer').hide();
		} else {
			$$('loginComponent').loadComponent({path: '/LoginComponentViews/logout.waComponent'});
			$$('bodyComponent').loadComponent({path: '/home.waComponent'});
			$$('bodyContainer').show();
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("menuItem2", "click", menuItem2.click, "WAF");
	WAF.addListener("menuItem1", "click", menuItem1.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
