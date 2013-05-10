
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var leadsReportsComponent = getHtmlId('leadsReportsComponent'),
		//activityComponent = getHtmlId('activityComponent'),
		convertLeadTitleDetail = getHtmlId('convertLeadTitleDetail'),
		additionaInfoContainer = getHtmlId('additionaInfoContainer'),
		leadAddressContainer = getHtmlId('leadAddressContainer'),
		activityToggleText = getHtmlId('activityToggleText'),
		firstNameInputfield = getHtmlId('textField1'),
		leadsActivityDetailContainer = getHtmlId('leadsActivityDetailContainer'),
		accordian1 = getHtmlId('accordian1'),
		leadTitle = getHtmlId('leadTitle');
		
		var firstNameQuick = getHtmlId('quickAddFirstNameLeads');
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		setTimeout(function() {
			if (data.userData.view == "detail") {
				$$(id + "_tabView2").selectTab(2);
			} else {
				$$(id + "_tabView2").selectTab(1);
			}
			
			$$(leadsActivityDetailContainer).hide();
		}, 40);
		
		$$(leadsReportsComponent).loadComponent({path: '/reports.waComponent', userData: {menuItem: "leads"}});
		//$$(activityComponent).loadComponent({path: '/activityDetail.waComponent'});
		
			
	// @region namespaceDeclaration// @startlock
	var leadsActivityDetailSaveButton = {};	// @button
	var leadsActivityDetailCancelButton = {};	// @button
	var dataGrid2 = {};	// @dataGrid
	var newLeadButton = {};	// @button
	var addEventButton = {};	// @button
	var addTaskButton = {};	// @button
	var button3 = {};	// @button
	var button2 = {};	// @button
	var convertButton = {};	// @button
	var button1 = {};	// @button
	var leadsCancelButton = {};	// @button
	var leadsDataGrid = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	leadsActivityDetailSaveButton.click = function leadsActivityDetailSaveButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.save({
			onSuccess: function(event) {
				$$(id + "_dataGrid2").show();
				$$(leadsActivityDetailContainer).hide();
			}
		});
		
	};// @lock

	leadsActivityDetailCancelButton.click = function leadsActivityDetailCancelButton_click (event)// @startlock
	{// @endlock
		$$(id + "_dataGrid2").show();
		$$(leadsActivityDetailContainer).hide();
	};// @lock

	dataGrid2.onRowDblClick = function dataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		$$(id + "_dataGrid2").hide();
		$$(leadsActivityDetailContainer).show();
	};// @lock

	newLeadButton.click = function newLeadButton_click (event)// @startlock
	{// @endlock
		//New Lead
		waf.sources.lead.addNewElement();
		waf.sources.lead.serverRefresh({
			onSuccess: function(event) {
				$$(id + "_tabView2").selectTab(2);
				$$(firstNameInputfield).focus();
				crmUtil.setDisableLeadsQuickAdd("disable");
				$$(leadTitle).setValue("Lead Information");
			}
		});
	};// @lock

	addEventButton.click = function addEventButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		//waf.sources.activity.serverRefresh();
		waf.sources.activity.type = "event";
		waf.sources.activity.save({
			onSuccess: function(event) {
				//$$(id + "_tabView2").selectTab(4);
				$$(id + "_dataGrid2").hide();
				$$(leadsActivityDetailContainer).show();
			}
		});
	};// @lock

	addTaskButton.click = function addTaskButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		//waf.sources.activity.serverRefresh();
		waf.sources.activity.type = "task";
		waf.sources.activity.save({
			onSuccess: function(event) {
				//$$(id + "_tabView2").selectTab(4);
				$$(id + "_dataGrid2").hide();
				$$(leadsActivityDetailContainer).show();
			}
		});
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
		waf.sources.lead.save();
		$('#' + id + "_convertLeadTitleDetail").html("( " + waf.sources.lead.firstName + " " + waf.sources.lead.lastName + " : " + waf.sources.lead.company + " )");
		$$(id + "_tabView2").selectTab(3);
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		//Save Lead.
		waf.sources.lead.save();
		crmUtil.setDisableLeadsQuickAdd("enable");
		$$(id + "_tabView2").selectTab(1);
	};// @lock

	leadsCancelButton.click = function leadsCancelButton_click (event)// @startlock
	{// @endlock
		// Add your code here
		if (waf.sources.lead.isNewElement()) {
			waf.sources.lead.removeCurrentReference();
		}
		crmUtil.setDisableLeadsQuickAdd("enable");
		$$(id + "_tabView2").selectTab(1);
	};// @lock

	leadsDataGrid.onRowDblClick = function leadsDataGrid_onRowDblClick (event)// @startlock
	{// @endlock
		//Add to recent items.
		crmUtil.newRecentItem("leads", "Lead: ", waf.sources.lead.firstName + " " + waf.sources.lead.lastName, waf.sources.lead.ID, 'recentItemsBodyContainer');        
		$$(id + "_tabView2").selectTab(2);
		crmUtil.setDisableLeadsQuickAdd("disable");
		$$(leadTitle).setValue("Lead Information: " + waf.sources.lead.firstName + " " + waf.sources.lead.lastName);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_leadsActivityDetailSaveButton", "click", leadsActivityDetailSaveButton.click, "WAF");
	WAF.addListener(this.id + "_leadsActivityDetailCancelButton", "click", leadsActivityDetailCancelButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid2", "onRowDblClick", dataGrid2.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_newLeadButton", "click", newLeadButton.click, "WAF");
	WAF.addListener(this.id + "_addEventButton", "click", addEventButton.click, "WAF");
	WAF.addListener(this.id + "_addTaskButton", "click", addTaskButton.click, "WAF");
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
