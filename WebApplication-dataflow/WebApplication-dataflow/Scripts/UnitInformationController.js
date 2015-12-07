var unitInfoApp = angular.module('UnitApp', []);

unitInfoApp.service('HTTPService', function ($http) {
    
    var getData = function () {
        return $http.get("http://145.24.222.160/DataFlowWebservice/api/positions")
            .then(function (response) {
                return response.data.result;
            })
            .catch(function(response){
                alert("HTTP request failed: " + response.status);
            })
        };
    return { getData: getData };
});

unitInfoApp.controller("AnalysedDataController", ['$scope', 'HTTPService', function ($scope, HTTPService) {
    var dataPromise = HTTPService.getData();
    dataPromise.then(function (response) {
        $scope.units = analyseResponse(response);
        var unitsCopy = $scope.units;
        $scope.checkUnitId = function (unit) {
            
            var detailedArray = []
            for (var i = 0; i < $scope.units.length; i++) {
                if ($scope.units[i]._id === unit._id) {
                    detailedArray.push($scope.units[i]);
                    break;
                }
            }
            $scope.units = [];
            $scope.details = detailedArray;
            
            google.setOnLoadCallback(drawGraphsAndMap(unit));
        }

        $scope.resetHTTP = function () {
            $scope.details = [];
            $scope.units = unitsCopy;
            document.getElementById('barChartDiv').style.visibility = 'hidden';
            document.getElementById('gaugeGraphDiv').style.visibility = 'hidden';
        }
    })    
}]);

function analyseResponse(responseArray) {
    var returnArray = [];
        for (var i = 0; i < responseArray.length; i++) {
            if (responseArray[i].numSatellite <= 3 || responseArray[i].hdop >= 4) {
                returnArray.push(responseArray[i]);
            }
        }
        return returnArray;   
}

function drawGraphsAndMap(unit) {
    
    var data1 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Number of Satellites', unit.numSatellite],
        ['HDOP', unit.hdop]
    ]);

    var options1 = {
        width: 400, height: 120
    };

    document.getElementById('barChartDiv').style.visibility = 'visible';
    var barChart = new google.visualization.BarChart(document.getElementById('barChartDiv'));
    barChart.draw(data1, options1);
    

    var data2 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Speed', unit.speed]
    ]);

    var options2 = {
        width: 400, height: 120,
        min: 0, max: 10
    };

    document.getElementById('gaugeGraphDiv').style.visibility = 'visible';
    var gauge = new google.visualization.Gauge(document.getElementById('gaugeGraphDiv'));
    gauge.draw(data2, options2);
    

}