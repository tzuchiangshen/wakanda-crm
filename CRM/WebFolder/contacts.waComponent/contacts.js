
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var contactsReportsComponent = getHtmlId('contactsReportsComponent'),
		firstNameInputfield = getHtmlId('textField2');

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'contacts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		setTimeout(function() {
			if (data.userData.view == "detail") {
				$$(id + "_tabView1").selectTab(2);
			} else {
				$$(id + "_tabView1").selectTab(1);
			}
		}, 40);
		
		$$(contactsReportsComponent).loadComponent({path: '/reports.waComponent', userData: {menuItem: "contacts"}});
		
	// @region namespaceDeclaration// @startlock
	var newContactButton = {};	// @button
	var button2 = {};	// @button
	var button1 = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	newContactButton.click = function newContactButton_click (event)// @startlock
	{// @endlock
		//New Contact
		waf.sources.contact.addNewElement();
		waf.sources.contact.serverRefresh({
			onSuccess: function(event) {
				$$(id + "_tabView1").selectTab(2);
				$$(firstNameInputfield).focus();
				crmUtil.setDisableContactsQuickAdd("disable");
			}
		});
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		//Save Contact Detail.
		waf.sources.contact.save();
		crmUtil.setDisableContactsQuickAdd("enable");
		$$(id + "_tabView1").selectTab(1);
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		//Cancel Contact Detail.
		if (waf.sources.contact.isNewElement()) {
			waf.sources.contact.removeCurrentReference();
		}
		crmUtil.setDisableContactsQuickAdd("enable");
		$$(id + "_tabView1").selectTab(1);
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		//Add recent items.
		crmUtil.newRecentItem("contacts", "Contact: ", waf.sources.contact.firstName + " " + waf.sources.contact.lastName, waf.sources.contact.ID, 'recentItemsBodyContainer');
		$$(id + "_tabView1").selectTab(2);
		crmUtil.setDisableContactsQuickAdd("disable");
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_newContactButton", "click", newContactButton.click, "WAF");
	WAF.addListener(this.id + "_button2", "click", button2.click, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
