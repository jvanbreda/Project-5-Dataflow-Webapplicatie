//var app = angular.module('dataflowApp', []);

app.controller('AlertController', function ($scope, $http) {
    // Alert threshold
    var maintenanceThreshold = 1000;

    $scope.maintenanceWarnings = "Loading ...";

    $http.get("http://" + config.analysisWebserviceIp + "/DataflowAnalyseservice/api/maintenance/alert/" + maintenanceThreshold).then(function (response) {
        $scope.maintenanceWarnings = response.data.result.length;
    })
});