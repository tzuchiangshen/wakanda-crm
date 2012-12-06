
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var comboWidthPx = $('#' + id + '_combobox1').css('width');
		var comboWidth = $('#' + id + '_combobox1').width();
		//var inputWidth = $('#' + id + '_combobox1 input').width();
		//console.log("combo width: " + comboWidth + " : " + comboWidthPx);
		//console.log("input width: " + inputWidth);
		$('#' + id + '_combobox1 input').css('width', comboWidth - 27);
		
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

		
	};// @lock


}// @startlock
return constructor;
})();// @endlock
