"use strict";
app.controller("ContactEditCtrl", function($scope, $routeParams, $location, ContactFactory){
	let contactId = $routeParams.id;
	$scope.newContact = {};
	ContactFactory.getSingleContact(contactId).then( (oneContact)=>{
		oneContact.id = contactId;
		$scope.newContact = oneContact;
	});
	$scope.addNewContact = ()=>{
		ContactFactory.editContact($scope.newContact).then( (response)=>{
			$scope.newContact = {};
			$location.url("/contacts/list");
		});
	};
});