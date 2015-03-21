/**
 * Created by Yann on 17/03/2015.
 */

/* Services */

var cmServices = angular.module('cmServices', ['ngResource']);

cmServices.factory('User', ['$resource',
    function($resource){
        return $resource('http://localhost:3000/api/users/:userId', {userId:'@id'}, {
        });
    }]);
