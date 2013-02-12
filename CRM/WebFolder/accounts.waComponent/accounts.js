
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var accountsReportsComponent = getHtmlId('accountsReportsComponent'),
		firstNameInputfield = getHtmlId('textField2');
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'accounts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		setTimeout(function() {
			if (data.userData.view == "detail") {
				$$(id + "_tabView1").selectTab(2);
			} else {
				$$(id + "_tabView1").selectTab(1);
			}
		}, 40);
		
		$$(accountsReportsComponent).loadComponent({path: '/reports.waComponent', userData: {menuItem: "accounts"}});
		
	// @region namespaceDeclaration// @startlock
	var newAccountButton = {};	// @button
	var button1 = {};	// @button
	var button2 = {};	// @button
	var accountsDataGrid = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	newAccountButton.click = function newAccountButton_click (event)// @startlock
	{// @endlock
		//New Account Button.
		waf.sources.account.addNewElement();
		
		/*
		waf.sources.account.newAccount({
			onSuccess: function(event) {
				waf.sources.account.setCurrentEntity(event.result);
				$$(id + "_tabView1").selectTab(2);
				$$(firstNameInputfield).focus();
				crmUtil.setDisableAccountsQuickAdd("disable");
			}
		});
		*/
		
		/**/
		waf.sources.account.serverRefresh({
			onSuccess: function(event) {
				$$(id + "_tabView1").selectTab(2);
				$$(firstNameInputfield).focus();
				crmUtil.setDisableAccountsQuickAdd("disable");
			}
		});
		
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		//Save button
		waf.sources.account.save();
		crmUtil.setDisableAccountsQuickAdd("enable");
		$$(id + "_tabView1").selectTab(1);
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		//Cancel button.
		if (waf.sources.account.isNewElement()) {
			waf.sources.account.removeCurrentReference();
		}
		crmUtil.setDisableAccountsQuickAdd("enable");
		$$(id + "_tabView1").selectTab(1);
	};// @lock

	accountsDataGrid.onRowDblClick = function accountsDataGrid_onRowDblClick (event)// @startlock
	{// @endlock
		//Add recent item.
		crmUtil.setDisableAccountsQuickAdd("disable");
		crmUtil.newRecentItem("accounts", "Account: ", waf.sources.account.name, waf.sources.account.ID, 'recentItemsBodyContainer');
		$$(firstNameInputfield).focus();
		$$(id + "_tabView1").selectTab(2);
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_newAccountButton", "click", newAccountButton.click, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_button2", "click", button2.click, "WAF");
	WAF.addListener(this.id + "_accountsDataGrid", "onRowDblClick", accountsDataGrid.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
