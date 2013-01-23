//Utility library for Wakanda CRM application.

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
					//Laurent the code below does not set my Sign Up input fields to blank. Should it?
					signUpObj.name = "";
					signUpObj.email = "";
					signUpObj.password = "";
					signUpObj.verifyPassword = "";
					waf.sources.signUpObj.sync();
					
//					$$('inputUsername').setValue();
//					$$('inputEmailAddress').setValue();
//					$$('iputPassword').setValue();
//					$$('inputVerifyPassword').setValue();
//					$$('signUpMessage').setValue('');
					
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
	crmUtilObj.loadRecentItems = function(targetContainer) {
		var myHTML,
			sessionCurrentUser = WAF.directory.currentUser(),
			theDataClass, theView, convertedString, 
			theTitle, theNewPath, $this, theConverted,
			recentItemsCollection, theEntityID,
			theEntityKey;
		
		//waf.ds.RecentItem.query("owner.ID = :1", sessionCurrentUser.ID, {	
		waf.ds.RecentItem.all({
			orderBy: "sortOrder",
			onSuccess: function(event) {
				recentItemsCollection = event.entityCollection;
				if (recentItemsCollection.length > 0) {	
					myHTML = '<ul class="recentItemsList">';
					recentItemsCollection.forEach({
						onSuccess: function(evRecentItem) {	
							if (evRecentItem.entity.converted.getValue()) {
								convertedString = "true";
							} else {
								convertedString = "false";
							}
							theDataClass = evRecentItem.entity.dataClassName.getValue();
							theEntityKey = evRecentItem.entity.entityKey.getValue();
							theTitle = evRecentItem.entity.title.getValue() + " : " + evRecentItem.entity.sortOrder.getValue();
							myHTML += '<li><a data-converted="' + convertedString + '" data-class="' + theDataClass + '"data-entity="' + theEntityKey + '" class="recentItem" href="#">' + theTitle + '</a></li>'; 
						}			
					});	
					myHTML += '</ul>';	
					
				} else {
					myHTML = 'No recent Items.';
				}
				
				$('#' + targetContainer).html(myHTML);	
				
				//***Anti-Pattern
				//set event handler on recent item links
				/*
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
				*/
				//***end Anti-Pattern
				
			} //onSuccess
		}); //waf.ds.RecentItem.query();
	}; //end - crmUtilObj.loadRecentItems
	
	return crmUtilObj;
}()); 
