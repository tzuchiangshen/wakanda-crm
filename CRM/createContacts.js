﻿if (loginByPassword("greg@wakanda.org", "greg1greg")) {		var greg = ds.User.find("email = :1", "greg@wakanda.org");	greg			/**/	var oneContact = new ds.Contact({		firstName: "Jeff", 		lastName: "Bent", 		phone: 555-5454,		city: "Los Angeles",		owner: greg	});	oneContact.save();		}