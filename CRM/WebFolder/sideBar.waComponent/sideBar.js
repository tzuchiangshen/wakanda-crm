
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var quickAddMainContainer = getHtmlId('quickAddMainContainer'),
		quickAddTitle = getHtmlId('quickAddTitle'),
		//Home
		homeMessagesBody = getHtmlId('homeMessagesBody'),
		//Leads
		quickAddBodyContainerLeads = getHtmlId('quickAddBodyContainerLeads'),
		quickAddFirstNameLeads = getHtmlId('quickAddFirstNameLeads'),
		quickAddLastNameLeads = getHtmlId('quickAddLastNameLeads'),
		//Accounts
		quickAddBodyContainerAccounts = getHtmlId('quickAddBodyContainerAccounts'),
		quickAddAccountName = getHtmlId('quickAddAccountName'),
		quickAddAccountPhone = getHtmlId('quickAddAccountPhone'),
		quickAddAccountWebsite = getHtmlId('quickAddAccountWebsite'),
		//Contacts
		quickAddBodyContainerContacts = getHtmlId('quickAddBodyContainerContacts'),
		quickAddFirstNameContacts = getHtmlId('quickAddFirstNameContacts'),
		quickAddLastNameContacts = getHtmlId('quickAddLastNameContacts'),
		
		//Datasources
		accountDataSource = waf.sources.account,
		contactDataSource = waf.sources.contact
		leadDataSource = waf.sources.lead;
		
	function quickAddLeads() {
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
	}
	
	function quickAddContacts() {
		contactDataSource.addNewElement();
		contactDataSource.serverRefresh({onSuccess:function(event){
            // the new entity has been initialized by the server
            contactDataSource.firstName = $$(quickAddFirstNameContacts).getValue();
			contactDataSource.lastName = $$(quickAddLastNameContacts).getValue();
			//contactDataSource.title = $$(quickAddTitle).getValue();
			contactDataSource.save();
			contactDataSource.autoDispatch();
			//reset form
			$$('quickAddFirstNameContacts').setValue();
			$$('quickAddLastNameContacts').setValue();
			//$$('quickAddTitle').setValue();
			
			$('#' + quickAddFirstName).focus();
        }});
	}
	
	function quickAddAccounts() {
		accountDataSource.addNewElement();
		accountDataSource.serverRefresh({
			onSuccess:function(event){
		        // the new entity has been initialized by the server
		        //Now update the new entity with the form values.
		        debugger;
		        accountDataSource.name = $$(quickAddAccountName).getValue();
				accountDataSource.phone = $$(quickAddAccountPhone).getValue();
				accountDataSource.website = $$(quickAddAccountWebsite).getValue();
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
	}
	
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'sideBar';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		//console.log(data.userData.menuItem);
		switch(data.userData.menuItem)
		{
			case "leads":
			$$(quickAddTitle).setValue("Quick Add");
			$$(quickAddBodyContainerContacts).hide();
			$$(quickAddBodyContainerAccounts).hide();
			$$(quickAddMainContainer).show();
			break;
			
			case "accounts":
			$$(quickAddTitle).setValue("Quick Add");
			$("#" + quickAddBodyContainerAccounts).css("top", "30px");
			$("#" + quickAddBodyContainerAccounts).css("left", "0px");
			$$(quickAddBodyContainerLeads).hide();
			$$(quickAddBodyContainerContacts).hide();
			$$(quickAddBodyContainerAccounts).show();
			break;
			
			case "contacts":
			$$(quickAddTitle).setValue("Quick Add");
			$("#" + quickAddBodyContainerContacts).css("top", "30px");
			$("#" + quickAddBodyContainerContacts).css("left", "0px");
			$$(quickAddBodyContainerLeads).hide();
			$$(quickAddBodyContainerAccounts).hide();
			$$(quickAddBodyContainerContacts).show();
			break;
			
			case "home":
			$$(quickAddTitle).setValue("Messages");
			$("#" + homeMessagesBody).css("top", "30px");
			$("#" + homeMessagesBody).css("left", "0px");
			$$(quickAddBodyContainerLeads).hide();
			$$(quickAddBodyContainerAccounts).hide();
			$$(quickAddBodyContainerContacts).hide();
			$$(homeMessagesBody).show();
			//quickAddTitle
			//homeMessagesBody
			
			break;
			
			default:
			$$(quickAddTitle).setValue("Quick Add");
			$$(quickAddMainContainer).hide();
		}
		
		//Add event handler for return key to the quick add contacts.
		$("#" + quickAddAccountName + ", #" + quickAddAccountPhone + ", #" + quickAddAccountWebsite).live('keyup', function (e) {
			// + ", #" + quickAddCity + ", #" + quickAddCountry
	   		if ( e.keyCode == 13 ){
	   			quickAddAccounts();
	    	}
		});
	// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
	var quickAddContactsSaveButton = {};	// @button
	var quickAddAccountsSaveButton = {};	// @button
	var quickAddLeadsSaveButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		quickAddContacts();
	};// @lock

	quickAddContactsSaveButton.click = function quickAddContactsSaveButton_click (event)// @startlock
	{// @endlock
		quickAddContacts();
	};// @lock

	quickAddAccountsSaveButton.click = function quickAddAccountsSaveButton_click (event)// @startlock
	{// @endlock
		quickAddAccounts();
	};// @lock

	quickAddLeadsSaveButton.click = function quickAddLeadsSaveButton_click (event)// @startlock
	{// @endlock
		quickAddLeads();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_quickAddContactsSaveButton", "click", quickAddContactsSaveButton.click, "WAF");
	WAF.addListener(this.id + "_quickAddAccountsSaveButton", "click", quickAddAccountsSaveButton.click, "WAF");
	WAF.addListener(this.id + "_quickAddLeadsSaveButton", "click", quickAddLeadsSaveButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
