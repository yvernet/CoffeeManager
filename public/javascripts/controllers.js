/**
 * Created by Yann on 13/03/2015.
 */

'use strict';

/* Controllers */

var cmControllers = angular.module('cmControllers', []);

cmControllers.controller('userListCtrl', ['$scope', '$window', 'User',
    function($scope, $window, User) {

        // Datas
        $scope.userList = User.query();
        $scope.drinks = ["Café", "Décaféiné", "Thé"];

        $scope.isOrdering = false;
        $scope.nbUserSelected = 0;

        $scope.clickUser = function(user){
            if(user.isChecked){
                $scope.unSelectUser(user);
            } else{
                $scope.selectUser(user);
            }
        };

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

cmControllers.controller('loginCtrl', ['$scope', 'AuthentService',
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
                .then(function (token) {
                    // On success
                    console.log('Login controller success : ' + token);
                    $scope.setUserToken(token);
                }, function(){
                    // On failure
                    console.log('Login controller failure');
                    $scope.setUserToken('');
                });
        }
    }
]);

cmControllers.controller('ApplicationController', ['$scope', 'AuthentService',
    function ($scope, AuthentService) {

        //////////
        // Data //
        //////////

        // variable for global error messages
        $scope.errorMessage = '';

        // variable for userToken
        $scope.userToken = '';

        ///////////////
        // Functions //
        ///////////////

        // Link to the isAuthenticated function from the AuthentService
        $scope.isAuthenticated = AuthentService.isAuthenticated;


        // Setter for errorMessage
        $scope.setErrorMessage = function (message) {
            $scope.errorMessage = message;
        }

        // Setter for userToken
        $scope.setUserToken = function (token) {
            $scope.userToken = token;
        }

    }
]);
