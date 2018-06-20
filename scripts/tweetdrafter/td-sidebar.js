// Sidebar controller


app.controller("sidebar", function($scope, $mdSidenav, $rootScope) {
	
	// Close on swipe left
	$scope.sidebarSwipeLeft = function() { 
		$mdSidenav('left').toggle();
	}


	$mdSidenav('left', true).then(function(instance) {
		instance.onClose(function() {
			$rootScope.dismissable = false;
		});
	});
});