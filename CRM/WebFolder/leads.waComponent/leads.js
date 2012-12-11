
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var quickAddFirstName = getHtmlId('quickAddFirstName'),
			quickAddLastName = getHtmlId('quickAddLastName'),
			quickAddTitle = getHtmlId('quickAddTitle'),
			quickAddCompany = getHtmlId('quickAddCompany'),
			quickAddPhone = getHtmlId('quickAddPhone'),
			leadDataSource = waf.sources[id + "_lead"];
			
	function quickAdd() {
		//Tried to use an object datasource to bind to the quick add fields...problems.
		leadDataSource.addNewElement();
		leadDataSource.serverRefresh({onSuccess:function(event){
            // the new entity has been initialized by the server
            leadDataSource.firstName = $$(quickAddFirstName).getValue();
			leadDataSource.lastName = $$(quickAddLastName).getValue();
			leadDataSource.title = $$(quickAddTitle).getValue();
			leadDataSource.phone = $$(quickAddPhone).getValue();
			leadDataSource.company = $$(quickAddCompany).getValue();
			leadDataSource.save();
			leadDataSource.autoDispatch();
			//reset form
			$$(quickAddFirstName).setValue();
			$$(quickAddLastName).setValue();
			$$(quickAddTitle).setValue();
			$$(quickAddPhone).setValue();
			$$(quickAddCompany).setValue();
			
			$('#' + quickAddFirstName).focus();
        }});
	}
	
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		$("#" + quickAddFirstName + ", #" + quickAddLastName+ ", #" + quickAddTitle+ ", #" + quickAddPhone + ", #" + quickAddCompany).live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			quickAdd();
	    	}
		});
			
	// @region namespaceDeclaration// @startlock
	var quickAddSaveButtonLead = {};	// @button
	var leadsCancelButton = {};	// @button
	var leadsDataGrid = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	quickAddSaveButtonLead.click = function quickAddSaveButtonLead_click (event)// @startlock
	{// @endlock
		// Add your code here
		quickAdd();
		
		
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
	WAF.addListener(this.id + "_quickAddSaveButtonLead", "click", quickAddSaveButtonLead.click, "WAF");
	WAF.addListener(this.id + "_leadsCancelButton", "click", leadsCancelButton.click, "WAF");
	WAF.addListener(this.id + "_leadsDataGrid", "onRowDblClick", leadsDataGrid.onRowDblClick, "WAF");
	// @endregion// @endlock

		
	};// @lock


}// @startlock
return constructor;
})();// @endlock
