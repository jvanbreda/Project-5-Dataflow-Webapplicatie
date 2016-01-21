//var app = angular.module('dataflowApp', []);

app.controller('AlertController', function ($scope, $http) {
    $scope.maintenanceWarnings = "Loading ...";
    $scope.unitInformationWarnings = "Loading ...";
    $scope.unitDiskSpaceWarnings = "Loading ...";
    $scope.averageConnectionTime = "Loading ...";

    var date = new Date();
    $scope.timeString = (date.getHours()) + ":" + (date.getMinutes());
    $scope.dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    $http.get("http://" + config.analysisWebserviceIp + "/DataflowAnalyseservice/api/maintenance/alert/" + config.maintenanceThreshold).then(function (response) {
        $scope.maintenanceWarnings = response.data.result.length;
    })

    $http.get("http://" + config.analysisWebserviceIp + "/DataflowAnalyseservice/api/unitinformation/alert/" + config.unitInformationSatelliteThreshold + "/" + config.unitInformationHDOPThreshold).then(function (response) {
        $scope.unitInformationWarnings = response.data.result.length;
    })

    $http.get("http://" + config.analysisWebserviceIp + "/DataflowAnalyseservice/api/unitdiskspace/alert/" + config.unitDiskSpaceUsedThreshold).then(function (response) {
        $scope.unitDiskSpaceWarnings = response.data.result.length;
    })

    $http.get("http://" + config.analysisWebserviceIp + "/DataflowAnalyseService/api/connection").then(function (response) {
        var total = 0.0;
        for (var i = 0; i < response.data.result.length; i++) {
            total += response.data.result[i].connectionSpeed;
        }
        $scope.averageConnectionTime = total / response.data.result.length;
    });
});