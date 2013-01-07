//Utility library for Wakanda CRM application.

var crmUtil = (function() {
	//Private Functions and Vars ----- Start
	
	//Private Functions and Vars ----- End
	
	var crmUtilObj = {}; //This is the object we will return to create our module.
	
	crmUtilObj.testMessage = function() {console.log("Wakanda CRM Util Module is Active.");};
	
	//Keep current menu item on main menubar hightlighted.
	crmUtilObj.menuBarKeepHighlight = function(menuBarName, menuItem) {
		//console.log('crmUtilObj.menuBarKeepHighlight called');
		
		var menuBarSiblingsRef = '#' + menuBarName + ' li div',
			menuItemRef = '#' + menuItem + ' div';
			
		$(menuBarSiblingsRef).removeClass('menuSelected'); //unhighlight all other menuitems.
		$(menuItemRef).addClass('menuSelected'); //highlight the selected menuitem.
		//waf.widgets.menuItem2.disable();
	};
	
	//Create new Recent Item.
	crmUtilObj.newRecentItem = function() {
		
	};
	
	//Load Recent Items for current user into a container.
	crmUtilObj.loadRecentItems = function(targetContainer) {
		//console.log('crmUtilObj.loadRecentItems called');
		var myHTML,
			theDataClass,
			theTitle,
			recentItemsCollection,
			theEntityKey;
		
		waf.ds.User.find("ID = " + sessionCurrentUser.ID, {
			autoExpand: "recentItemCollection",
			onSuccess: function(event) {
				recentItemsCollection = event.entity.recentItemCollection.relEntityCollection;
				if (recentItemsCollection.length > 0) {	
					myHTML = '';
					recentItemsCollection.forEach({
						onSuccess: function(evRecentItem) {	
							theDataClass = evRecentItem.entity.dataClassName.getValue();
							theEntityKey = evRecentItem.entity.entityKey.getValue();
							theTitle = evRecentItem.entity.title.getValue();
							myHTML += '<p><a data-class="' + theDataClass + '"data-entity="' + theEntityKey + '" class="recentItem" href="#">' + theTitle + '</a></p>'; 
						}			
					});		
					
				} else {
					myHTML = 'No recent Items.';
				}
				
				$('#' + targetContainer).html(myHTML);
			},
			
			onError: function(error) {
				myHTML = '';
				$('#' + targetContainer).html(myHTML);
			}
		});
		
		 //set event handler on recent item links
		 //class: recentItem
		 $('.recentItem').live('click', function(e) {
		 	var $this = $(this),
		 		theDataClass = $this.data('class'),
		 		theEntityID = $this.data('entity');
		 	//debugger;
		 	var theNewPath = '/' + theDataClass + '.waComponent';
		 	//$$('bodyComponent').loadComponent({path: theNewPath, userData: {view: "detail"}});
		 	$$('bodyComponent').loadComponent({path: theNewPath});
		 	
		 	switch(theDataClass) {
				case "accounts":
				crmUtil.menuBarKeepHighlight('menuBar1', 'menuItem3');
				waf.sources.account.selectByKey($this.data('entity'));
				break;
					
				case "contacts":
				crmUtil.menuBarKeepHighlight('menuBar1', 'menuItem4');
				waf.sources.contact.selectByKey($this.data('entity'));
				break;
					
				case "leads":
				crmUtil.menuBarKeepHighlight('menuBar1', 'menuItem2');
				waf.sources.lead.selectByKey($this.data('entity'));
				break;
			}

			
			
		 	/*
		 	$('#menuBar1 li div').removeClass('menuSelected');
		 	if (theDataClass == "accounts") {
		 		$('#menuItem3 div').addClass('menuSelected');
				waf.sources.account.selectByKey($this.data('entity'));
		 	} else {
		 		$('#menuItem4 div').addClass('menuSelected');
				waf.sources.contact.selectByKey($this.data('entity'));
		 	}
		 	*/
		 	
		 	
		 });
	};
	
	
	return crmUtilObj;
}()); 
