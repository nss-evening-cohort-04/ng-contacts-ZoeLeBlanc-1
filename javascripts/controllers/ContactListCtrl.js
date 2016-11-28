"use strict";

app.controller("ContactListCtrl", function($scope, $rootScope, $routeParams, ContactFactory){
	$scope.contacts = [];
	let getContacts = function(){
		ContactFactory.getContactList($rootScope.user.uid).then( (fbContacts)=>{
			$scope.contacts = fbContacts;
		});
	};
	getContacts();
	$scope.deleteContact = (contactId)=>{
		ContactFactory.deleteContact(contactId).then( (response)=>{
			getContacts();
		});
	};
	$scope.inputChange = (contact)=>{
		ContactFactory.editContact(contact).then( (response)=>{
			console.log("input change", contact);
		});
	};
});