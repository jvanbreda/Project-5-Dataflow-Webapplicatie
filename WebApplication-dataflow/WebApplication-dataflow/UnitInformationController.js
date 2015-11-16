var unitInfoController = angular.module('UnitApp', []);

unitInfoController.controller('UnitInformationController', function ($scope, $http) {
    $http.get("http://145.24.222.160/DataFlowWebservice/api/positions/357566000058106")
    .then(function (response) {
        $scope.units = response.data.result;
    })
    .catch(function (response) {
        alert("HTTP request failed: " + response.status + "\n" + response.statusText);
    });
});