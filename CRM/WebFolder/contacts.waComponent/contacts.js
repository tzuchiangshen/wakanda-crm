
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var quickAddFirstName = getHtmlId('quickAddFirstName'),
		quickAddLastName = getHtmlId('quickAddLastName'),
		quickAddTitle = getHtmlId('quickAddTitle'),
		recentItemsBodyContainer = getHtmlId('recentItemsBodyContainerContacts'),
		contactDataSource = waf.sources.contact;
			
	function quickAdd() {
		//Tried to use an object datasource to bind to the quick add fields...problems.
		//console.log($$(quickAddFirstName).getValue());
		
		contactDataSource.addNewElement();
		contactDataSource.serverRefresh({onSuccess:function(event){
            // the new entity has been initialized by the server
            contactDataSource.firstName = $$(quickAddFirstName).getValue();
			contactDataSource.lastName = $$(quickAddLastName).getValue();
			contactDataSource.title = $$(quickAddTitle).getValue();
			contactDataSource.save();
			contactDataSource.autoDispatch();
			//reset form
			$$('quickAddFirstName').setValue();
			$$('quickAddLastName').setValue();
			$$('quickAddTitle').setValue();
			
			$('#' + quickAddFirstName).focus();
        }});
	}
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'contacts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		//Have to do this here in case user reloads page.
		sessionCurrentUser = waf.directory.currentUser(); // Set the current user
		//Load the recent items into our recent items container.
		crmUtil.loadRecentItems(recentItemsBodyContainer);
		//Add event handler for return key to the quick add contacts.
		$("#" + quickAddFirstName + ", #" + quickAddLastName+ ", #" + quickAddTitle).live('keyup', function (e) {
	   		if ( e.keyCode == 13 ) {
	   			quickAdd();
	    	}
		});
	// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	var quickAddSaveButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		$$(id + "_tabView1").selectTab(1);
	};// @lock

	dataGrid1.onRowClick = function dataGrid1_onRowClick (event)// @startlock
	{// @endlock
		//Add recent items.
		var sessionCurrentUser = WAF.directory.currentUser();
		var recentItem = ds.RecentItem.newEntity(); // create the entity
		recentItem.dataClassName.setValue("contacts");
		recentItem.entityKey.setValue(waf.sources.contact.ID);
		recentItem.save({
        	onSuccess:function(event) {
        
        	}
        });
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		$$(id + "_tabView1").selectTab(2);
	};// @lock

	quickAddSaveButton.click = function quickAddSaveButton_click (event)// @startlock
	{// @endlock
		quickAdd();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dataGrid1", "onRowClick", dataGrid1.onRowClick, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_quickAddSaveButton", "click", quickAddSaveButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
