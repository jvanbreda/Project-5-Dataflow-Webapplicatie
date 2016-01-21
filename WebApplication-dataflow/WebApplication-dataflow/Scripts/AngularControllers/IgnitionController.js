//var app = angular.module('Ignition', ["googlechart"]);
app.controller('IgnitionController', function ($scope, $http) {
    $scope.startDate = new Date("March 12, 2015 00:00:00");
    $scope.endDate = new Date("March 14, 2015 00:00:00");

    $scope.select = function () {
        var startDate = $scope.startDate.getFullYear() + "-" + ($scope.startDate.getMonth() + 1) + "-" + $scope.startDate.getDate();
        var endDate = $scope.endDate.getFullYear() + "-" + ($scope.endDate.getMonth() + 1) + "-" + $scope.endDate.getDate();
        $scope.loadGraph(startDate, endDate);
    }

    $scope.ignition = [];

    $scope.chartObject = {};

    $scope.chartObject.type = "BarChart";

    $scope.chartObject.data = {
        "cols": [
            { id: "uid", label: "UnitId", type: "string" },
            { id: "t", label: "Ignition count", type: "number" }
        ], "rows": []
    };

    $scope.chartObject.options = {
        title: 'Ignition count per unit',
        hAxis: {
            title: 'Ignition count',
            minValue: 0
        },
        vAxis: {
            title: 'Unit Id'
        }
    };

    $scope.loadGraph = function (startDate, endDate) {
        $scope.chartObject.data = {
            "cols": [
                { id: "uid", label: "UnitId", type: "string" },
                { id: "t", label: "Ignition count", type: "number" }
            ], "rows": []
        };

        $http.get("http://145.24.222.160/DataFlowAnalyseService/api/Ignition" + "/" + startDate + "/" + endDate).then(function (response) {
            for (var i = 0; i < response.data.result.length; i++) {
                $scope.chartObject.data["rows"][i] = { c: [{ v: response.data.result[i]["unitId"] }, { v: response.data.result[i]["ignitionCount"] }] };
            }
        })
    }

    $scope.select();
});