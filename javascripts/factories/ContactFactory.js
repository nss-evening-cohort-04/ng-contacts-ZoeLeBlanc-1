"use strict";
app.factory("ContactFactory", function($q, $http, FIREBASE_CONFIG){
	//Firebase: get all contacts
	var getContactList = function(){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/contacts.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let contacts = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		contacts.push(response[key]);
			 	});
			 	resolve(contacts);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	//Firebase: send a new contact to database
	var postNewContact = function(newContact){
		return $q((resolve,reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`, JSON.stringify({
				firstName: newContact.firstName,
				lastName: newContact.lastName,
				relationship: newContact.relationship,
				email: newContact.email,
				facebook: newContact.facebook,
				isContacted: newContact.isContacted,
				dateLastContact: newContact.dateLastContact,
				contactIntervalNumber: newContact.contactIntervalNumber,
				contactIntervalUnit: newContact.contactIntervalUnit,
				timesContacted: newContact.timesContacted,
				datesContacted: newContact.datesContacted,
				preferredContactMethod: newContact.preferredContactMethod,
				uid: newContact.uid
			 })
			)
			 .success( (postResponse)=>{
			 	resolve(postResponse);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	var deleteContact = function(contactId){
		return $q((resolve,reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`)
			.success( (deleteResponse)=>{
				resolve(deleteResponse);
			})
			.error((deleteResponse)=>{
				reject(deleteResponse);
			});
		});
	};
	var getSingleContact = function(contactId){
		return $q( (resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`)
			.success( (getSingleContactResponse)=>{
				resolve(getSingleContactResponse);
			})
			.error((getSingleContactError)=>{
				reject(getSingleContactError);
			});
		});
	};
	var editContact = (editContact)=>{
		return $q((resolve, reject)=>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/contacts/${editContact.id}.json`, 
				JSON.stringify({
					firstName: editContact.firstName,
					lastName: editContact.lastName,
					relationship: editContact.relationship,
					email: editContact.email,
					facebook: editContact.facebook,
					isContacted: editContact.isContacted,
					dateLastContact: editContact.dateLastContact,
					contactIntervalNumber: newContact.contactIntervalNumber,
					contactIntervalUnit: newContact.contactIntervalUnit,
					timesContacted: editContact.timesContacted,
					datesContacted: editContact.datesContacted,
					preferredContactMethod: editContact.preferredContactMethod,
					uid: newContact.uid
				})
			)
			.success( (editContactResponse)=>{
				resolve(editContactResponse);
			})
			.error( (editContactError)=>{
				reject(editContactError);
			});
		});
	};
	return {getContactList:getContactList, postNewContact:postNewContact, deleteContact:deleteContact, getSingleContact:getSingleContact, editContact:editContact};
});