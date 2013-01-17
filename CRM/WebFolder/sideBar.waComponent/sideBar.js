﻿
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
		quickAddCompanyLeads = getHtmlId('quickAddCompanyLeads'),
		quickAddPhoneLeads = getHtmlId('quickAddPhoneLeads'),
		
		//Accounts
		quickAddBodyContainerAccounts = getHtmlId('quickAddBodyContainerAccounts'),
		quickAddAccountName = getHtmlId('quickAddAccountName'),
		quickAddAccountPhone = getHtmlId('quickAddAccountPhone'),
		quickAddAccountWebsite = getHtmlId('quickAddAccountWebsite'),
		quickAddAccountCity = getHtmlId('quickAddAccountCity'),
		
		//Contacts
		quickAddBodyContainerContacts = getHtmlId('quickAddBodyContainerContacts'),
		quickAddFirstNameContacts = getHtmlId('quickAddFirstNameContacts'),
		quickAddLastNameContacts = getHtmlId('quickAddLastNameContacts'),
		quickAddPhoneContacts = getHtmlId('quickAddPhoneContacts'),
		quickAddEmailContacts = getHtmlId('quickAddEmailContacts'),
		
		//Datasources
		accountDataSource = waf.sources.account,
		contactDataSource = waf.sources.contact,
		leadDataSource = waf.sources.lead;
		
	function quickAddLeads() {
		leadDataSource.addNewElement();
		leadDataSource.serverRefresh({
			onSuccess:function(event){
	            // the new entity has been initialized by the server
	            leadDataSource.firstName = $$(quickAddFirstNameLeads).getValue();
				leadDataSource.lastName = $$(quickAddLastNameLeads).getValue();
				leadDataSource.phone = $$(quickAddPhoneLeads).getValue();
				leadDataSource.company = $$(quickAddCompanyLeads).getValue();
				leadDataSource.save({
					onSuccess:function(event) {
						leadDataSource.autoDispatch();
						crmUtil.newRecentItem("leads", "Lead: ", leadDataSource.firstName + " " + leadDataSource.lastName, leadDataSource.ID, 'recentItemsBodyContainer');        
						//reset form
						$$(quickAddFirstNameLeads).setValue();
						$$(quickAddLastNameLeads).setValue();
						$$(quickAddPhoneLeads).setValue();
						$$(quickAddCompanyLeads).setValue();
						$('#' + quickAddFirstNameLeads).focus();
					}
				});
        	}
    	});
	}
	
	function quickAddContacts() {
		contactDataSource.addNewElement();
		contactDataSource.serverRefresh({onSuccess:function(event){
            // the new entity has been initialized by the server
            contactDataSource.firstName = $$(quickAddFirstNameContacts).getValue();
			contactDataSource.lastName = $$(quickAddLastNameContacts).getValue();
			contactDataSource.phone = $$(quickAddPhoneContacts).getValue();
			contactDataSource.emailAccnt = $$(quickAddEmailContacts).getValue();
			debugger;
			contactDataSource.save({
				onSuccess:function(event){
					contactDataSource.autoDispatch();
					crmUtil.newRecentItem("contacts", "Contact: ", contactDataSource.firstName + " " + contactDataSource.lastName, contactDataSource.ID, 'recentItemsBodyContainer');
					//reset form
					$$(quickAddFirstNameContacts).setValue();
					$$(quickAddLastNameContacts).setValue();
					$$(quickAddPhoneContacts).setValue();
					$$(quickAddEmailContacts).setValue();
					$('#' + quickAddFirstNameContacts).focus();
				}
			}); //end - save()
        }}); //end - serverRefresh()
	}
	
	function quickAddAccounts() {
		accountDataSource.addNewElement();
		accountDataSource.serverRefresh({
			onSuccess:function(event){
		        // the new entity has been initialized by the server
		        //Now update the new entity with the form values.
		        accountDataSource.name = $$(quickAddAccountName).getValue();
				accountDataSource.phone = $$(quickAddAccountPhone).getValue();
				accountDataSource.website = $$(quickAddAccountWebsite).getValue();
				accountDataSource.billingCity = $$(quickAddAccountCity).getValue();
				//Save the entity.
				accountDataSource.save({
					onSuccess:function(event){
						accountDataSource.autoDispatch();
						crmUtil.newRecentItem("accounts", "Account: ", accountDataSource.name, accountDataSource.ID, 'recentItemsBodyContainer');
						//reset form
						$$(quickAddAccountName).setValue();
						$$(quickAddAccountPhone).setValue();
						$$(quickAddAccountWebsite).setValue();
						$$(quickAddAccountCity).setValue();
						$('#' + quickAddAccountName).focus();
					}
				});
				
			}
   		});
	} //end - function quickAddAccounts()
	
	
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
			$('#' + quickAddFirstNameLeads).focus();
			break;
			
			case "accounts":
			$$(quickAddTitle).setValue("Quick Add");
			$("#" + quickAddBodyContainerAccounts).css("top", "30px");
			$("#" + quickAddBodyContainerAccounts).css("left", "0px");
			$$(quickAddBodyContainerLeads).hide();
			$$(quickAddBodyContainerContacts).hide();
			$$(quickAddBodyContainerAccounts).show();
			$('#' + quickAddAccountName).focus();
			break;
			
			case "contacts":
			$$(quickAddTitle).setValue("Quick Add");
			$("#" + quickAddBodyContainerContacts).css("top", "30px");
			$("#" + quickAddBodyContainerContacts).css("left", "0px");
			$$(quickAddBodyContainerLeads).hide();
			$$(quickAddBodyContainerAccounts).hide();
			$$(quickAddBodyContainerContacts).show();
			$('#' + quickAddFirstNameContacts).focus();
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
		
		//Laurent - I get very funny behavior when I enable these.
		/*
		//Add event handler for return key to the quick add accounts.
		$("#" + quickAddAccountName + ", #" + quickAddAccountPhone + ", #" + quickAddAccountWebsite + ", #" + quickAddAccountCity).live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			quickAddAccounts();
	    	}
		});
		
		//Add event handler for return key to the quick add leads.
		$("#" + quickAddFirstNameLeads + ", #" + quickAddLastNameLeads + ", #" + quickAddCompanyLeads + ", #" + quickAddPhoneLeads).live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			quickAddLeads();
	    	}
		});
		
		//Add event handler for return key to the quick add contacts.
		$("#" + quickAddFirstNameContacts + ", #" + quickAddLastNameContacts + ", #" + quickAddPhoneContacts + ", #" + quickAddEmailContacts).live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			quickAddContacts();
	    	}
		});
		*/
		
		
	// @region namespaceDeclaration// @startlock
	var quickAddContactsSaveButton = {};	// @button
	var quickAddAccountsSaveButton = {};	// @button
	var quickAddLeadsSaveButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

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
	WAF.addListener(this.id + "_quickAddContactsSaveButton", "click", quickAddContactsSaveButton.click, "WAF");
	WAF.addListener(this.id + "_quickAddAccountsSaveButton", "click", quickAddAccountsSaveButton.click, "WAF");
	WAF.addListener(this.id + "_quickAddLeadsSaveButton", "click", quickAddLeadsSaveButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
