
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var contactsUL = getHtmlId('contactsUL'),
		contactsUL$ = getHtmlObj('contactsUL'),
		contactDetailTemplateSource = $("#contact-list-template").html(),
		contactDetailTemplate = Handlebars.compile(contactDetailTemplateSource),
		contactData = "",
		firstNameInput = getHtmlId('firstNameInput'),
		lastNameInput = getHtmlId('lastNameInput');
	
		
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
						contactData = 	{
							lastName: 	ev2.entity.lastName.getValue(),
							city:    	ev2.entity.city.getValue(),
							dataId: 	ev2.entity.ID.getValue()
						};
						contactsUL$.append(contactDetailTemplate(contactData));
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
		
		contactsUL$.on('click', '.contactPreview', function (event) {
			var this$ = $(this);
	   		this$.addClass('contactPermSelected');
	   		this$.siblings().removeClass('contactPermSelected');
	   		
	   		
	   		var contactId = this$.children('div.contactIdent').attr('data-id');
	   		ds.Contact.find("ID = :1", contactId, {
	   			onSuccess: function(event) {
	   				$$(firstNameInput).setValue(event.entity.firstName.getValue());
	   				$$(lastNameInput).setValue(event.entity.lastName.getValue());
	   				//local datasource sync with input fields does not work.
	   				/*
	   				console.log(event.entity.lastName.getValue());
	   				console.log("Before: " + $comp.sources.contactObject.lastName);
	   				$comp.sources.contactObject.lastName = event.entity.lastName.getValue();
	   				$comp.sources.contactObject.firstName = event.entity.firstName.getValue();
	   				console.log("After: " + $comp.sources.contactObject.lastName);
	   				$comp.sources.contactObject.sync();
	   				*/
	   			}
	   		});
	   		
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
