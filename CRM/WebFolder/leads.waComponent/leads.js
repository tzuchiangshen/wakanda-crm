
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var quickAddFirstName = getHtmlId('quickAddFirstName'),
			quickAddLastName = getHtmlId('quickAddLastName'),
			quickAddTitle = getHtmlId('quickAddTitle'),
			quickAddPhone = getHtmlId('quickAddPhone');
			
	// @region namespaceDeclaration// @startlock
	var quickAddSaveButton = {};	// @button
	var leadsCancelButton = {};	// @button
	var leadsDataGrid = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	quickAddSaveButton.click = function quickAddSaveButton_click (event)// @startlock
	{// @endlock
		// Add your code here
		//Tried to use an object datasource to bind to the quick add fields...problems.
		var leadDataSource = waf.sources[id + "_lead"];
		leadDataSource.addNewElement();
		leadDataSource.serverRefresh({onSuccess:function(event){
            // the new entity has been initialized by the server
            leadDataSource.firstName = $$(quickAddFirstName).getValue();
			leadDataSource.lastName = $$(quickAddLastName).getValue();
			leadDataSource.title = $$(quickAddTitle).getValue();
			leadDataSource.phone = $$(quickAddPhone).getValue();
			leadDataSource.save();
			leadDataSource.autoDispatch();
			//reset form
			$$(quickAddFirstName).setValue();
			$$(quickAddLastName).setValue();
			$$(quickAddTitle).setValue();
			$$(quickAddPhone).setValue();
        }})
		
		
	};// @lock

	leadsCancelButton.click = function leadsCancelButton_click (event)// @startlock
	{// @endlock
		// Add your code here
		$$(id + "_tabView2").selectTab(1);
	};// @lock

	leadsDataGrid.onRowDblClick = function leadsDataGrid_onRowDblClick (event)// @startlock
	{// @endlock
		// Add your code here
		$$(id + "_tabView2").selectTab(2);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_quickAddSaveButton", "click", quickAddSaveButton.click, "WAF");
	WAF.addListener(this.id + "_leadsCancelButton", "click", leadsCancelButton.click, "WAF");
	WAF.addListener(this.id + "_leadsDataGrid", "onRowDblClick", leadsDataGrid.onRowDblClick, "WAF");
	// @endregion// @endlock

		
	};// @lock


}// @startlock
return constructor;
})();// @endlock
