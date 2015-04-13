'use strict';

/* App Module */

var coffeeManagerApp = angular.module('coffeeManagerApp', ['ngRoute', 'cmControllers', 'cmServices', 'ngMessages']);

coffeeManagerApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/public/views/userList.html',
                controller: 'UserListCtrl'
            }).
            when('/profile', {
                templateUrl: '/public/views/userProfile.html',
                controller: 'UserProfileCtrl',
                authorized: true
            }).
            otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }]);

// We watch everything page change in order to check if the user needs to be signed in
coffeeManagerApp.run(function($rootScope, $location, AuthentService) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        console.log('Route changed : ' + next.$$route.authorized + ' ' + !AuthentService.isAuthenticated());
        if (next.$$route.authorized  && !AuthentService.isAuthenticated()) {
            $location.url("/");
        }
    });
});