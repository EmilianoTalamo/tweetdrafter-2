// Navbar controller


app.controller("navBar", function($scope, $rootScope, $location, $route, $routeParams, $mdSidenav) {
	
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		$rootScope.currentPath = next.$$route.originalPath;
	});

	// Back button
	$scope.backBtn = function() {
		$location.path("/list");
	}

	// Delete button
	$scope.deleteCurrent = function() {
		navigator.vibrate(10);
		if($routeParams.context == 'new')
			tweets.pop();
		else
			tweets.splice($routeParams.id, 1);
		saveOnStorage();
		$location.path('/list');
	}


	// Open sidebar button
	$scope.toggleLeft = function() {
		$mdSidenav('left').toggle();
	}
});