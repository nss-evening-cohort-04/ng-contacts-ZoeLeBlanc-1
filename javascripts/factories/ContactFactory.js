"use strict";
app.factory("ContactFactory", function($q, $http, FIREBASE_CONFIG){
	var getContactList = function(){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/contacts.json`)
			 .success( (response)=>{
			 	let contacts = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		contacts.push(response[key]);
			 	})
			 	resolve(contacts);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 })
		})
	};
	var postNewContact = function(newContact){
		return $q((resolve,reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`, JSON.stringify({
				name: newContact.name,
				relationship: newContact.relationship,
				email: newContact.email,
				facebook: newContact.facebook,
				isContacted: newContact.isContacted,
				dateLastContact: newContact.dateLastContact
			 })
			)
			 .success( (postResponse)=>{
			 	resolve(postResponse);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 })
		})
	}
	return {getContactList:getContactList, addNewContact:addNewContact}
});