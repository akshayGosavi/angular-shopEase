angular.module('shopEase')
    .service("easyData",['$http', '$q', function($http, $q){

        var routeNode_url = 'http://localhost:8090/shopEase-Middleware/rest/factory/routeNode';
        var shopNode_url = 'http://localhost:8090/shopEase-Middleware/rest/factory/shopNode';

        var getRouteNodeList = function(){
            var deferred = $q.defer();
            var success = function(response){
                deferred.resolve(response.data);
            };
            var failure = function(){
                deferred.reject('NO DATA FOUND');
            };
            $http({method: 'GET', url: routeNode_url}).then(success,failure);

            return deferred.promise;
        };

        var getShopNodeList = function(){
            var deferred = $q.defer();
            var success = function(response){
                deferred.resolve(response.data);
            };
            var failure = function(){
                deferred.reject('NO DATA FOUND');
            };
            $http({method: 'GET', url: shopNode_url}).then(success,failure);

            return deferred.promise;
        };

        return {
            getRouteNodes : getRouteNodeList,
            getShops : getShopNodeList
        }

    }]);
