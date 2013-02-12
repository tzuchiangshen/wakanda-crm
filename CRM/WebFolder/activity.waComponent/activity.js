
(function Component (id) {// @lock
	

// Add the code that needs to be shared between components here

function constructor (id) {
	//detailComponent
	var detailComponent = getHtmlId('detailComponent');
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'activity';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		$$(detailComponent).loadComponent({path: '/activityDetail.waComponent'});
		
	// @region namespaceDeclaration// @startlock
	var dataGrid1 = {};	// @dataGrid
	var activityDetailCancelButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		$$(id + "_tabView1").selectTab(2);
	};// @lock

	activityDetailCancelButton.click = function activityDetailCancelButton_click (event)// @startlock
	{// @endlock
		$$(id + "_tabView1").selectTab(1);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_activityDetailCancelButton", "click", activityDetailCancelButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
