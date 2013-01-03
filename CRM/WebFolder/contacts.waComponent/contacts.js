
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var quickAddFirstName = getHtmlId('quickAddFirstName'),
		quickAddLastName = getHtmlId('quickAddLastName'),
		quickAddTitle = getHtmlId('quickAddTitle'),
		//contactDataSource = waf.sources[id + "_contact"]; 
		contactDataSource = waf.sources.contact;
			
	function quickAdd() {
		//Tried to use an object datasource to bind to the quick add fields...problems.
		//console.log($$(quickAddFirstName).getValue());
		
		contactDataSource.addNewElement();
		contactDataSource.serverRefresh({onSuccess:function(event){
            // the new entity has been initialized by the server
            contactDataSource.firstName = $$(quickAddFirstName).getValue();
			contactDataSource.lastName = $$(quickAddLastName).getValue();
			contactDataSource.title = $$(quickAddTitle).getValue();
			contactDataSource.save();
			contactDataSource.autoDispatch();
			//reset form
			$$('quickAddFirstName').setValue();
			$$('quickAddLastName').setValue();
			$$('quickAddTitle').setValue();
			
			$('#' + quickAddFirstName).focus();
        }});
	}
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'contacts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		$("#" + quickAddFirstName + ", #" + quickAddLastName+ ", #" + quickAddTitle).live('keyup', function (e) {
	   		if ( e.keyCode == 13 ) {
	   			quickAdd();
	    	}
		});
	// @region namespaceDeclaration// @startlock
	var quickAddSaveButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	quickAddSaveButton.click = function quickAddSaveButton_click (event)// @startlock
	{// @endlock
		quickAdd();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_quickAddSaveButton", "click", quickAddSaveButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
