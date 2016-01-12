var unitInfoApp = angular.module('UnitApp', []);

unitInfoApp.service('HTTPService', function ($http) {
    
    var getData = function () {
        return $http.get("http://145.24.222.160/DataFlowAnalyseService/api/UnitInformations")
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
        google.setOnLoadCallback(drawGraph(response));        
    })
}]);

function drawGraph(response) {
    
    var data = google.visualization.DataTable();

    for (var unit in response) {
        data.addColumn(unit.unitId, unit.numOccurences);
    }

    var barChart = new google.visualization.BarChart(document.getElementById('chartArea'));
    barChart.draw(data, {});
}