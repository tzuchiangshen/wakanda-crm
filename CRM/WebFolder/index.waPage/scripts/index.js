
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var menuItem4 = {};	// @menuItem
	var menuItem3 = {};	// @menuItem
	var menuItem2 = {};	// @menuItem
	var menuItem1 = {};	// @menuItem
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	menuItem4.click = function menuItem4_click (event)// @startlock
	{// @endlock
		//Contacts
		$$('bodyComponent').loadComponent({path: '/contacts.waComponent'});
		$('#menuBar1 li div').removeClass('menuSelected');
		//$('#menuBar1 li').removeClass('menuSelected2');
		$('#menuItem4 div').addClass('menuSelected');
		//waf.widgets.menuItem4.disable();
	};// @lock

	menuItem3.click = function menuItem3_click (event)// @startlock
	{// @endlock
		//Accounts
		$$('bodyComponent').loadComponent({path: '/accounts.waComponent'});
		$('#menuBar1 li div').removeClass('menuSelected');
		//$('#menuBar1 li').removeClass('menuSelected2');
		$('#menuItem3 div').addClass('menuSelected');
		//$('#menuItem3').addClass('menuSelected2');
		//waf.widgets.menuItem3.disable();
	};// @lock

	menuItem2.click = function menuItem2_click (event)// @startlock
	{// @endlock
		//Leads
		$$('bodyComponent').loadComponent({path: '/leads.waComponent'});
		$('#menuBar1 li div').removeClass('menuSelected');
		//$('#menuBar1 li').removeClass('menuSelected2');
		$('#menuItem2 div').addClass('menuSelected');
		//waf.widgets.menuItem2.disable();

	};// @lock

	menuItem1.click = function menuItem1_click (event)// @startlock
	{// @endlock
		//Home
		$$('bodyComponent').loadComponent({path: '/home.waComponent'});
		$('#menuBar1 li div').removeClass('menuSelected');
		//$('#menuBar1 li').removeClass('menuSelected2');
		$('#menuItem1 div').addClass('menuSelected');
		//waf.widgets.menuItem1.disable();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("menuItem4", "click", menuItem4.click, "WAF");
	WAF.addListener("menuItem3", "click", menuItem3.click, "WAF");
	WAF.addListener("menuItem2", "click", menuItem2.click, "WAF");
	WAF.addListener("menuItem1", "click", menuItem1.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
