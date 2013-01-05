
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var quickAddFirstName = getHtmlId('quickAddFirstName'),
			quickAddLastName = getHtmlId('quickAddLastName'),
			quickAddTitle = getHtmlId('quickAddTitle'),
			quickAddCompany = getHtmlId('quickAddCompany'),
			quickAddPhone = getHtmlId('quickAddPhone'),
			recentItemsBodyContainer = getHtmlId('recentItemsBodyContainer'),
			//leadDataSource = waf.sources[id + "_lead"]; 
			leadDataSource = waf.sources.lead;
			
	function quickAdd() {
		//Tried to use an object datasource to bind to the quick add fields...problems.
		//console.log($$(quickAddFirstName).getValue());
		
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
		
		//Update recent items.
		/**/
		var sessionCurrentUser = waf.directory.currentUser(), // Get the current user
			myHTML,
			theDataClass,
			theEntityKey;
		console.log(sessionCurrentUser.ID);
		waf.ds.User.find("ID = " + sessionCurrentUser.ID, {
			autoExpand: "recentItemCollection",
			onSuccess: function(event) {
				//console.log(event);
				//console.log(event.entity.recentItemCollection.relEntityCollection);
				var recentItemsCollection = event.entity.recentItemCollection.relEntityCollection;
				if (recentItemsCollection.length > 0) {	
					//myHTML = 'This many: ' + recentItemsCollection.length;
					myHTML = '';
					recentItemsCollection.forEach({
						onSuccess: function(evRecentItem) {	
							theDataClass = evRecentItem.entity.dataClassName.getValue();
							theEntityKey = evRecentItem.entity.entityKey.getValue();
							myHTML += '<p><a data-class="' + theDataClass + '"data-entity="' + theEntityKey + '" class="recentItem" href="#">' + theDataClass + ' : ' + theEntityKey + '</a></p>'; 
						}			
					});		
					
				} else {
					myHTML = 'No recent Items.';
				}
				$('#' + recentItemsBodyContainer).html(myHTML);
			}
		});
		
		
		/*
		var currentUserEntity = waf.ds.User.find("ID = " + sessionCurrentUser.ID, {
			onSuccess: function(event) {
				var recentItemsCollection = event.entity.recentItemCollection.relEntityCollection;
				if (recentItemsCollection.length > 0) {	
					var myHTML = '';
					recentItemsCollection.forEach({
						onSuccess: function(evRecentItem) {	
							var theDataClass = evRecentItem.entity.dataClassName.getValue();
							myHTML += '<p class="title">' + theDataClass + '</p>'; 
						}			
					});		
							
				} else {
					var myHTML = 'No recent Items.';
					$('#' + recentItemsBodyContainer).html(myHTML);
				} //if (recentItemsCollection.length > 0)
				
//				var myHTML = '';
//				myHTML += '<p class="title">Red</p>'; 
//				myHTML += '<p class="title">Blue</p>'; 
//				myHTML += '<p class="title">Green</p>';
//				$('#' + recentItemsBodyContainer).html(myHTML);
			}
		});
		*/
		
		 //set event handler on recent item links
		 //class: recentItem
		 $('.recentItem').live('click', function(e) {
		 	var $this = $(this),
		 		theDataClass = $this.data('class'),
		 		theEntityID = $this.data('entity');
		 		//console.log(theEntityID);
		 	//console.log($this.data('class') + " / " + $this.data('entity'));
		 	
		 	var theNewPath = '/' + theDataClass + '.waComponent';
		 	//console.log(theNewPath);
		 	$$('bodyComponent').loadComponent({path: theNewPath, userData: {view: "detail"}});
		 	$('#menuBar1 li div').removeClass('menuSelected');
		 	
		 	if (theDataClass == "accounts") {
		 		$('#menuItem3 div').addClass('menuSelected');
				waf.sources.account.selectByKey($this.data('entity'));
		 	} else {
		 		$('#menuItem4 div').addClass('menuSelected');
				waf.sources.contact.selectByKey($this.data('entity'));
		 	}
		 	
		 	/*
		 	$$('bodyComponent').loadComponent({path: '/accounts.waComponent', userData: {view: "detail"}});
			$('#menuBar1 li div').removeClass('menuSelected');
			$('#menuItem3 div').addClass('menuSelected');
			waf.sources.account.selectByKey(120);
			*/
		 	
		 });
			
		$("#" + quickAddFirstName + ", #" + quickAddLastName+ ", #" + quickAddTitle + ", #" + quickAddPhone + ", #" + quickAddCompany).live('keyup', function (e) {
	   		if ( e.keyCode == 13 ) {
	   			quickAdd();
	    	}
		});
			
	// @region namespaceDeclaration// @startlock
	var testLink = {};	// @richText
	var quickAddSaveButton = {};	// @button
	var leadsCancelButton = {};	// @button
	var leadsDataGrid = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	testLink.click = function testLink_click (event)// @startlock
	{// @endlock
		$$('bodyComponent').loadComponent({path: '/accounts.waComponent', userData: {view: "detail"}});
		$('#menuBar1 li div').removeClass('menuSelected');
		$('#menuItem3 div').addClass('menuSelected');
		waf.sources.account.selectByKey(120);
		//$$(id + "_tabView1").selectTab(1);
	};// @lock

	quickAddSaveButton.click = function quickAddSaveButton_click (event)// @startlock
	{// @endlock
		// Add your code here
		quickAdd();
		
		
	};// @lock

	leadsCancelButton.click = function leadsCancelButton_click (event)// @startlock
	{// @endlock
		// Add your code here
		$$(id + "_tabView2").selectTab(1);
	};// @lock

	leadsDataGrid.onRowClick = function leadsDataGrid_onRowClick (event)// @startlock
	{// @endlock
		//Add to recent items.
		var sessionCurrentUser = WAF.directory.currentUser();
		//Load the User entity for current session.
		/*
		var theUser = waf.ds.User.find("ID = " + sessionCurrentUser.ID, {
			onSuccess: function(event) {
				
			}
		}); 
		*/
		
		//Create a recent items entity.
		var recentItem = ds.RecentItem.newEntity(); // create the entity
		recentItem.dataClassName.setValue("leads");
		recentItem.entityKey.setValue(waf.sources.lead.ID);
		recentItem.save({
        	onSuccess:function(event) {
        
        	}
        });

		
		
		
	};// @lock

	leadsDataGrid.onRowDblClick = function leadsDataGrid_onRowDblClick (event)// @startlock
	{// @endlock
		// Add your code here
		$$(id + "_tabView2").selectTab(2);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_leadsDataGrid", "onRowClick", leadsDataGrid.onRowClick, "WAF");
	WAF.addListener(this.id + "_testLink", "click", testLink.click, "WAF");
	WAF.addListener(this.id + "_quickAddSaveButton", "click", quickAddSaveButton.click, "WAF");
	WAF.addListener(this.id + "_leadsCancelButton", "click", leadsCancelButton.click, "WAF");
	WAF.addListener(this.id + "_leadsDataGrid", "onRowDblClick", leadsDataGrid.onRowDblClick, "WAF");
	// @endregion// @endlock

		
	};// @lock


}// @startlock
return constructor;
})();// @endlock
