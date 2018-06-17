const app = angular.module('tweetdrafter', [
	'ngRoute', 
	'ngAnimate', 
	'mobile-angular-ui',
	'ngMaterial', 
	'ngMessages', 
	'mn', 
	'oc.modal', 
	'ngclipboard'
])
.config(function($mdThemingProvider) { // UI config
	$mdThemingProvider.theme('default')
		.primaryPalette('blue', {
			'default' : '500',
		})
		.accentPalette('grey');
	$mdThemingProvider.enableBrowserColor({
		theme: 'default',
		palette: 'blue',
		hue: '500'
	});
});


// Global character limit
const charlimit = 280;


// If no localStorage is present, create a new instance
if(!localStorage.getItem("tweets"))
	localStorage.setItem("tweets", "[]");


// Retrieve items in localStorage
var tweets = JSON.parse(localStorage.getItem("tweets"));


// App routing
app.config(function($routeProvider) {
	// Home
	$routeProvider
	.when("/list", {
		templateUrl : "../templates/tweetlist.html",
		reloadOnSearch: false
	})
	// New tweet
	.when("/input/:context", {
		templateUrl : "../templates/inputpage.html",
		reloadOnSearch: false
	})
	// Edit tweet
	.when("/input/:context/:id", {
		templateUrl : "../templates/inputpage.html",
		reloadOnSearch: false
	})
	// Default failsafe
	.otherwise({
		redirectTo: '/list'
	});
});


// Save tweets on LocalStorage
const saveOnStorage = () => 
	localStorage.setItem("tweets", JSON.stringify(tweets));

// Delete a tweet if it's empty without leaving holes on the array
function clearEmptyTweets() {
	for(let i in tweets) {
		if(tweets[i].length == 0) {
			tweets.splice(i, 1);
			saveOnStorage();
			return false; // Fail-safe so it just deletes one item
		}
	}
}


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

	$scope.toggleLeft = function() {
		$mdSidenav('left').toggle();
	}
});


// Sidebar controller
app.controller("sidebar", function($scope, $mdSidenav) {
	$scope.sidebarSwipeLeft = function() { 
		$mdSidenav('left').toggle();
	}
});


// Tweet list controller
app.controller("viewList", function($scope, $rootScope, $location, $ocModal) {
	clearEmptyTweets();
	// Retrieve items from ls
	$scope.ls = JSON.parse(localStorage.getItem("tweets"));

	$scope.heldTweet = function(index, event) {
		$rootScope.selectedTweet = event.target;
		$rootScope.selectedTweetIndex = index;
		$ocModal.open({
			url : '/templates/modalmenu.html',
			cls : 'fade-in'
		});
	};

	$scope.tapTweet = function(index) {
		$location.path('/input/edit/' + index);
	}
});


// Modal menu controller
app.controller("modalMenu", function($scope, $rootScope, $ocModal, $route) {
	// Get selected tweet
	$scope.tweetContent = tweets[$rootScope.selectedTweetIndex];
	$scope.clipboardContent = $scope.tweetContent;

	navigator.vibrate(30); // vibration

	// Tweet button
	$scope.btnTweet = function() { 
		$ocModal.close();
		var link = "https://twitter.com/home?status=" + tweets[$rootScope.selectedTweetIndex];
		window.open(link);
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


// Input controller
app.controller("viewInput", function($scope, $routeParams, $location) {

	$('#inputContent').focus(); // Focus on textarea
	charcounter(); // Trigger char counter

	var context = $routeParams.context; // Get URL context
	var tweetIndex;

	switch(context) {
		// Add a new item
		case "new":
			tweets.push(); // Add new item on array
			tweetIndex = tweets.length; // Get last array Index
			tweets[tweetIndex] = ""; // Fill it with empty text
			saveOnStorage(); // Save the reserved space for the tweet
			break;
		// Edit an existing item
		case "edit":
			tweetIndex = $routeParams.id; // Get the tweet position
			$scope.inputContent = tweets[tweetIndex]; // Get tweet content
			charcounter(); // Calculate char count
			break;
	}

	// Input event that triggers on every keystroke
	$scope.inputChange = function() {
		charcounter(); // Update char counter on every keystroke
		let text = $scope.inputContent;
		tweets[tweetIndex] = text; // Update tweet array
		saveOnStorage();
	}

	// Char counter
	function charcounter() {
		if($scope.inputContent == undefined)
			chars = "280";
		else
			chars = charlimit - $scope.inputContent.length;
		$scope.charCount = chars;
		if(chars < 0)
			$scope.charclass = true;
		else
			$scope.charclass = false;
	}
});

function showToast(msg, time) {
	var toast = $('#toast');
	toast.html(msg);
	toast.css('opacity', '1');
	toast.css('bottom', '0');
	setTimeout(function() {
		toast.css('bottom', '-4.8rem');
	}, time);
	setTimeout(function() {
		toast.css('opacity', '0');
		toast.html('');
	}, time + time);
}