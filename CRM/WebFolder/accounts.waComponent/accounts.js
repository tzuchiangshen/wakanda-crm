﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var accountsReportsComponent = getHtmlId('accountsReportsComponent');
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'accounts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		$$(accountsReportsComponent).loadComponent({path: '/reports.waComponent', userData: {menuItem: "accounts"}});
		
	// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
	var button2 = {};	// @button
	var accountsDataGrid = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		$$(id + "_tabView1").selectTab(1);
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		$$(id + "_tabView1").selectTab(1);
	};// @lock

	accountsDataGrid.onRowDblClick = function accountsDataGrid_onRowDblClick (event)// @startlock
	{// @endlock
		//Add recent item.
		crmUtil.newRecentItem("accounts", "Account: ", waf.sources.account.name, waf.sources.account.ID, 'recentItemsBodyContainer');
		$$(id + "_tabView1").selectTab(2);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_button2", "click", button2.click, "WAF");
	WAF.addListener(this.id + "_accountsDataGrid", "onRowDblClick", accountsDataGrid.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
