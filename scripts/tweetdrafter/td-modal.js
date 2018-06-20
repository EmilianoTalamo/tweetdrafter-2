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
		var link = "https://twitter.com/home?status=" + tweets[$rootScope.selectedTweetIndex];
		window.open(link, "_blank");
	}

	// Delete button
	$scope.btnDelete = function() {
		var element = $rootScope.selectedTweet;
		$(element).addClass("deletedTweet");
		tweets.splice($rootScope.selectedTweetIndex, 1);
		saveOnStorage();
		$ocModal.close();
		setTimeout(function() {
			$route.reload();
		}, 600);
	}

	// Copy success
	$scope.copySuccess = function(e) {
		e.clearSelection();
		showToast("Tweet copied successfully!", 3000);
	};
});