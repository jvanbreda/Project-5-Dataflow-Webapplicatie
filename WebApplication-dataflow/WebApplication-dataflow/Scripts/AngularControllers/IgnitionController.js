var app = angular.module('Ignition', ["googlechart"]);
app.controller('SelectController', function ($scope, $http) {
    $scope.startDate = new Date();
    $scope.endDate = new Date();

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
        'title': 'Ignition count per unit'
    };

    $scope.loadGraph = function (startDate, endDate) {
        $scope.chartObject.data = {
            "cols": [
                { id: "uid", label: "UnitId", type: "string" },
                { id: "t", label: "Ignition count", type: "number" }
            ], "rows": []
        };

        $http.get("http://localhost:22328/api/Ignition" + "/" + startDate + "/" + endDate).then(function (response) {
            for (var i = 0; i < response.data.result.length; i++) {
                console.log(response.data.result[i]);
                $scope.chartObject.data["rows"][i] = { c: [{ v: response.data.result[i]["unitId"] }, { v: response.data.result[i]["ignitionCount"] }] };
            }
        })
}
});