/**
 * Created by Yann on 17/03/2015.
 */

/* Services */

var cmServices = angular.module('cmServices', ['ngResource']);

cmServices.factory('User', ['$resource',
    function($resource){
        return $resource('/api/users/:userId', {userId:'@id'}, {
        });
    }]);

cmServices.factory('AuthentService', ['$http', 'UserInfo',
    function($http, UserInfo){
        var authentService = {};

        authentService.login = function (login, password) {
            return $http.post('/api/login', {login : login, password : password})
                .then(function (res) {
                    // On success
                    console.log('Success : ' + res.data.token);
                    UserInfo.create(res.data.token);
                    return res.data.token;
                }, function (res) {
                    // On failure
                    console.log('Error : ' + res.data.message);
                    UserInfo.destroy();
                });

        }

        authentService.logout = function () {
            return null;
        }

        authentService.isAuthenticated = function () {
            return !!UserInfo.token;
        }

        return authentService;
    }
]);

cmServices.service('UserInfo', function () {

    this.create = function (token) {
        this.token = token;
    };

    this.destroy = function () {
        this.token = null;
    };
})