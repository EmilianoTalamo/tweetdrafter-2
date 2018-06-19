// Navbar controller


app.controller("navBar", function($scope, $rootScope, $location, $route, $routeParams, $mdSidenav, $window) {

	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		if(next.$$route === undefined)
			$rootScope.currentPath = '/';
		else
			$rootScope.currentPath = next.$$route.originalPath;
	});

	// Back button
	$scope.backBtn = function() {
		$window.history.back();
	}

	// Delete button
	$scope.deleteCurrent = function() {
		navigator.vibrate(10);
		if($routeParams.context == 'new')
			tweets.pop();
		else
			tweets.splice($routeParams.id, 1);
		saveOnStorage();
		$window.history.back();
	}


	// Open sidebar button
	$scope.toggleLeft = function() {
		$location.url('/list#sidenav');
		$rootScope.dismissable = true;
		$mdSidenav('left').toggle();
	}
});