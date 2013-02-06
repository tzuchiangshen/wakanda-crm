
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var leadsReportsComponent = getHtmlId('leadsReportsComponent'),
		convertLeadTitleDetail = getHtmlId('convertLeadTitleDetail'),
		additionaInfoContainer = getHtmlId('additionaInfoContainer'),
		leadAddressContainer = getHtmlId('leadAddressContainer'),
		activityToggleText = getHtmlId('activityToggleText');
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		$('#' + activityToggleText).attr('unselectable','on');
		$("#" + additionaInfoContainer).css("top", "626px");
		$("#" + additionaInfoContainer).hide();
		
		setTimeout(function() {
			if (data.userData.view == "detail") {
				$$(id + "_tabView2").selectTab(2);
			} else {
				$$(id + "_tabView2").selectTab(1);
			}
	}, 40);
		
		
		
	$$(leadsReportsComponent).loadComponent({path: '/reports.waComponent', userData: {menuItem: "leads"}});
			
	// @region namespaceDeclaration// @startlock
	var showActivities = {};	// @container
	var button5 = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	var button3 = {};	// @button
	var button2 = {};	// @button
	var convertButton = {};	// @button
	var button1 = {};	// @button
	var leadsCancelButton = {};	// @button
	var leadsDataGrid = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	showActivities.click = function showActivities_click (event)// @startlock
	{// @endlock
		if ($$(activityToggleText).getValue() == "Activity") {
			$$(activityToggleText).setValue('Address');
			$("#" + leadAddressContainer).animate({ 'top': "626px"}, 600, function(){});
			$('#' + leadAddressContainer).hide();
			$('#' + additionaInfoContainer).show();
			$("#" + additionaInfoContainer).animate({ 'top': "295px"}, 600, function(){});
		} else {
			$$(activityToggleText).setValue('Activity');
			$("#" + additionaInfoContainer).animate({ 'top': "626px"}, 600, function(){});
			$('#' + additionaInfoContainer).hide();
			$('#' + leadAddressContainer).show();
			$("#" + leadAddressContainer).animate({ 'top': "295px"}, 600, function(){});
		}
	};// @lock

	button5.click = function button5_click (event)// @startlock
	{// @endlock
		//Activity Navigate to List
		$$(id + "_tabView2").selectTab(2);
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		//Activity Navigate to Detail
		$$(id + "_tabView2").selectTab(4);
	};// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock
		//Convert Lead Button
		
		waf.sources.lead.convertLead({
			onSuccess: function(event) {
				crmUtil.loadRecentItems('recentItemsBodyContainer', event.result.recentItemArray);
				waf.sources.account.all();
				waf.sources.contact.all({
					onSuccess: function(evContact) {
						waf.sources.contact.selectByKey(event.result.contactID);
						$$('bodyComponent').loadComponent({path: '/contacts.waComponent', userData: {view: "detail"}});
						$$('sideBarComponent').loadComponent({path: '/sideBar.waComponent', userData: {menuItem: "contacts"}});
						waf.widgets.menuBar1.crmSetSelectedMenuItem('menuItem4');
	
					}
				});
				waf.sources.lead.query("converted == false", {
					onSuccess: function(evLead) {
						//$$(id + "_tabView2").selectTab(1);
					} //onSuccess
				});
			}
		});
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
		waf.sources.lead.save();
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
	WAF.addListener(this.id + "_showActivities", "click", showActivities.click, "WAF");
	WAF.addListener(this.id + "_button5", "click", button5.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
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
