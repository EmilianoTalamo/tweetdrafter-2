// App routing
app.config(function($routeProvider) {
	$routeProvider
	// Home
	.when("/list", {
		templateUrl : "./templates/tweetlist.html",
		reloadOnSearch: false
	})
	// New tweet
	.when("/input/:context", {
		templateUrl : "./templates/inputpage.html",
		reloadOnSearch: false
	})
	// Edit tweet
	.when("/input/:context/:id", {
		templateUrl : "./templates/inputpage.html",
		reloadOnSearch: false
	})
	// Default failsafe
	.otherwise({
		redirectTo: '/list'
	});
});