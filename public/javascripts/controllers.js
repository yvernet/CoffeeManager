/**
 * Created by Yann on 13/03/2015.
 */

'use strict';

/* Controllers */

var cmControllers = angular.module('cmControllers', []);

cmControllers.controller('userListCtrl', ['$scope', '$window', 'User',
    function($scope, $window, User) {
        /*
        $scope.userList = [
            {
                "name": "Yann",
                "favDrink": "Décafeïné"
            },
            {
                "name": "Florence",
                "favDrink": "Café"
            },
            {
                "name": "Thierry",
                "favDrink": "Thé"
            },
            {
                "name": "LeoGirl",
                "favDrink": "Café"
            }
        ];
*/

        // Datas
        $scope.userList = User.query();
        $scope.drinks = ["Café", "Décafeiné", "Thé"];



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

    }]);
