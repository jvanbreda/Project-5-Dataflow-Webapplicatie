var PositionInfoController = angular.module('PositionsApp', []);

PositionInfoController.controller('PositionController', function ($scope, $http) {
    $http.get("http://145.24.222.160/DataFlowWebservice/api/positions/357566000058106")
    .then(function (response) {
        $scope.names = response.data.result;
    })
    .catch(function (response) {
        alert("HTTP Request failed: " + response.data.status);
    })
})