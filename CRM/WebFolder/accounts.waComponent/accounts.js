
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var quickAddAccountName = getHtmlId('quickAddAccountName'),
		quickAddPhone = getHtmlId('quickAddPhone'),
		quickAddWebsite = getHtmlId('quickAddWebsite'),
		quickAddCity = getHtmlId('quickAddCity'),
		quickAddCountry = getHtmlId('quickAddCountry'),
		accountDataSource = waf.sources[id + "_account"];
	
	function quickAdd() {
		//Tried to use an object datasource to bind to the quick add fields...problems.
		accountDataSource.addNewElement();
		accountDataSource.serverRefresh({onSuccess:function(event){
            // the new entity has been initialized by the server
            accountDataSource.name = $$(quickAddAccountName).getValue();
			accountDataSource.phone = $$(quickAddPhone).getValue();
			accountDataSource.website = $$(quickAddWebsite).getValue();
			accountDataSource.billingCity = $$(quickAddCity).getValue();
			accountDataSource.billingCountry = $$(quickAddCountry).getValue();
			accountDataSource.save();
			accountDataSource.autoDispatch();
			//reset form
			$$(quickAddAccountName).setValue();
			$$(quickAddPhone).setValue();
			$$(quickAddWebsite).setValue();
			$$(quickAddCity).setValue();
			$$(quickAddCountry).setValue();
			
			$('#' + quickAddAccountName).focus();
        }});
	}	
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'accounts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		$("#" + quickAddAccountName + ", #" + quickAddPhone+ ", #" + quickAddWebsite + ", #" + quickAddCity + ", #" + quickAddCountry).live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			quickAdd();
	    	}
		});

	// @region namespaceDeclaration// @startlock
	var quickAddSaveButtonAcct = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	quickAddSaveButtonAcct.click = function quickAddSaveButtonAcct_click (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_quickAddSaveButtonAcct", "click", quickAddSaveButtonAcct.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
