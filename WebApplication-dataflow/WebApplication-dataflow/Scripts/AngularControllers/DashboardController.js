var app = angular.module('dataflowApp', ["googlechart"]);

app.controller('dashboardController', function ($scope, $http) {
    function record(unitId, kilometersTravelled) {
        this.unitId = unitId;
        this.kilometersTravelled = kilometersTravelled;
    }
    function graphItem(label, value) {
        this.label = label;
        this.value = value;
    }

    $scope.beginTimestamp = 1426032000;
    $scope.endTimestamp = 1426118399;

    $scope.hideLoadingMaintenance = false;
    $scope.maintenance = [];

    $scope.chartObject = {};

    $scope.chartObject.type = "BarChart";

    $scope.chartObject.data = {
        "cols": [
            { id: "uid", label: "UnitId", type: "string" },
            { id: "t", label: "Travelled", type: "number" }
        ], "rows": []
    };

    $scope.chartObject.options = {
        'title': 'Kilometers travelled per unit'
    };

    $scope.loadMaitenance = function () {
        $scope.hideLoadingMaintenance = false;

        // Reset
        $scope.maintenance = [];
        $scope.chartObject.data = {
            "cols": [
                { id: "uid", label: "UnitId", type: "string" },
                { id: "t", label: "Travelled", type: "number" }
            ], "rows": []
        };

        $http.get("http://145.24.222.160/DataflowWebservice/api/id").then(function (response) {
            for (var i = 0; i < response.data.result.length; i++) {
                $scope.maintenance[i] = new record(response.data.result[i], -1);
            }
        }).then(function () {
            var i = 0;
            for (recordItem in $scope.maintenance) {
                $http.get("http://145.24.222.160/DataflowAnalyseService/api/maintenance/" + $scope.maintenance[recordItem].unitId + "/" + $scope.beginTimestamp + "/" + $scope.endTimestamp).then(function (response) {
                    $scope.maintenance[i].kilometersTravelled = response.data.result["kilometersTravelled"];
                    $scope.chartObject.data["rows"][i] = { c: [{ v: response.data.result["unitId"] }, { v: response.data.result["kilometersTravelled"] }] };
                    i++;
                }).then(function () {
                    if (i >= $scope.maintenance.length)
                        $scope.hideLoadingMaintenance = true;
                })
            }
        });
    }
    $scope.loadMaitenance();
});