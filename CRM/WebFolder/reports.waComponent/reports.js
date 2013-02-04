
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var exportURLLeads = getHtmlId('exportURLLeads'),
		exportURLLeadsAntiPattern = getHtmlId('exportURLLeadsAntiPattern'),
		exportURLContacts = getHtmlId('exportURLContacts'),
		exportURLContactsAntiPattern = getHtmlId('exportURLContactsAntiPattern'),
		exportURLAccounts = getHtmlId('exportURLAccounts'),
		exportURLAccountsAntiPattern = getHtmlId('exportURLAccountsAntiPattern');
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'reports';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		//Laurent - http://forum.wakanda.org/showthread.php?3899-WebComponents
		//console.log('load reports component');
		
		
		switch(waf.widgets.menuBar1.crmGetSelectedMenuItem())
		{
			case 1:
			$("#" + exportURLLeads).css("top", "25px");
			$("#" + exportURLLeads).css("left", "25px");
//			$("#" + exportURLLeadsAntiPattern).css("top", "40px");
//			$("#" + exportURLLeadsAntiPattern).css("left", "25px");
			
			$$(exportURLContacts).hide(); //hide
			$$(exportURLAccounts).hide(); //hide
//			$$(exportURLContactsAntiPattern).hide(); //hide
//			$$(exportURLAccountsAntiPattern).hide(); //hide
			
			$$(exportURLLeads).show(); //show
//			$$(exportURLLeadsAntiPattern).show(); //show
			break;
			
			case 2:
			$("#" + exportURLAccounts).css("top", "25px");
			$("#" + exportURLAccounts).css("left", "25px");
//			$("#" + exportURLAccountsAntiPattern).css("top", "40px");
//			$("#" + exportURLAccountsAntiPattern).css("left", "25px");
			
			$$(exportURLContacts).hide(); //hide
//			$$(exportURLContactsAntiPattern).hide(); //hide
			$$(exportURLLeads).hide(); //hide
//			$$(exportURLLeadsAntiPattern).hide(); //hide
			
			$$(exportURLAccounts).show(); //show
//			$$(exportURLAccountsAntiPattern).show(); //show
			break;
			
			case 3:
			$("#" + exportURLContacts).css("top", "25px");
			$("#" + exportURLContacts).css("left", "25px");
//			$("#" + exportURLContactsAntiPattern).css("top", "40px");
//			$("#" + exportURLContactsAntiPattern).css("left", "25px");
			
			$$(exportURLAccounts).hide(); //hide
//			$$(exportURLAccountsAntiPattern).hide(); //hide
			$$(exportURLLeads).hide(); //hide
//			$$(exportURLLeadsAntiPattern).hide(); //hide
			
			$$(exportURLContacts).show(); //show
//			$$(exportURLContactsAntiPattern).show(); //show
			break;
			
			default:
			$$(exportURLLeads).hide(); //hide
			$$(exportURLContacts).hide(); //hide
			$$(exportURLAccounts).hide(); //hide
//			$$(exportURLLeadsAntiPattern).hide(); //hide
//			$$(exportURLContactsAntiPattern).hide(); //hide
//			$$(exportURLAccountsAntiPattern).hide(); //hide
		}
		//Laurent - userData is not consistent. Sometimes null.
		/*
		switch(data.userData.menuItem)
		{
			case "leads":
			$("#" + exportURLLeads).css("top", "25px");
			$("#" + exportURLLeads).css("left", "25px");
			$$(exportURLContacts).hide(); //hide
			$$(exportURLAccounts).hide(); //hide
			$$(exportURLLeads).show(); //show
			break;
			
			case "accounts":
			$("#" + exportURLAccounts).css("top", "25px");
			$("#" + exportURLAccounts).css("left", "25px");
			$$(exportURLContacts).hide(); //hide
			$$(exportURLLeads).hide(); //hide
			$$(exportURLAccounts).show(); //show
			break;
			
			case "contacts":
			$("#" + exportURLContacts).css("top", "25px");
			$("#" + exportURLContacts).css("left", "25px");
			$$(exportURLAccounts).hide(); //hide
			$$(exportURLLeads).hide(); //hide
			$$(exportURLContacts).show(); //show
			break;
			
			default:
			$$(exportURLLeads).hide(); //hide
			$$(exportURLContacts).hide(); //hide
			$$(exportURLAccounts).hide(); //hide
		}
		*/
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
