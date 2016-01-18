var app = angular.module('dataflowApp', ["googlechart"]);

app.controller('dashboardController', function ($scope, $http) {
    function Record(unitId, kilometersTravelled) {
        this.unitId = unitId;
        this.kilometersTravelled = kilometersTravelled;
    }
    function GraphItem(label, value) {
        this.label = label;
        this.value = value;
    }

    function DateToTimestamp(date) {
        return date.getTime() / 1000;
    }

    $scope.beginTime = new Date(1426032000 * 1000); // "2015-3-11T00:00:00"
    $scope.endTime = new Date(1426118399 * 1000); // "2015-3-11T23:59:59"

    $scope.hideLoadingMaintenance = false;
    $scope.maintenanceItemsLoaded = 0;
    $scope.maintenance = [];

    $scope.chartObject = {};

    $scope.chartObject.type = "BarChart";

    $scope.chartObject.data = {
        "cols": [
            { id: "uid", label: "UnitId", type: "string" },
            { id: "t", label: "Kilometers travelled", type: "number" }
        ], "rows": []
    };

    $scope.chartObject.options = {
        title: 'Kilometers travelled per unit',
        hAxis: {
            title: 'Kilometers',
            minValue: 0
        },
        vAxis: {
            title: 'Unit Id'
        }
    };

    $scope.loadMaitenance = function () {
        $scope.hideLoadingMaintenance = false;
        $scope.maintenanceItemsLoaded = 0;  

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
                $scope.maintenance[i] = new Record(response.data.result[i], -1);
            }
        }).then(function () {
            var i = 0;
            for (recordItem in $scope.maintenance) {
                $http.get("http://145.24.222.160/DataflowAnalyseService/api/maintenance/" + $scope.maintenance[recordItem].unitId + "/" + DateToTimestamp($scope.beginTime) + "/" + DateToTimestamp($scope.endTime)).then(function (response) {
                    $scope.maintenance[i].kilometersTravelled = response.data.result["kilometersTravelled"];
                    $scope.chartObject.data["rows"][i] = { c: [{ v: response.data.result["unitId"] }, { v: response.data.result["kilometersTravelled"] }] };
                    i++;
                    $scope.maintenanceItemsLoaded = i;
                }).then(function () {
                    if (i >= $scope.maintenance.length)
                        $scope.hideLoadingMaintenance = true;
                })
            }
        });
    }
    $scope.loadMaitenance();
});