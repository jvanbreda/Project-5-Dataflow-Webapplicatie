app.controller('ConnectionController', function ($scope, $http) {
    function record(unitId, connectionAverage) {
        this.unitId = unitId;
        this.connectionAverage = connectionAverage;
    }
    function graphItem(label, value) {
        this.label = label;
        this.value = value;
    }

    $scope.connection = [];
    $scope.totalAverage = 0;

    $scope.chartObject = {};

    $scope.chartObject.type = "BarChart";

    $scope.chartObject.data = {
        "cols": [
            { id: "uid", label: "UnitId", type: "string" },
            { id: "t", label: "Average connection speed in seconds", type: "number" }
        ], "rows": []
    };

    $scope.chartObject.options = {
        'title': 'Average connection speed travelled per unit'
    };

    $scope.loadGraph = function () {
        $scope.chartObject.data = {
            "cols": [
                { id: "uid", label: "UnitId", type: "string" },
                { id: "t", label: "Average connection speed in seconds", type: "number" }
            ], "rows": []
        };

        $http.get("http://145.24.222.160/DataflowAnalyseService/api/connection/").then(function (response) {
            for (var i = 0; i < response.data.result.length; i++) {
                $scope.connection[i] = new record(response.data.result[i].unitId, response.data.result[i].connectionSpeed);
                $scope.chartObject.data["rows"][i] = { c: [{ v: response.data.result["unitId"] }, { v: response.data.result["connectionAverage"] }] };
            }

        });

    }

    $scope.calculateTotalAverage = function () {
        var totalAmount = 0;
        for (var i = 0; i < $scope.connection.length; i++){
            totalAmount += $scope.connection[i].connectionAverage;

            if(i == $scope.connection.length){
                $scope.totalAverage = (totalAmount / i);
            }
        
        }

    }
    $scope.loadGraph();
    $scope.calculateTotalAverage();
});