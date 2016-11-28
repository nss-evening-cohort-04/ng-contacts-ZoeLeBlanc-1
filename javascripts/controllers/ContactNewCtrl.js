"use strict";

app.controller("ContactNewCtrl", function($scope, $rootScope, $location, ContactFactory){
	$scope.newContact = {};
	$scope.addNewContact = ()=>{
		$scope.newContact.isContacted = false;
		$scope.newContact.uid = $rootScope.user.uid;
		$scope.newContact.dateLastContacted = new Date();
		$scope.newContact.contactIntervalUnit = "days"; 
		ContactFactory.postNewContact($scope.newContact).then( (contactId)=>{
			$location.url("/contacts/list");
			$scope.newContact = {};
		});
	};
});