var diskSpaceApp = angular.module("diskSpaceApp", ['nvd3']);

diskSpaceApp.service('HTTPService', function ($http) {
    var getData = function () {
        return $http.get("http://localhost:22328/api/UnitDiskSpace/111/hoi")
        //return $http.get("http://145.24.222.160/DataFlowAnalyseService/api/UnitDiskSpace/111/status")
        .then(function (response) {
            return response.data.result;
        })
        .catch(function (response) {
            alert("HTTP request failed:" + response.status);
        })
    }
    return {getData: getData};
});


diskSpaceApp.controller("diskSpaceController", ['$scope','HTTPService', '$log',function ($scope, HTTPService, $log) {
    var dataPromise = HTTPService.getData();
    dataPromise.then(function (response) {
        $scope.init = response.data;
        $log.info(response);
        var amountFull = 5;
        var amountAllmostFull = 6;
        var amountHalfFull = 7;
        var amountEmpty = 8;

        var objects = [];

        var setUnitDiskSpaceData = function (response) {
            console.log("starting iterating!!");
            for (var key in response) {
                // skip loop if the property is from prototype
                if (!response.hasOwnProperty(key)) continue;
                console.log(response[key])
                var obj = response[key];
                var unitDiskSpaceItem = {
                    diskSpacediskSpaceStatus: "",
                    statusAmount: ""
                }
                for (var prop in obj) {
                    // skip loop if the property is from prototype
                    if (!obj.hasOwnProperty(prop)) continue;

                    // your code
                    console.log(prop + " = " + obj[prop]);
                    
                }
            }       
            
        }

        setUnitDiskSpaceData(response);
        

        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.data = [
            {
                key: "Empty",
                y: amountEmpty
            },
            {
                key: "Half full",
                y: amountHalfFull
            },
            {
                key: "Allmost full",
                y: amountAllmostFull
            },
            {
                key: "Full",
                y: amountFull
            }
        ];
    })
}]);


