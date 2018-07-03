// Modal menu controller


app.controller("modalMenu", function($scope, $rootScope, $ocModal, $route, $location) {

	$location.url('/list#modal');
	$rootScope.dismissable = true;
	// Get selected tweet
	$scope.tweetContent = tweets[$rootScope.selectedTweetIndex];
	$scope.clipboardContent = $scope.tweetContent;

	// vibration
	navigator.vibrate(30);

	// Tweet button
	$scope.btnTweet = function() { 
		$ocModal.close();
		window.open(encodeURI("http://twitter.com/home?status=" + tweets[$rootScope.selectedTweetIndex]), "_blank");
	}

	// Delete button
	$scope.btnDelete = function() {
		$('body').css('pointer-events', 'none');
		var element = $rootScope.selectedTweet;
		$(element).addClass("deletedTweet");
		tweets.splice($rootScope.selectedTweetIndex, 1);
		saveOnStorage();
		$ocModal.close();
		setTimeout(function() {
			$route.reload();
			$('body').css('pointer-events', 'all');
		}, 600);
	}

	// Copy success
	$scope.copySuccess = function(e) {
		e.clearSelection();
		showToast("Tweet copied successfully!", 3000);
	};
});
