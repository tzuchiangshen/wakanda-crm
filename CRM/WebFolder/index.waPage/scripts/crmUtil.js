﻿//Utility library for Wakanda CRM application.

var crmUtil = (function() {
	//Private Functions and Vars ----- Start
	
	//Private Functions and Vars ----- End
	
	var crmUtilObj = {}; //This is the object we will return to create our module.
	
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
					
				}
				
			}
		}, signUpObj);	//end - waf.ds.User.addUser
	};
	
	
	//***remove***
	//Keep current menu item on main menubar hightlighted.
	//crmUtilObj.menuBarKeepHighlight = function(menuBarName, menuItem) {
		//***remove***
		/*
		var menuBarSiblingsRef = '#' + menuBarName + ' li div',
			menuItemRef = '#' + menuItem + ' div',
			menuItemContainerRef = '#' + menuItem,
			menuBarContainerSiblingsRef = '#' + menuBarName + ' li';
			
		$(menuBarSiblingsRef).removeClass('crm-menuSelected'); //unhighlight all other menuitems.
		$(menuBarContainerSiblingsRef).removeClass('crm-menuSelected2'); 
		$(menuItemRef).addClass('crm-menuSelected'); //highlight the selected menuitem.
		$(menuItemContainerRef).addClass('crm-menuSelected2'); //mark the selected menuitem container.
		*/
	//};
	//***end remove***
	
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
						/*
						$$(quickAddFirstNameContacts).setValue();
						$$(quickAddLastNameContacts).setValue();
						$$(quickAddPhoneContacts).setValue();
						$$(quickAddEmailContacts).setValue();
						$('#' + quickAddFirstNameContacts).focus();
						*/
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
						/*
						$$(quickAddFirstNameLeads).setValue();
						$$(quickAddLastNameLeads).setValue();
						$$(quickAddPhoneLeads).setValue();
						$$(quickAddCompanyLeads).setValue();
						$('#' + quickAddFirstNameLeads).focus();
						*/
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
		$('.recentItem').live('click', function(e) {
			$this = $(this);
		 	theDataClass = $this.data('class');
		 	theEntityID = $this.data('entity');
		 	theConverted = $this.data('converted');
		 	theNewPath = '/' + theDataClass + '.waComponent';
			theView = "detail";	
		 	$$('bodyComponent').loadComponent({path: theNewPath, userData: {view: theView}});
		 	$$('sideBarComponent').loadComponent({path: '/sideBar.waComponent', userData: {menuItem: theDataClass}});
		 	
		 	switch(theDataClass) {
				case "accounts":
				waf.widgets.menuBar1.crmSetSelectedMenuItem('menuItem3');
				waf.sources.account.selectByKey($this.data('entity'));
				break;
					
				case "contacts":
				waf.widgets.menuBar1.crmSetSelectedMenuItem('menuItem4');
				waf.sources.contact.selectByKey($this.data('entity'));
				break;
					
				case "leads":
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
		
		recentItem.save({
        	onSuccess:function(event) {
        		ds.RecentItem.reorderItems();
        		crmUtilObj.loadRecentItems(targetContainer);
        	},
        	
        	onError: function(error) {
        		//console.log(error.error[0].errCode + ": " + error.error[0].message);
        		if (error.error[0].errCode == 9998)
        		 crmUtilObj.loadRecentItems(targetContainer);
        	}
        });
	};
	
	//Load Recent Items - Try Again!
	crmUtilObj.loadRecentItems = function(targetContainer, recentItemsArr) {
		var myHTML,
			sessionCurrentUser = WAF.directory.currentUser(),
			theDataClass, theView, convertedString, 
			theTitle, theNewPath, $this, theConverted,
			recentItemsCollection, theEntityID,
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
								theDataClass = evRecentItem.entity.dataClassName.getValue();
								theEntityKey = evRecentItem.entity.entityKey.getValue();
								theTitle = evRecentItem.entity.title.getValue(); // + " : " + evRecentItem.entity.sortOrder.getValue();
								myHTML += '<li><a data-class="' + theDataClass + '"data-entity="' + theEntityKey + '" class="recentItem" href="#">' + theTitle + '</a></li>'; //data-converted="' + convertedString + '"
							}			
						});	
						myHTML += '</ul>';	
						
					} else {
						myHTML = 'No recent Items.';
					}
					
					$('#' + targetContainer).html(myHTML);	
				} //onSuccess
			}); //waf.ds.RecentItem.query();
		} else {
			//We have a recent items array.
			if (recentItemsArr.length > 0) {
				myHTML = '<ul class="recentItemsList">';
				
				recentItemsArr.forEach(function(recentItem) {
					theDataClass = recentItem.dataClassName;
					theEntityKey= recentItem.entityKey;
					theTitle = recentItem.title;
					myHTML += '<li><a data-class="' + theDataClass + '"data-entity="' + theEntityKey + '" class="recentItem" href="#">' + theTitle + '</a></li>'; //data-converted="' + convertedString + '"
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
