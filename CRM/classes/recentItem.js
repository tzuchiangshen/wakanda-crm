﻿//RecentItem data class methods.model.RecentItem = {};//*** Methods//Entity Methods.model.RecentItem.entityMethods = {};//Class methods.model.RecentItem.methods = {};model.RecentItem.methods.removeOldRecentItems = function() {	var oldRecentItemsCollection = ds.RecentItem.query("sortOrder > 5");	oldRecentItemsCollection.remove();	//Now check if the latest recent item (sortOrder == 1) is duplicate.	// If we find it again remove the one that is not sortOrder == 1.	var latestRecentItem = ds.RecentItem.find("sortOrder = :1", 1);	var duplicateRecentItem = ds.RecentItem.query("entityKey = :1 && sortOrder != :2", latestRecentItem.entityKey, 1);	if (duplicateRecentItem != null) {		duplicateRecentItem.remove();	}};model.RecentItem.methods.reorderItems = function() {	var recentItemsCollection = ds.RecentItem.all();	recentItemsCollection.forEach(function(recentItemEntity) {		recentItemEntity.sortOrder += 1;	});		ds.RecentItem.removeOldRecentItems();};//Class methods scope.model.RecentItem.methods.reorderItems.scope ="public";//Eventsmodel.RecentItem.events = {};//onRestrictingQuery()model.RecentItem.events.onRestrictingQuery = function() {	var myCurrentUser = currentUser(), // we get the user of the current session.		sessionRef = currentSession(), // Get session.		result;			result = ds.RecentItem.createEntityCollection(); //default to empty collection.		if (sessionRef.belongsTo("Admin")) {		result = ds.RecentItem.all();	} else {		result = ds.RecentItem.query("owner.ID = :1", myCurrentUser.ID);	}		return result;};//onInit()model.RecentItem.events.onInit = function() {	var myCurrentUser = currentUser(), // we get the user of the current session.		myUser = ds.User.find("ID = :1", myCurrentUser.ID);		//myUser = ds.User.find("login = :1", myCurrentUser.name);	//debugger;	if ((myCurrentUser !== null) && (myUser !== null)) {//if a user is logged in.				this.owner = myUser;	}};