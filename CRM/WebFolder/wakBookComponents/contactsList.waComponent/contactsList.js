
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var contactsUL = getHtmlId('contactsUL'),
		contactsUL$ = getHtmlObj('contactsUL');
	
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'contactsList';
	// @endregion// @endlock
	function buildContactGrid() {
		contactsUL$.children().remove();
		
		/**/
		ds.Contact.all({
			onSuccess: function(ev1) {
				console.log(ev1.entityCollection.length);
				ev1.entityCollection.forEach({
					onSuccess: function(ev2) {	
						var contactLi = $('<li>', {
							text: ev2.entity.lastName.getValue(),
							"class" : "contactPreview"
						});
						
						contactsUL$.append(contactLi);
					}
				}); //ev1.entityCollection.forEach
			}
		});
		
	}
	
	this.load = function (data) {// @lock
		buildContactGrid();
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
