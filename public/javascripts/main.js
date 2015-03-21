'use strict';

/* App Module */

var coffeeManagerApp = angular.module('coffeeManagerApp', ['ngRoute', 'cmControllers', 'cmServices']);


coffeeManagerApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/public/views/userList.html',
                controller: 'userListCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);