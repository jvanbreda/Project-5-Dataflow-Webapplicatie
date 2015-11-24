var PositionInfoController = angular.module('PositionsApp', []);

PositionInfoController.service('HTTPController', function ($http) {
    var getData = function () {
        return $http.get("http://145.24.222.160/DataFlowWebservice/api/events")
         .then(function (response) {
             return response.data.result;
         })
         .catch(function (response) {
             alert("HTTP Request failed: " + response.status);
         })
    };
    return { getData: getData };
});

PositionInfoController.controller("DataAnalysisController", ['$scope', 'HTTPController', function ($scope, HTTPController) {
    var data = HTTPController.getData();
    data.then(function (response) {
        $scope.units = response;
        var unitarray = [];
        var nodupl = [];
        var unitcount = {};
        var total = nodupl.concat(unitcount);
        

        

        for (var i = 0; i < $scope.units.length; i++) {
            unitarray.push($scope.units[i].unitId);
        }

        for (var i = 0; i < unitarray.length; i++) {
            if (!unitcount[unitarray[i]])
                unitcount[unitarray[i]] = 0;
            ++unitcount[unitarray[i]];
        }

        nodupl = eliminateDuplicates(unitarray);
        $scope.ids = total;



        function eliminateDuplicates(array) {
            var i,
                length = array.length,
                out = [],
                obj = {};
            for (i = 0; i < length; i++) {
                obj[array[i]] = 0;
            }
            for (i in obj) {
                out.push(i);
            }
            return out;
        }
    }) 
}
])
