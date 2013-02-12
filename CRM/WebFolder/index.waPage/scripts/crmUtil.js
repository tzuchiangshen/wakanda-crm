//Utility library for Wakanda CRM application.

var crmUtil = (function() {
	//Private Functions and Vars ----- Start
	
	//Private Functions and Vars ----- End
	
	var crmUtilObj = {}; //This is the object we will return to create our module.
	
	crmUtilObj.setDisableAccountsQuickAdd = function(toggle) {
		if (toggle == "disable") {
			//waf.widgets.sideBarComponent_quickAddMainContainer.hide();
			/**/
			waf.widgets.sideBarComponent_quickAddAccountName.disable();
			waf.widgets.sideBarComponent_quickAddAccountPhone.disable();
			waf.widgets.sideBarComponent_quickAddAccountWebsite.disable();
			waf.widgets.sideBarComponent_quickAddAccountCity.disable();
			waf.widgets.sideBarComponent_quickAddAccountsSaveButton.disable();
			
		} else {
//			waf.widgets.sideBarComponent_quickAddMainContainer.show();
//			waf.widgets.sideBarComponent_quickAddAccountName.focus();
			/**/
			waf.widgets.sideBarComponent_quickAddAccountName.enable();
			waf.widgets.sideBarComponent_quickAddAccountPhone.enable();
			waf.widgets.sideBarComponent_quickAddAccountWebsite.enable();
			waf.widgets.sideBarComponent_quickAddAccountCity.enable();
			waf.widgets.sideBarComponent_quickAddAccountsSaveButton.enable();
			waf.widgets.sideBarComponent_quickAddAccountName.focus();
			
		}
	};
	
	crmUtilObj.setDisableContactsQuickAdd = function(toggle) {
		if (toggle == "disable") {
			//waf.widgets.sideBarComponent_quickAddMainContainer.hide();
			/**/
	  		//$('#sideBarComponent_quickAddFirstNameContacts').attr('disabled', 'disabled');
			waf.widgets.sideBarComponent_quickAddFirstNameContacts.disable();
			waf.widgets.sideBarComponent_quickAddLastNameContacts.disable();
			waf.widgets.sideBarComponent_quickAddPhoneContacts.disable();
			waf.widgets.sideBarComponent_quickAddEmailContacts.disable();
			waf.widgets.sideBarComponent_quickAddContactsSaveButton.disable();
			
		} else {
//			waf.widgets.sideBarComponent_quickAddMainContainer.show();
//			waf.widgets.sideBarComponent_quickAddFirstNameContacts.focus();
			/**/
			//$('#sideBarComponent_quickAddFirstNameContacts').removeAttr('disabled');
			waf.widgets.sideBarComponent_quickAddFirstNameContacts.enable();
			waf.widgets.sideBarComponent_quickAddLastNameContacts.enable();
			waf.widgets.sideBarComponent_quickAddPhoneContacts.enable();
			waf.widgets.sideBarComponent_quickAddEmailContacts.enable();
			waf.widgets.sideBarComponent_quickAddContactsSaveButton.enable();
			waf.widgets.sideBarComponent_quickAddFirstNameContacts.focus();
			
		}
	};
	
	crmUtilObj.setDisableLeadsQuickAdd = function(toggle) {
		if (toggle == "disable") {
			//waf.widgets.sideBarComponent_quickAddMainContainer.hide();
			/**/
			waf.widgets.sideBarComponent_quickAddFirstNameLeads.disable();
			waf.widgets.sideBarComponent_quickAddLastNameLeads.disable();
			waf.widgets.sideBarComponent_quickAddPhoneLeads.disable();
			waf.widgets.sideBarComponent_quickAddCompanyLeads.disable(); //quickAddLeadsSaveButton
			waf.widgets.sideBarComponent_quickAddLeadsSaveButton.disable();
			
		} else {
			//waf.widgets.sideBarComponent_quickAddMainContainer.show();
			//waf.widgets.sideBarComponent_quickAddFirstNameLeads.focus();
			/**/
			waf.widgets.sideBarComponent_quickAddFirstNameLeads.enable();
			waf.widgets.sideBarComponent_quickAddLastNameLeads.enable();
			waf.widgets.sideBarComponent_quickAddPhoneLeads.enable();
			waf.widgets.sideBarComponent_quickAddCompanyLeads.enable(); //quickAddLeadsSaveButton
			waf.widgets.sideBarComponent_quickAddLeadsSaveButton.enable();
			waf.widgets.sideBarComponent_quickAddFirstNameLeads.focus();
			
		}
	};
	
	crmUtilObj.testMessage = function() {console.log("Wakanda CRM Utility Module is Active.");};
	
	//Sign Up New User
	crmUtilObj.signUp = function(signUpObj) {
		waf.ds.User.addUser({
			onSuccess: function(event) {
				$$("signUpMessage").setValue(event.result.errorMessage);
				
				if (waf.directory.currentUser() !== null) {
					signUpObj.name = "";
					signUpObj.email = "";
					signUpObj.password = "";
					signUpObj.verifyPassword = "";
					waf.sources.signUpObj.sync();
					
					//***note*** make this a function()
					$('#headerContainerBackground').css('background', '#f5f5f5');
					$('#headerContainerBackground').css('border-bottom', 'solid 1px lightgray');
					$$("signUpContainer").hide(); //hide
					$$("bodyContainer").show(); //show	
					waf.widgets.bodyComponent.loadComponent({path: '/home.waComponent'}); 
					$$('sideBarComponent').loadComponent({path: '/sideBar.waComponent', userData: {menuItem: "home"}}); 
					//crmUtil.menuBarKeepHighlight('menuBar1', 'menuItem1');
					waf.widgets.menuBar1.crmSetSelectedMenuItem('menuItem1');
					//Load the recent items into our recent items container.
					crmUtil.loadRecentItems('recentItemsBodyContainer');
					//***note*** end - make this a function()
					
					//Switch our login and logout containers.
					$$('loginComponent_signInStatusMessage').setValue("Signed in as: " + waf.directory.currentUser().fullName);
					$('#loginComponent_loginContainer').fadeOut(400); //hide()
					$('#loginComponent_logoutContainer').fadeIn(900); //show() 			
				} //end - if (waf.directory.currentUser() !== null)
			} //end - onSuccess
		}, signUpObj);	//end - waf.ds.User.addUser
	};
	
	crmUtilObj.quickAddContacts = function() {
		waf.sources.contact.addNewElement();
		waf.sources.contact.serverRefresh({
			onSuccess:function(event){
	            // the new entity has been initialized by the server
	            waf.sources.contact.firstName = waf.widgets.sideBarComponent_quickAddFirstNameContacts.getValue();
				waf.sources.contact.lastName = waf.widgets.sideBarComponent_quickAddLastNameContacts.getValue();
				waf.sources.contact.phone = waf.widgets.sideBarComponent_quickAddPhoneContacts.getValue();
				waf.sources.contact.emailAccnt = waf.widgets.sideBarComponent_quickAddEmailContacts.getValue();
				
				waf.sources.contact.save({
					onSuccess:function(event){
						waf.sources.contact.autoDispatch();
						crmUtil.newRecentItem("contacts", "Contact: ", waf.sources.contact.firstName + " " + waf.sources.contact.lastName, waf.sources.contact.ID, 'recentItemsBodyContainer');
						//reset form
						waf.widgets.sideBarComponent_quickAddFirstNameContacts.setValue();
						waf.widgets.sideBarComponent_quickAddLastNameContacts.setValue();
						waf.widgets.sideBarComponent_quickAddPhoneContacts.setValue();
						waf.widgets.sideBarComponent_quickAddEmailContacts.setValue();
						waf.widgets.sideBarComponent_quickAddFirstNameContacts.focus();
					}
				}); //end - save()
			}
        }); //end - serverRefresh()
	};
	
	crmUtilObj.quickAddLeads = function() {
		waf.sources.lead.addNewElement();
		waf.sources.lead.serverRefresh({
			onSuccess:function(event){
	            // the new entity has been initialized by the server
	            waf.sources.lead.firstName = waf.widgets.sideBarComponent_quickAddFirstNameLeads.getValue();
				waf.sources.lead.lastName = waf.widgets.sideBarComponent_quickAddLastNameLeads.getValue();
				waf.sources.lead.phone = waf.widgets.sideBarComponent_quickAddPhoneLeads.getValue();
				waf.sources.lead.company = waf.widgets.sideBarComponent_quickAddCompanyLeads.getValue();
				waf.sources.lead.save({
					onSuccess:function(event) {
						waf.sources.lead.autoDispatch();
						crmUtil.newRecentItem("leads", "Lead: ", waf.sources.lead.firstName + " " + waf.sources.lead.lastName, waf.sources.lead.ID, 'recentItemsBodyContainer');        
						//reset form
						waf.widgets.sideBarComponent_quickAddFirstNameLeads.setValue();
						waf.widgets.sideBarComponent_quickAddLastNameLeads.setValue();
						waf.widgets.sideBarComponent_quickAddPhoneLeads.setValue();
						waf.widgets.sideBarComponent_quickAddCompanyLeads.setValue();
						waf.widgets.sideBarComponent_quickAddFirstNameLeads.focus();
					}
				});
        	}
    	});
	};
	
	crmUtilObj.quickAddAccounts = function() {
		waf.sources.account.addNewElement();
		waf.sources.account.serverRefresh({
			onSuccess:function(event){
		        // the new entity has been initialized by the server
		        //Now update the new entity with the form values.
		        waf.sources.account.name = waf.widgets.sideBarComponent_quickAddAccountName.getValue(); //$$(quickAddAccountName).getValue()
				waf.sources.account.phone = waf.widgets.sideBarComponent_quickAddAccountPhone.getValue(); //$$(quickAddAccountPhone).getValue()
				waf.sources.account.website = waf.widgets.sideBarComponent_quickAddAccountWebsite.getValue(); //$$(quickAddAccountWebsite).getValue()
				waf.sources.account.billingCity = waf.widgets.sideBarComponent_quickAddAccountCity.getValue(); //$$(quickAddAccountCity).getValue()
				//Save the entity.
				waf.sources.account.save({
					onSuccess:function(event){
						waf.sources.account.autoDispatch();
						crmUtil.newRecentItem("accounts", "Account: ", waf.sources.account.name, waf.sources.account.ID, 'recentItemsBodyContainer');
						//reset form
						waf.widgets.sideBarComponent_quickAddAccountName.setValue();
						waf.widgets.sideBarComponent_quickAddAccountPhone.setValue();
						waf.widgets.sideBarComponent_quickAddAccountWebsite.setValue();
						waf.widgets.sideBarComponent_quickAddAccountCity.setValue();
						waf.widgets.sideBarComponent_quickAddAccountName.focus();
					}
				});	
			}
   		});
	};
	
	//Create Quick Add Account Event Handler for Return Key.
	crmUtilObj.setQuickAddAccountReturnKey = function() {
		$('.quickAddAccount').live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			crmUtilObj.quickAddAccounts();
	    	}
		});
	};
	
	//Create Quick Add Lead Event Handler for Return Key.
	crmUtilObj.setQuickAddLeadReturnKey = function() {
		$('.quickAddLead').live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			crmUtilObj.quickAddLeads();
	    	}
		});
	};
	
	//Create Quick Add Contact Event Handler for Return Key.
	crmUtilObj.setQuickAddContactReturnKey = function() {
		$('.quickAddContact').live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			crmUtilObj.quickAddContacts();
	    	}
		});
	};
	
	//Create Recent Items Event Handler.
	//Call this once at Startup.
	crmUtilObj.setRecentItemsEventHandler = function() {
		var theSortOrder, theDataClass,  theEntityID,
			$this, theNewPath, theView;
			
		$('.recentItem').live('click', function(e) {
			$this = $(this);
			theSortOrder = $this.data('sortorder');
		 	theDataClass = $this.data('class');
		 	theEntityID = $this.data('entity');
		 	//theConverted = $this.data('converted');
		 	theNewPath = '/' + theDataClass + '.waComponent';
			theView = "detail";	
		 	$$('bodyComponent').loadComponent({path: theNewPath, userData: {view: theView}});
		 	$$('sideBarComponent').loadComponent({path: '/sideBar.waComponent', userData: {menuItem: theDataClass}});
		 	
		 	switch(theDataClass) {
				case "accounts":
				crmUtilObj.setDisableAccountsQuickAdd('disable');
				waf.widgets.menuBar1.crmSetSelectedMenuItem('menuItem3');
				waf.sources.account.selectByKey($this.data('entity'));
				break;
					
				case "contacts":
				crmUtilObj.setDisableContactsQuickAdd('disable');
				waf.widgets.menuBar1.crmSetSelectedMenuItem('menuItem4');
				waf.sources.contact.selectByKey($this.data('entity'));
				break;
					
				case "leads":
				crmUtilObj.setDisableLeadsQuickAdd('disable');
				waf.widgets.menuBar1.crmSetSelectedMenuItem('menuItem2');
				waf.sources.lead.selectByKey($this.data('entity'));
				break;
			}
		}); // end - event handlers for recent items link.
	};
	
	//Create New Recent Item
	crmUtilObj.newRecentItem = function(dataClassName, titleKey, titleValue, entityKey, targetContainer) {
		var recentItem = ds.RecentItem.newEntity(); // create the entity
		recentItem.dataClassName.setValue(dataClassName);
		recentItem.title.setValue(titleKey + titleValue); 
		recentItem.entityKey.setValue(entityKey);
		recentItem.sortOrder.setValue(0);
		
		ds.RecentItem.newRecentItem(dataClassName, titleKey, titleValue, entityKey, {
			onSuccess: function(event) {
				crmUtil.loadRecentItems('recentItemsBodyContainer', event.result);
			}
		});
	};
	
	//Load Recent Items - Try Again!
	crmUtilObj.loadRecentItems = function(targetContainer, recentItemsArr) {
		var myHTML,
			sessionCurrentUser = WAF.directory.currentUser(),
			theDataClass, theView, convertedString, 
			theTitle, theNewPath, $this, theConverted,
			recentItemsCollection, theEntityID, theSortOrder,
			theEntityKey;
		
		if (recentItemsArr == null) {
			waf.ds.RecentItem.all({
				orderBy: "sortOrder",
				onSuccess: function(event) {
					recentItemsCollection = event.entityCollection;
					if (recentItemsCollection.length > 0) {	
						myHTML = '<ul class="recentItemsList">';
						recentItemsCollection.forEach({
							onSuccess: function(evRecentItem) {	
								theSortOrder = evRecentItem.entity.sortOrder.getValue();
								theDataClass = evRecentItem.entity.dataClassName.getValue();
								theEntityKey = evRecentItem.entity.entityKey.getValue();
								theTitle = evRecentItem.entity.title.getValue(); 
								myHTML += '<li><a data-class="' + theDataClass + '"data-entity="' + theEntityKey + '"data-sortorder="' + theSortOrder + '" class="recentItem" href="#">' + theTitle + '</a></li>'; //data-converted="' + convertedString + '"
							}			
						});	
						myHTML += '</ul>';	
						
					} else {
						myHTML = 'No recent Items.';
					}
					
					$('#' + targetContainer).html(myHTML);	
				} //onSuccess
			}); 
			
		} else {
			//We have a recent items array.
			if (recentItemsArr.length > 0) {
				myHTML = '<ul class="recentItemsList">';
				
				recentItemsArr.forEach(function(recentItem) {
					theSortOrder = recentItem.sortOrder;
					theDataClass = recentItem.dataClassName;
					theEntityKey= recentItem.entityKey;
					theTitle = recentItem.title;
					myHTML += '<li><a data-class="' + theDataClass + '"data-entity="' + theEntityKey + '"data-sortorder="' + theSortOrder + '" class="recentItem" href="#">' + theTitle + '</a></li>'; //data-converted="' + convertedString + '"
				});
				myHTML += '</ul>';	
			} else {
				myHTML = 'No recent Items.';
			}
			$('#' + targetContainer).html(myHTML);	
		}
	}; //end - crmUtilObj.loadRecentItems
	
	return crmUtilObj;
}()); 
