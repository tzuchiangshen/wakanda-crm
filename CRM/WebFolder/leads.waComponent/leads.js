
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var quickAddFirstName = getHtmlId('quickAddFirstName'),
			quickAddLastName = getHtmlId('quickAddLastName'),
			quickAddTitle = getHtmlId('quickAddTitle'),
			quickAddCompany = getHtmlId('quickAddCompany'),
			quickAddPhone = getHtmlId('quickAddPhone'),
			recentItemsBodyContainer = getHtmlId('recentItemsBodyContainerLeads'),
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
		//Have to do this here in case user reloads page.
		sessionCurrentUser = waf.directory.currentUser(); // Set the current user
		//Load the recent items into our recent items container.
		crmUtil.loadRecentItems(recentItemsBodyContainer);
		//Add event handler to our quickAdd lead.	
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
		//var sessionCurrentUser = WAF.directory.currentUser();
		//Load the User entity for current session.
		/*
		var theUser = waf.ds.User.find("ID = " + sessionCurrentUser.ID, {
			onSuccess: function(event) {
				
			}
		}); 
		*/
		
		//Create a recent items entity.
		//crmUtil.newRecentItem();
		
		
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
