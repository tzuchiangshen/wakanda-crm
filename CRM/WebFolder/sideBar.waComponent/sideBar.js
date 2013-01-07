
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var quickAddMainContainer = getHtmlId('quickAddMainContainer'),
		//Leads
		quickAddBodyContainerLeads = getHtmlId('quickAddBodyContainerLeads'),
		quickAddFirstNameLeads = getHtmlId('quickAddFirstNameLeads'),
		quickAddLastNameLeads = getHtmlId('quickAddLastNameLeads'),
		//Accounts
		quickAddBodyContainerAccounts = getHtmlId('quickAddBodyContainerAccounts'),
		quickAddAccountName = getHtmlId('quickAddAccountName'),
		quickAddAccountPhone = getHtmlId('quickAddAccountPhone'),
		quickAddAccountWebsite = getHtmlId('quickAddAccountWebsite'),
		//Datasources
		accountDataSource = waf.sources.account,
		leadDataSource = waf.sources.lead;
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'sideBar';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		//console.log(data.userData.menuItem);
		switch(data.userData.menuItem)
		{
			case "leads":
			$$(quickAddMainContainer).show();
			break;
			
			case "accounts":
			//$$(quickAddMainContainer).hide();
			$("#" + quickAddBodyContainerAccounts).css("top", "30px");
			$("#" + quickAddBodyContainerAccounts).css("left", "0px");
			$$(quickAddBodyContainerLeads).hide();
			$$(quickAddBodyContainerAccounts).show();
			break;
			
			case "contacts":
			$$(quickAddMainContainer).hide();
			break;
			
			default:
			$$(quickAddMainContainer).hide();
		}
		
		/*
		if (data.userData.menuItem == "leads") {
			$$(quickAddLeadsContainer).show();
		} else {
			$$(quickAddLeadsContainer).hide();
		}
		*/
	// @region namespaceDeclaration// @startlock
	var quickAddAccountsSaveButton = {};	// @button
	var quickAddLeadsSaveButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	quickAddAccountsSaveButton.click = function quickAddAccountsSaveButton_click (event)// @startlock
	{// @endlock
		accountDataSource.addNewElement();
		accountDataSource.serverRefresh({
			onSuccess:function(event){
		        // the new entity has been initialized by the server
		        //Now update the new entity with the form values.
		        accountDataSource.name = $$(quickAddAccountName).getValue();
				accountDataSource.phone = $$(quickAddPhone).getValue();
				accountDataSource.website = $$(quickAddWebsite).getValue();
				//accountDataSource.billingCity = $$(quickAddCity).getValue();
				//accountDataSource.billingCountry = $$(quickAddCountry).getValue();
				//Save the entity.
				accountDataSource.save();
				accountDataSource.autoDispatch();
				//reset form
				$$(quickAddAccountName).setValue();
				$$(quickAddPhone).setValue();
				$$(quickAddWebsite).setValue();
				//$$(quickAddCity).setValue();
				//$$(quickAddCountry).setValue();
				
				$('#' + quickAddAccountName).focus();
			}
   		});
	};// @lock

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
	WAF.addListener(this.id + "_quickAddAccountsSaveButton", "click", quickAddAccountsSaveButton.click, "WAF");
	WAF.addListener(this.id + "_quickAddLeadsSaveButton", "click", quickAddLeadsSaveButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
