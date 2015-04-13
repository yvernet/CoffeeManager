/**
 * Created by Yann on 13/03/2015.
 */

'use strict';

/* Controllers */

var cmControllers = angular.module('cmControllers', []);

cmControllers.controller('UserListCtrl', ['$scope', '$window', 'User',
    function($scope, $window, User) {

        //////////
        // Data //
        //////////
        $scope.userList = User.query();

        $scope.isOrdering = false;
        $scope.nbUserSelected = 0;

        $scope.clickUser = function(user){
            if(user.isChecked){
                $scope.unSelectUser(user);
            } else{
                $scope.selectUser(user);
            }
        };

        ///////////////
        // Functions //
        ///////////////
        $scope.selectUser = function(user){
            $scope.nbUserSelected += 1;
            user.isChecked = true;
        };

        $scope.unSelectUser = function(user){
            $scope.nbUserSelected -= 1;
            user.isChecked = false;
        };

        $scope.modifyPrefDrinks = function(user){
            $scope.currentUser = user;
            $('#modalboxPrefDrinks').modal();
        };

        $scope.computeOrder = function(){
            var result = {};
            var drinkName;
            $scope.userList.forEach(function(user){
               if(user.isChecked){
                   drinkName = user.favDrink;
                   result[drinkName] = (drinkName in result) ? result[drinkName] + 1 : 1;
               }
            });
            $scope.order = result;

            $('#modalboxOrder').modal();
        };

        $scope.resetOrder = function(){
            $scope.order = null;
            $scope.userList.forEach(function(user){
                user.isChecked = false;
            });
            $scope.nbUserSelected = 0;
        };

        $scope.addGuest = function(){
            $scope.currentUser = new User();
            $('#modalboxAddGuest').modal();
        };

        $scope.addGuestToList = function (user) {
            user.isGuest = true;
            $scope.userList.push(user);
        };

    }
]);

cmControllers.controller('LoginCtrl', ['$scope', 'AuthentService',
    function($scope, AuthentService){

        //////////
        // Data //
        //////////

        $scope.userLogin = 'Yann';
        $scope.userPassword = 'test';

        ///////////////
        // Functions //
        ///////////////

        // Function to sign the user in
        $scope.signin = function (login, password) {
            console.log('Login in the controller with : ' + login + ' ' + password);
            AuthentService.login(login, password)
                .then(function (userInfo) {
                    // On success
                    console.log('Login controller success for : ' + userInfo.name);
                    $scope.setUserInfo(userInfo);
                }, function(){
                    // On failure
                    console.log('Login controller failure');
                    $scope.setUserInfo(null);
                    $scope.error = {message : 'Erreur de login ou de password'};
                });
        }

        $scope.signout = function () {
            console.log('Signing out');

            // ask the AuthentService to log out
            AuthentService.logout();

            // reset the current logged user
            $scope.setUserInfo(null);

            // clean any possible error
            $scope.error = null;
        }
    }
]);

cmControllers.controller('ApplicationController', ['$scope', 'AuthentService',
    function ($scope, AuthentService) {

        //////////
        // Data //
        //////////

        // variable for global error messages
        $scope.error = {message : null};

        // variable for userToken
        $scope.userInfo = null;

        // FIXME A mettre en constant angular
        // List of available drinks
        $scope.DRINKS = ["Café", "Décaféiné", "Thé"];

        ///////////////
        // Functions //
        ///////////////

        // Link to the isAuthenticated function from the AuthentService
        $scope.isAuthenticated = AuthentService.isAuthenticated;


        // Setter for errorMessage
        $scope.setErrorMessage = function (message) {
            $scope.error.message = message;
        }

        // Setter for userToken
        $scope.setUserInfo = function (user) {
            $scope.userInfo = user;
        }

    }
]);

cmControllers.controller('UserProfileCtrl', ['$scope', '$location', 'User',
    function ($scope, $location, User) {

        //////////
        // Data //
        //////////
        // Hard copy of the userInfo Object to avoid unwanted modifications
        $scope.currentUserInfo = angular.copy($scope.userInfo);


        ///////////////
        // Functions //
        ///////////////

        $scope.modifyUserProfile = function(){
            console.log($scope.currentUserInfo);

            // save the user on backend side
            User.update($scope.currentUserInfo);

            // update userInfo in the main controller
            $scope.setUserInfo($scope.currentUserInfo);

            // go back to user list
            $location.path('/');
        };

        $scope.cancelModifyUserProfile = function () {
            // go back to user list
            $location.path('/');
        }

    }
]);


