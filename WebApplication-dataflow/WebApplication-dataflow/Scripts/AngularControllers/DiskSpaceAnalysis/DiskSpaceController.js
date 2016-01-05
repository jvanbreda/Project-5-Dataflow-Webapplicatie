var diskSpaceApp = angular.module("diskSpaceApp", []);

diskSpaceApp.service('HTTPService', function ($http) {
    var getData = function () {
        return $http.get("http://145.24.222.160/DataFlowAnalyseWebService/api/UnitDiskSpace")
        .then(function (response) {
            return response.data.result;
        })
        .catch(function (response) {
            alert("HTTP request failed:" + response.status);
        })
    }
});


diskSpaceApp.controller("diskSpaceController", ['$scope','HTTPService',function ($scope, HTTPService) {
    var dataPromise = HTTPSerivce.getData();
    dataPromise.then(function (response) {
        $scope.init = function () {

        }
    })
}]);
