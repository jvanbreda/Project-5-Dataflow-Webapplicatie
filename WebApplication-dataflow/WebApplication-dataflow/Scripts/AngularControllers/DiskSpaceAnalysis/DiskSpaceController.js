var diskSpaceApp = angular.module("diskSpaceApp", ['nvd3']);

diskSpaceApp.service('HTTPService', function ($http) {
    var getData = function () {
        return $http.get("http://145.24.222.160/DataFlowAnalyseService/api/UnitDiskSpace")
        .then(function (response) {
            return response.data.result;
        })
        .catch(function (response) {
            alert("HTTP request failed:" + response.status);
        })
    }
    return {getData: getData};
});


diskSpaceApp.controller("diskSpaceController", ['$scope','HTTPService',function ($scope, HTTPService) {
    var dataPromise = HTTPService.getData();
    dataPromise.then(function (response) {
        $scope.init = response;

        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.data = [
            {
                key: "One",
                y: 5
            },
            {
                key: "Two",
                y: 2
            },
            {
                key: "Three",
                y: 9
            },
            {
                key: "Four",
                y: 7
            },
            {
                key: "Five",
                y: 4
            },
            {
                key: "Six",
                y: 3
            },
            {
                key: "Seven",
                y: .5
            }
        ];
    })
}]);


