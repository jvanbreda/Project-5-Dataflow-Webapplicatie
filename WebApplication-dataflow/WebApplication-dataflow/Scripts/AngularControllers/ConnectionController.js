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
    $scope.totalAverageMinute = 0;
    $scope.chartObject = {};
    $scope.chartObject.type = "BarChart";
    $scope.chartObject.options = {
        title: 'Average connection speed per unit',
        hAxis: {
            title: 'Average connection speed (in seconds)',
            minValue: 0
        },
        vAxis: {
            title: 'Unit Id'
        },
        colors: ['orange']
    };

    $scope.loadGraph = function () {
        $scope.chartObject.data = {
            "cols": [
                { id: "uid", label: "UnitId", type: "string" },
                { id: "t", label: "Average connection speed", type: "number" }
            ], "rows": []
        };

        $http.get("http://145.24.222.160/DataflowAnalyseService/api/connection/").then(function (response) {
            for (var i = 0; i < response.data.result.length; i++) {
                $scope.connection[i] = new record(response.data.result[i].unitId, response.data.result[i].connectionSpeed);
                $scope.chartObject.data["rows"][i] = { c: [{ v: response.data.result[i].unitId }, { v: response.data.result[i].connectionSpeed }] };
            }
            $scope.calculateTotalAverage();
        });

    }

    $scope.calculateTotalAverage = function () {
        var totalAmount = 0;
        for (var i = 0; i < $scope.connection.length; i++){
            totalAmount += $scope.connection[i].connectionAverage;   
        }

        $scope.totalAverage = (totalAmount / $scope.connection.length);
        $scope.totalAverageMinute = Math.floor($scope.totalAverage / 60);

    }

    $scope.loadGraph();

});