
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var quickAddLeadsContainer = getHtmlId('quickAddLeadsContainer'),
		quickAddFirstNameLeads = getHtmlId('quickAddFirstNameLeads'),
		quickAddLastNameLeads = getHtmlId('quickAddLastNameLeads'),
		leadDataSource = waf.sources.lead;
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'sideBar';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		//console.log(data.userData.menuItem);
		if (data.userData.menuItem == "leads") {
			$$(quickAddLeadsContainer).show();
		} else {
			$$(quickAddLeadsContainer).hide();
		}
	// @region namespaceDeclaration// @startlock
	var quickAddLeadsSaveButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	quickAddLeadsSaveButton.click = function quickAddLeadsSaveButton_click (event)// @startlock
	{// @endlock
		leadDataSource.addNewElement();
		leadDataSource.serverRefresh({onSuccess:function(event){
            // the new entity has been initialized by the server
            leadDataSource.firstName = $$(quickAddFirstNameLeads).getValue();
			leadDataSource.lastName = $$(quickAddLastNameLeads).getValue();
			//leadDataSource.title = $$(quickAddTitle).getValue();
			//leadDataSource.phone = $$(quickAddPhone).getValue();
			//leadDataSource.company = $$(quickAddCompany).getValue();
			leadDataSource.save();
			leadDataSource.autoDispatch();
			//reset form
			$$(quickAddFirstNameLeads).setValue();
			$$(quickAddLastNameLeads).setValue();
			//$$(quickAddTitle).setValue();
			//$$(quickAddPhone).setValue();
			//$$(quickAddCompany).setValue();
			
			$('#' + quickAddFirstNameLeads).focus();
        }});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_quickAddLeadsSaveButton", "click", quickAddLeadsSaveButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
