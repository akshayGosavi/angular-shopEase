
angular.module("shopEase", [])
    .controller("easyShoppeCtrl",['$scope', '$http',
        function($scope, $http){
            $scope.routeNodes = "empty";

            $http({method: "GET", url: "http://localhost:8090/shopEase-Middleware/rest/factory/routeNode"}).
                then(function(response) {
                    $scope.routeNodes = response.data;
                }, function(response) {
                    $scope.routeNodes = response.status;
                });
        }
    ]);