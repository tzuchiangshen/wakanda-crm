﻿//Lead data class methods.model.Lead = {};model.Lead.fullName = {};//*** Methodsmodel.Lead.methods = {};//Entity methods.model.Lead.entityMethods = {};/**/model.Lead.entityMethods.convertLead = function(){	var recentItemArr = [];	//debugger;	this.convertedDate = new Date();	this.converted = true;		var newAccount = new ds.Account({		name: this.company,		owner: this.owner	});	newAccount.save();		var newContact = new ds.Contact({		firstName: this.firstName,		lastName: this.lastName,		owner: this.owner	});	newContact.save();		this.convertedContact = newContact;	this.convertedAcct = newAccount;	this.save();		//Update Recent Items	var theRecentItem = ds.RecentItem.find("entityKey = :1 && dataClassName = :2", this.ID, "leads");	if (theRecentItem != null) {		theRecentItem.dataClassName = "contacts";		theRecentItem.entityKey = newContact.ID;		theRecentItem.title = "Contact: " + newContact.firstName + " " + newContact.lastName;		theRecentItem.save();				//var recentItemsCollection = ds.RecentItem.all();		var recentItemsCollection = ds.RecentItem.query("ID > 0 order by sortOrder asc");		recentItemArr = recentItemsCollection.toArray("dataClassName, entityKey, title");	}	//return newContact.ID;	return {contactID: newContact.ID, recentItemsArray: recentItemArr};};model.Lead.entityMethods.convertLead.scope ="public";//Eventsmodel.Lead.events = {};model.Lead.events.onSave = function() {//	var myCurrentUser = currentUser(), // we get the user of the current session.//		myUser = ds.User.find("ID = :1", myCurrentUser.ID);			//Converting This Lead?	/*	if (this.converted) {		this.convertedDate = new Date();				//Laurent says write your own function to create new account and contact and then call save for Lead.		//Create New Account and Contact.		var newAccount = new ds.Account({			name: this.company,			owner: this.owner		});		newAccount.save();				var newContact = new ds.Contact({			firstName: this.firstName,			lastName: this.lastName,			owner: this.owner		});		newContact.save();		this.contactEntityKey = newContact.ID;	}	*/};model.Lead.events.onInit = function() {	var myCurrentUser = currentUser(), // we get the user of the current session.		myUser = ds.User.find("ID = :1", myCurrentUser.ID);		if ((myCurrentUser !== null) && (myUser !== null)) {//if a user is logged in.				this.owner = myUser;	}		this.converted = false;};model.Lead.events.onRestrictingQuery = function() {	var myCurrentUser = currentUser(), // we get the user of the current session.		sessionRef = currentSession(), // Get session.		result;			result = ds.Lead.createEntityCollection(); //default to empty collection.		if (sessionRef.belongsTo("Admin")) {		result = ds.Lead.all();	} else {		result = ds.Lead.query("owner.ID = :1", myCurrentUser.ID);	}		return result;};//Calculated Attributesmodel.Lead.fullName.onGet = function() {	return this.firstName + ' ' + this.lastName;};