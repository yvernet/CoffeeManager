/**
 * Created by Yann on 17/03/2015.
 */

/* Services */

var cmServices = angular.module('cmServices', ['ngResource']);

cmServices.factory('User', ['$resource',
    function($resource){
        return $resource('/api/users/:userId', {userId:'@id'}, {
            update : {method : 'PUT'}
        });
    }]);

cmServices.factory('AuthentService', ['$http', 'UserInfo',
    function($http, UserInfo){
        var authentService = {};

        authentService.login = function (login, password) {
            return $http.post('/api/login', {login : login, password : password})
                .then(function (res) {
                    // On success
                    console.log('Success : ' + res.data.name);
                    // We keep track in the AuthentService of the returned token
                    UserInfo.create(res.data.token);
                    // We return user informations
                    return res.data;
                }, function (err) {
                    // On failure
                    console.log('Error : ' + err.data.message);
                    UserInfo.destroy();
                    throw err;
                });

        }

        authentService.logout = function () {
            UserInfo.destroy();
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