"use strict";

app.controller("ContactCtrl", function($scope, ContactFactory){
	$scope.newContact = {};
	$scope.showContactView=true;
	$scope.contacts = [];
	ContactFactory.getContactList().then( (fbContacts)=>{
		$scope.contacts = fbContacts;
	});
	let getContacts = function(){
		ContactFactory.getContactList().then( (fbContacts)=>{
			$scope.contacts = fbContacts;
		});
	}
	getContacts();
	$scope.newContact = function() {
		$scope.showContactView = false;
		
	};
	$scope.allContacts = function() {
		$scope.showContactView = true;
	};
	$scope.addNewContact = function(){
		$scope.newContact.isContacted = false;
		ContactFactory.postNewContact($scope.newContact).then( (contactId)=>{
			getContacts();
			$scope.newContact = {};
			$scope.showContactView = true;
		});
	};
});