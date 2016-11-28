"use strict";
app.controller("NavCtrl", function($scope, $location){
	$scope.navItems = [
	{
		name:"Logout",
		url:"#/logout"
	},
	{
		name:"All Contacts",
		url:"#/contacts/list"
	},
	{
		name:"New Contact",
		url:"#/contacts/new"
	}
	];
});