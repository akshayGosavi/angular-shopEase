angular.module("shopEase")
    .controller("easyShoppeCtrl",['$scope', 'easyData',
        function($scope, easyData){
            easyData.getRouteNodes().then(
                function(response){
                    $scope.routeNodes = response;
                },
                function(response){
                    console.log("something weird happened");
                }
            );

            easyData.getShops().then(
                function(response){
                    $scope.shopNodes = response;
                },
                function(response){
                    console.log("something weird happened");
                }
            );

        }
    ]);