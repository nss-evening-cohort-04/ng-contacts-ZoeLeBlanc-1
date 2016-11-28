"use strict";
app.controller("AuthCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory){
	$scope.loginContainer = true;
	$scope.registerContainer = false;
	if($location.path()=== "/logout"){
		AuthFactory.logout();
		$rootScope.user = {};
		$location.url("/");
	}
	let registerNewGoogleUser = {};
	let logMeIn = (loginStuff)=>{
		AuthFactory.authenticate(loginStuff).then( (loginResponse)=>{
			console.log("loginResponse", loginResponse);
			return UserFactory.getUser(loginResponse.uid);
		}).then( (userCreds)=>{
			console.log("userCreds", userCreds);
			$rootScope.user = userCreds;
			$scope.login = {};
			$scope.register = {};
			$location.url('/items/list');
		});
	};
	let logGoogleIn = (loginStuff)=>{
		UserFactory.getUser(loginStuff.uid).then( (userCreds)=>{
			console.log("userCreds", userCreds);
			$rootScope.user = userCreds;
			$scope.login = {};
			$scope.register = {};
			$location.url('/items/list');
		});
	};
	$scope.setLoginContainer = function(){
		$scope.loginContainer = true;
		$scope.registerContainer = false;
	};
	$scope.setRegisterContainer = function(){
		$scope.loginContainer = false;
		$scope.registerContainer = true;
	};
	$scope.registerUser = function(registerNewUser){
		console.log("registerNewUser", registerNewUser);
		AuthFactory.registerWithEmail(registerNewUser).then( (registerResponse)=>{
			console.log("registerResponse", registerResponse);
			registerNewUser.uid = registerResponse.uid;
			return UserFactory.addUser(registerNewUser);
		}).then( (registerComplete)=>{
			logMeIn(registerNewUser);
		});
	};
	$scope.registerGoogleUser = function(){
		AuthFactory.authenticateGoogle().then( (registerGoogleResponse)=>{
			console.log("registerGoogleResponse", registerGoogleResponse);
			let registerNewGoogleUser = registerGoogleResponse;
			registerNewGoogleUser.username = registerGoogleResponse.displayName;
			 return AuthFactory.getUser(registerNewGoogleUser);
			// logGoogleIn(registerNewGoogleUser);
		}).then( (registerGoogleComplete)=>{
			console.log("registerGoogleComplete", registerGoogleComplete);
			logGoogleIn(registerGoogleComplete);
		});
	};
	$scope.loginUser = function(loginNewUser){
		logMeIn(loginNewUser);
	};
	$scope.loginGoogleUser = function(){
		AuthFactory.authenticateGoogle().then( (loginGoogleResponse)=>{
			console.log("loginGoogleResponse", loginGoogleResponse);
			let loginGoogleUser = loginGoogleResponse;
			loginGoogleUser.username = loginGoogleResponse.displayName;
			console.log("loginGoogleUser", loginGoogleUser);
			logGoogleIn(loginGoogleUser);
		});
	};
});