//var unitInfoApp = angular.module('UnitApp', []);

app.service('HTTPService', function ($http) {
    
    var getData = function () {
        return $http.get("http://145.24.222.160/DataFlowAnalyseService/api/UnitInformation/")
            .then(function (response) {
                return response.data.result;
            })
            .catch(function(response){
                alert("HTTP request failed: " + response.status);
            })
        };
    return { getData: getData };
});

app.controller("AnalysedDataController", ['$scope', 'HTTPService', function ($scope, HTTPService) {
    var dataPromise = HTTPService.getData();
    dataPromise.then(function (response) {
        google.setOnLoadCallback(drawGraph(response));        
    })
}]);

function drawGraph(response) {    
    var data = new google.visualization.DataTable();
    data.addColumn("string", "unitId");
    data.addColumn("number", "Number of occurences");
    for (var i = 0; i < response.length; i++) {
        data.addRow([response[i].unitId.toString(), response[i].numOccurences]);
    }

    var barChart = new google.visualization.BarChart(document.getElementById('chartArea'));
    barChart.draw(data, {});
}