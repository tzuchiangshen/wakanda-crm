﻿	/**/if (loginByPassword("david@fred.com", "dav1dav")) { //"admin", "a"  //"dmartin", "martin" //"jbishop", "bishop"//var theUser = ds.User.find("ID = :1", currentUser().ID);//var oneLead = ds.Lead(467);var activities = ds.Activity.all();activities//var newActivity = new ds.Activity({//	subject: "Make Training Video", //	due: new Date("February 4, 2013"), //	status: "In Progress" ,//	priority: "High" ,//	type: "Task" ,//	owner: theUser ,//	lead: oneLead//});//newActivity.save();			//	var anotherActivity = new ds.Activity({//		subject: "Meet For Lunch", //		due: new Date(), //		status: "In Progress" ,//		priority: "Normal" ,//		type: "Task" ,//		owner: theUser ,//		lead: oneLead//	});//	anotherActivity.save();//	//	var thirdActivity = new ds.Activity({//		subject: "Go Visit Their Office", //		due: new Date(), //		status: "Completed" ,//		priority: "High" ,//		type: "Task" ,//		owner: theUser ,//		lead: oneLead//	});//	thirdActivity.save();	//	var eventActivity = new ds.Activity({//		subject: "Launch Party", //		due: new Date(), //		status: "Not Started" ,//		priority: "Low" ,//		type: "Event" ,//		owner: theUser ,//		lead: oneLead//	});//	eventActivity.save();//var leads = ds.Lead.all();//leads //.remove();//var entity = ds.RecentItem.find("ID = :1", 1856);//if (entity == null) {//	"it is null"//} else {//	"i found it"//}	//won't work for all.	//var recent = ds.RecentItem.all().orderBy("sortOrder desc");	//var recent = ds.RecentItem.query("ID > 0 order by sortOrder desc"); //desc	//recent	//	var myRecentArray = recent.toArray("dataClassName, entityKey"); //.remove();//	myRecentArray	//	var accounts = ds.Account.all();//	accounts.remove();//	var contacts = ds.Contact.all();//	contacts.remove();	//	var users = ds.User.all();//	users //.remove();}//	oneItem = ds.RecentItem.find("ID = :1", 1329);//	oneItem//leads.forEach(function(oneLead) {//	oneLead.converted = false;//	oneLead.save();//});//latestRecentItem = ds.RecentItem.find("sortOrder = :1", 1);//latestRecentItem//var duplicateRecentItem = ds.RecentItem.find("entityKey = :1 && sortOrder != :2", latestRecentItem.entityKey, 1); //duplicateRecentItem//	//	var xiang = new ds.User({//		email: "xiang@wakanda.org", //		password: "x1angx1ang", //		fullName: "Xiang Lui" //	});//	xiang.save();//		//	var sdavis = new ds.User({//		email: "sammy@wakanda.org", //		password: "davis", //		fullName: "Sammy Davis" //	});//	sdavis.save();		//	var oneGuy = ds.User.find("fullName = :1", "Sammy Davis");//	oneGuy.password = "davis";//	oneGuy.save();//	oneGuy//	var users = ds.User.all();//	users	//currentUser().name//currentUser().ID//"8E61DF250E5A48B68CBE798E962EF5DF"//"8E61DF250E5A48B68CBE798E962EF5DF"//var oneGuy = ds.User.find("ID = :1", "8E61DF250E5A48B68CBE798E962EF5DF");//oneGuy//var oneGuy = ds.User.find("login = :1", "jbishop");//oneGuy//	//	var oneGuy = ds.User.find("ID = :1", currentUser().ID);//	oneGuy				//.remove(); 	//.orderBy("sortOrder") //.remove(); //.orderBy("sortOrder") //.remove();			//	var dmartin = new ds.User({//		login: "dmartin", //		password: "martin", //		fullName: "Dean Martin" //	});//	dmartin.save();//	//	var jbishop = new ds.User({//		login: "jbishop", //		password: "bishop", //		fullName: "Joey Bishop" //	});//	jbishop.save();		//	var dean = ds.User("612E08A1A4694A238896FECB22769C7C");//	dean.password = "martin";//	dean.save();/*var oneLead = new ds.Lead({	firstName: "David",	lastName: "Robbins",	title: "GM",	phone: "433-0987"});oneLead.save();*//*	var dmartin = new ds.User({		email: "dmartin@martin.com", 		password: "martin", 		fullName: "Dean Martin" 	});	dmartin.save();		var jbishop = new ds.User({		email: "jbishop@bishop.com", 		password: "bishop", 		fullName: "Joey Bishop" 	});	jbishop.save();*//*var passwordRegexStr = /^(?=.*\d)[a-zA-Z\d]{7,}$/;///^[a-zA-Z0-9]{7,10}$/; //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$var isValid = passwordRegexStr.test("ddtttttt9");var message = "";if (!isValid) { message = "invalid";} else {	message = "valid";}message*/				//CommonJS //var talk = require('daveModule').sayHi;//talk()	