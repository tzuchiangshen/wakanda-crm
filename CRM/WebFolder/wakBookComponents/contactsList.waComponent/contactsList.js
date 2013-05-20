
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var contactsUL = getHtmlId('contactsUL'),
		contactsUL$ = getHtmlObj('contactsUL'),
		contactDetailTemplateSource = $("#contact-list-template").html(),
		contactDetailTemplate = Handlebars.compile(contactDetailTemplateSource),
		contactData = "";
	
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'contactsList';
	// @endregion// @endlock
	function buildContactGrid() {
		contactsUL$.children().remove();
		
		/**/
		ds.Contact.all({
			onSuccess: function(ev1) {
				ev1.entityCollection.forEach({
					onSuccess: function(ev2) {	
						/*
						var contactLi = $('<li>', {
							text: ev2.entity.lastName.getValue(),
							"class" : "contactPreview"
						});
						*/
						contactData = {lastName: ev2.entity.lastName.getValue()};
						contactsUL$.append(contactDetailTemplate(contactData));
						
						/* handlebars experiments*/
						//contact-list-template
						/*
						var contactDetailTemplateSource = $("#contact-list-template").html(),
						 	 contactDetailTemplate = Handlebars.compile(contactDetailTemplateSource),
							contactData = {lastName: "xiang lui"};
						console.log(contactDetailTemplate(contactData));
						*/
					}
				}); //ev1.entityCollection.forEach
			}
		});
		
	}
	
	this.load = function (data) {// @lock
		//event handlers
		contactsUL$.on('mouseenter', '.contactPreview', function (event) {
	   		$(this).addClass('contactSelected');
		});
		
		contactsUL$.on('mouseleave', '.contactPreview', function (event) {
	   		$(this).removeClass('contactSelected');
		});
		
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
