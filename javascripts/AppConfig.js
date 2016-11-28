"use strict";
let isAuth = (AuthFactory) =>{
	new Promise( (resolve, reject)=>{
		if (AuthFactory.isAuthenticated()){
			resolve();
		} else {
			reject();
		}
	});
};

app.run( ($rootScope, $location, AuthFactory, FIREBASE_CONFIG)=>{
	firebase.initializeApp(FIREBASE_CONFIG);
	console.log("running");
	$rootScope.$on('$routeChangeStart',
	function(event, currRoute, prevRoute){
		let logged = AuthFactory.isAuthenticated();
		let appTo;
		if(currRoute.originalPath){
			appTo = currRoute.originalPath.indexOf('/auth') !== -1;
		}
		if(!appTo && !logged){
			event.preventDefault();
			$location.path('/auth');
		}
	});

});
app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.when('/auth', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.when('/contacts/list', {
			templateUrl: 'partials/contact-list.html',
			controller: 'ContactListCtrl',
			resolve: {isAuth}
		})
		.when('/contacts/new', {
			templateUrl: 'partials/contact-new.html',
			controller: 'ContactNewCtrl',
			resolve: {isAuth}
		})
		.when('/contacts/view/:id', {
			templateUrl: 'partials/contact-view.html',
			controller: 'ContactViewCtrl',
			resolve: {isAuth}
		})
		.when('/contacts/edit/:id', {
			templateUrl: 'partials/contact-new.html',
			controller: 'ContactEditCtrl',
			resolve: {isAuth}
		})
		.when('/logout', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.otherwise('/auth');
});