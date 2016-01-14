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

diskSpaceApp.service('HTTPService2', function ($http) {
    var getData = function () {
        return $http.get("http://localhost:22328/api/UnitDiskSpace/")
        //return $http.get("http://145.24.222.160/DataFlowAnalyseService/api/UnitDiskSpace/")
        .then(function (response) {
            return response.data.result;
        })
        .catch(function (response) {
            alert("HTTP request failed:" + response.status);
        })
    }
    return { getData: getData };
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

        var status = "";
        var setUnitDiskSpaceData = function (response) {
            console.log("starting iterating!!");
            for (var key in response) {
                
                var obj = response[key];
                
                for (var prop in obj) {
                    
                    
                    if (prop == "diskSpaceStatus") {
                        status = obj[prop];
                    }else {
                            switch (status) {
                                case "Full":
                                    amountFull = obj[prop];
                                    break;
                                case "Empty":
                                    amountEmpty = obj[prop];
                                    break;
                                case "Half full":
                                    amountHalfFull = obj[prop];
                                    break;
                                case "Allmost full":
                                    amountAllmostFull = obj[prop]
                                    break;
                                
                            }
                        }
                        console.log("prop:"+prop + " " + "obj[prop]:"+obj[prop] + " " + "status:"+status);
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
diskSpaceApp.controller("diskSpace2Controller", ['$scope', 'HTTPService2', '$log', function ($scope, HTTPService, $log) {
    var dataPromise = HTTPService.getData();
    dataPromise.then(function (response) {
        $scope.init = response.data;
        $log.info(response);


        

        $scope.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 65
                },
                x: function(d){ return d[0]; },
                y: function(d){ return d[1]; },

                color: d3.scale.category10().range(),
                duration: 300,
                useInteractiveGuideline: true,
                clipVoronoi: false,

                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        return d3.time.format('%m/%d/%y')(new Date(d))
                    },
                    showMaxMin: false,
                    staggerLabels: true
                },

                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    },
                    axisLabelDistance: 0
                }
            }
        };

        $scope.data = [
            {
                key: "Long",
                values: [[0,10],[1,20], [2,30], [3,40], [4,90]]
                //,
                //mean: 250
            },
            {
                key: "Short",
                values: [[0,30],[1,50],[2,80],[3,50],[4,70]]
                //,
                //mean: -60
            },
            {
                key: "Gross",
                //mean: 125,
                values: [[0,05],[1,20], [2,30], [3,70], [4,30]]
            },
            {
                key: "S&P 1500",
                values: [[0,30],[1,80], [2,70], [3,60], [4,40]]
            }
        ];
    })
}]);



