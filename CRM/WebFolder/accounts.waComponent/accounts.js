
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	/*
	var quickAddAccountName = getHtmlId('quickAddAccountName'),
		quickAddPhone = getHtmlId('quickAddPhone'),
		quickAddWebsite = getHtmlId('quickAddWebsite'),
		quickAddCity = getHtmlId('quickAddCity'),
		quickAddCountry = getHtmlId('quickAddCountry'),
		recentItemsBodyContainer = getHtmlId('recentItemsBodyAccounts'),
		accountDataSource = waf.sources.account;
	
	
	function quickAdd() {
		//Laurent: Tried to use an object datasource to bind to the quick add fields...problems.
		accountDataSource.addNewElement();
		accountDataSource.serverRefresh({
			onSuccess:function(event){
		        // the new entity has been initialized by the server
		        //Now update the new entity with the form values.
		        accountDataSource.name = $$(quickAddAccountName).getValue();
				accountDataSource.phone = $$(quickAddPhone).getValue();
				accountDataSource.website = $$(quickAddWebsite).getValue();
				accountDataSource.billingCity = $$(quickAddCity).getValue();
				accountDataSource.billingCountry = $$(quickAddCountry).getValue();
				//Save the entity.
				accountDataSource.save();
				accountDataSource.autoDispatch();
				//reset form
				$$(quickAddAccountName).setValue();
				$$(quickAddPhone).setValue();
				$$(quickAddWebsite).setValue();
				$$(quickAddCity).setValue();
				$$(quickAddCountry).setValue();
				
				$('#' + quickAddAccountName).focus();
			}
   		});
	}	
	*/
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'accounts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		//Have to do this here in case user reloads page.
		sessionCurrentUser = waf.directory.currentUser(); // Set the current user
		//Load the recent items into our recent items container.
		//crmUtil.loadRecentItems(recentItemsBodyContainer);
		/*
		//Add event handler for return key to the quick add contacts.
		$("#" + quickAddAccountName + ", #" + quickAddPhone + ", #" + quickAddWebsite + ", #" + quickAddCity + ", #" + quickAddCountry).live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			quickAdd();
	    	}
		});
		*/
		
	// @region namespaceDeclaration// @startlock
	var button2 = {};	// @button
	var accountsDataGrid = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		$$(id + "_tabView1").selectTab(1);
	};// @lock

	accountsDataGrid.onRowDblClick = function accountsDataGrid_onRowDblClick (event)// @startlock
	{// @endlock
		//Add recent item.
		var sessionCurrentUser = WAF.directory.currentUser();
		var recentItem = ds.RecentItem.newEntity(); // create the entity
		recentItem.dataClassName.setValue("accounts");
		recentItem.title.setValue("Account: " + waf.sources.account.name); 
		recentItem.entityKey.setValue(waf.sources.account.ID);
		recentItem.save({
        	onSuccess:function(event) {
        
        	}
        });
        //reload the most recent items into our recent items container.
		sessionCurrentUser = waf.directory.currentUser(); // Set the current user to default.
		crmUtil.loadRecentItems('recentItemsBodyContainer');
        
		$$(id + "_tabView1").selectTab(2);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_button2", "click", button2.click, "WAF");
	WAF.addListener(this.id + "_accountsDataGrid", "onRowDblClick", accountsDataGrid.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
