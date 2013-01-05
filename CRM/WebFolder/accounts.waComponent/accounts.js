
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var quickAddAccountName = getHtmlId('quickAddAccountName'),
		quickAddPhone = getHtmlId('quickAddPhone'),
		quickAddWebsite = getHtmlId('quickAddWebsite'),
		quickAddCity = getHtmlId('quickAddCity'),
		quickAddCountry = getHtmlId('quickAddCountry'),
		//accountDataSource = waf.sources[id + "_account"];
		accountDataSource = waf.sources.account;
	
	function quickAdd() {
		//Laurent: Tried to use an object datasource to bind to the quick add fields...problems.
		/*
		accountDataSource.newAccount({
			onSuccess: function(event) {
				//console.log(event);
				console.log("Returned Entity: " + event.result);
				
				event.result.name.setValue($$(quickAddAccountName).getValue());
				event.result.phone.setValue($$(quickAddPhone).getValue());
				event.result.website.setValue($$(quickAddWebsite).getValue());
				event.result.billingCity.setValue($$(quickAddCity).getValue());
				event.result.billingCountry.setValue($$(quickAddCountry).getValue());
				
				accountDataSource.setCurrentEntity(event.result);
				
				accountDataSource.save({
					onSuccess: function(event) {
						accountDataSource.addEntity(accountDataSource.getCurrentElement());
					}
				});
				
				
			}
		});
		*/
		
		/**/
		accountDataSource.addNewElement();
		accountDataSource.serverRefresh({
			onSuccess:function(event){
		        // the new entity has been initialized by the server
		        //Now update the new entity with the form values.
		        accountDataSource.name = $$(quickAddAccountName).getValue();
				accountDataSource.phone = $$(quickAddPhone).getValue();
				accountDataSource.website = $$(quickAddWebsite).getValue();
				accountDataSource.billingCity = $$(quickAddCity).getValue();
				accountDataSource.billingCountry = $$(quickAddCountry).getValue();
				//Save the entity.
				accountDataSource.save();
				accountDataSource.autoDispatch();
				//reset form
				$$(quickAddAccountName).setValue();
				$$(quickAddPhone).setValue();
				$$(quickAddWebsite).setValue();
				$$(quickAddCity).setValue();
				$$(quickAddCountry).setValue();
				
				$('#' + quickAddAccountName).focus();
			}
   		});
   		
	}	
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'accounts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		//console.log("userData: " + data.userData);
		//console.log("userData View: " + data.userData.view);
		
		
		
		$("#" + quickAddAccountName + ", #" + quickAddPhone + ", #" + quickAddWebsite + ", #" + quickAddCity + ", #" + quickAddCountry).live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			quickAdd();
	    	}
		});

	// @region namespaceDeclaration// @startlock
	var tabView1 = {};	// @tabView
	var button2 = {};	// @button
	var accountsDataGrid = {};	// @dataGrid
	var button1 = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	tabView1.onReady = function tabView1_onReady (event)// @startlock
	{// @endlock
		console.log("tab ready");
		/*
		if (data.userData.view == "detail") {
			console.log("Detail View Selected. Red Alert. : " + $$(id + "_tabView1"));
			//debugger;
			$$(id + "_tabView1").selectTab(2);
			//waf.widgets.bodyComponent_tabView1.selectTab(2);
		} else {
			console.log("Detail View Not Requested.");
		}
		*/
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		$$(id + "_tabView1").selectTab(1);
	};// @lock

	accountsDataGrid.onRowClick = function accountsDataGrid_onRowClick (event)// @startlock
	{// @endlock
		//Add recent item.
		var sessionCurrentUser = WAF.directory.currentUser();
		var recentItem = ds.RecentItem.newEntity(); // create the entity
		recentItem.dataClassName.setValue("accounts");
		recentItem.entityKey.setValue(waf.sources.account.ID);
		recentItem.save({
        	onSuccess:function(event) {
        
        	}
        });
	};// @lock

	accountsDataGrid.onRowDblClick = function accountsDataGrid_onRowDblClick (event)// @startlock
	{// @endlock
		$$(id + "_tabView1").selectTab(2);
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		quickAdd();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_accountsDataGrid", "onRowClick", accountsDataGrid.onRowClick, "WAF");
	WAF.addListener(this.id + "_tabView1", "onReady", tabView1.onReady, "WAF");
	WAF.addListener(this.id + "_button2", "click", button2.click, "WAF");
	WAF.addListener(this.id + "_accountsDataGrid", "onRowDblClick", accountsDataGrid.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
