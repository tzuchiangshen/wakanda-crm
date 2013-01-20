﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var leadsReportsComponent = getHtmlId('leadsReportsComponent'),
		convertLeadTitleDetail = getHtmlId('convertLeadTitleDetail');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		if (data.userData.view == "detail") {
			$$(id + "_tabView2").selectTab(2);
		} else {
			$$(id + "_tabView2").selectTab(1);
		}
		
		$$(leadsReportsComponent).loadComponent({path: '/reports.waComponent', userData: {menuItem: "leads"}});
			
	// @region namespaceDeclaration// @startlock
	var button3 = {};	// @button
	var button2 = {};	// @button
	var convertButton = {};	// @button
	var button1 = {};	// @button
	var leadsCancelButton = {};	// @button
	var leadsDataGrid = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock
		//Convert Lead Button
		waf.sources.lead.converted = true;
		waf.sources.lead.save({
			onSuccess: function(event) {
				waf.sources.lead.query("converted == false", {
					onSuccess: function(event) {
						$$(id + "_tabView2").selectTab(1);
					} //onSuccess
				});
			} //onSuccess
		}); //waf.sources.lead.save
		//end - Convert The Lead.
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		//Convert Cancel Button
		$$(id + "_tabView2").selectTab(2);
	};// @lock

	convertButton.click = function convertButton_click (event)// @startlock
	{// @endlock
		//Convert Lead - Show Dialog Button
		$('#' + id + "_convertLeadTitleDetail").html("( " + waf.sources.lead.firstName + " " + waf.sources.lead.lastName + " : " + waf.sources.lead.company + " )");
		//convertLeadTitleDetail.setValue("(" + waf.sources.lead.firstName + " " + waf.sources.lead.lastName + ")");
		$$(id + "_tabView2").selectTab(3);
	};// @lock

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
	WAF.addListener(this.id + "_button3", "click", button3.click, "WAF");
	WAF.addListener(this.id + "_button2", "click", button2.click, "WAF");
	WAF.addListener(this.id + "_convertButton", "click", convertButton.click, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_leadsCancelButton", "click", leadsCancelButton.click, "WAF");
	WAF.addListener(this.id + "_leadsDataGrid", "onRowDblClick", leadsDataGrid.onRowDblClick, "WAF");
	// @endregion// @endlock

		
	};// @lock


}// @startlock
return constructor;
})();// @endlock
