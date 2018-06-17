// Sidebar controller


app.controller("sidebar", function($scope, $mdSidenav) {

	// Close on swipe left
	$scope.sidebarSwipeLeft = function() { 
		$mdSidenav('left').toggle();
	}
});