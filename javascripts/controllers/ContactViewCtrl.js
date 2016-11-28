"use strict";
app.controller("ContactViewCtrl", function($scope, $routeParams, ContactFactory){
	$scope.selectedContact = {};
	let contactId = $routeParams.id;
	ContactFactory.getSingleContact(contactId).then( (oneContact)=>{
		oneContact.id = contactId;
		$scope.selectedContact = oneContact;
	});
});