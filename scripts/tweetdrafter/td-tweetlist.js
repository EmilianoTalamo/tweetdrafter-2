// Tweet list controller


app.controller("viewList", function($scope, $rootScope, $location, $ocModal) {

	// When this view is loaded, it will clear all tweets that are empty
	clearEmptyTweets();

	// Retrieve items from ls
	$scope.ls = JSON.parse(localStorage.getItem("tweets"));

	// Modal trigger
	$scope.heldTweet = function(index, event) {
		$rootScope.selectedTweet = event.target;
		$rootScope.selectedTweetIndex = index;
		$ocModal.open({
			url : '/templates/modalmenu.html',
			cls : 'fade-in'
		});
	};

	// Edit tweet trigger
	$scope.tapTweet = function(index) {
		$location.path('/input/edit/' + index);
	}
});