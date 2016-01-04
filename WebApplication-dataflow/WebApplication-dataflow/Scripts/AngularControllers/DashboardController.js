var app = angular.module('dataflowApp', []);

app.controller('dashboardController', function ($scope, $http) {
    $scope.readyMaintenance = false;

    // Should go in config file
    $http.get("http://145.24.222.160/DataflowAnalyseservice/api/maintenance").then(function (response) { $scope.maintenance = response.data.result; }).then(function () { $scope.readyMaintenance = true; });
});