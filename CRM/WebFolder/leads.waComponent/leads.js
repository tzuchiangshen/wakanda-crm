
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var leadsReportsComponent = getHtmlId('leadsReportsComponent');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		$$(id + "_tabView2").selectTab(1);
		$$(leadsReportsComponent).loadComponent({path: '/reports.waComponent', userData: {menuItem: "leads"}});
			
	// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
	var leadsCancelButton = {};	// @button
	var leadsDataGrid = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		// Add your code here
		$$(id + "_tabView2").selectTab(1);
	};// @lock

	leadsCancelButton.click = function leadsCancelButton_click (event)// @startlock
	{// @endlock
		// Add your code here
		$$(id + "_tabView2").selectTab(1);
	};// @lock

	leadsDataGrid.onRowDblClick = function leadsDataGrid_onRowDblClick (event)// @startlock
	{// @endlock
		//Add to recent items.
		crmUtil.newRecentItem("leads", "Lead: ", waf.sources.lead.firstName + " " + waf.sources.lead.lastName, waf.sources.lead.ID, 'recentItemsBodyContainer');        
		$$(id + "_tabView2").selectTab(2);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_leadsCancelButton", "click", leadsCancelButton.click, "WAF");
	WAF.addListener(this.id + "_leadsDataGrid", "onRowDblClick", leadsDataGrid.onRowDblClick, "WAF");
	// @endregion// @endlock

		
	};// @lock


}// @startlock
return constructor;
})();// @endlock
