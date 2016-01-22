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
        return $http.get("http://localhost:22328/api/UnitDiskSpace/1")
        //return $http.get("http://145.24.222.160/DataFlowAnalyseService/api/UnitDiskSpace/1")
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
diskSpaceApp.controller("diskSpace2Controller", ['$scope', 'HTTPService2', 'HTTPService', '$log', function ($scope, HTTPService ,HTTPService2, $log) {
    var dataPromise = HTTPService.getData();
    dataPromise.then(function (response) {
        $log.info(response);

        var idObject = [];
        var idRangeObjects = [];
        var allObjects = [];
        var lastId;
        var counter = 0;

        var getObjectsFromResponse = function () {
            for (var key in response) {
                var obj = response[key];
                if (obj["unitId"] != lastId) {
                    lastId = obj["unitId"];
                    if(idRangeObjects.length > 0){
                        //add array to allObjects and empty idRangeObjects
                        var idRange = idRangeObjects;
                        allObjects.push(idRange);
                        idRangeObjects = [];
                        counter = 0;
                    }                                        
                }
                var graphObject = [counter, obj];
                idRangeObjects.push(graphObject);
                counter++;
            }
            $log.info(allObjects);
        }
        var putObjectsInGraph = function () {
            var graphValues = [];
            var unitId = "";

            for (var key in allObjects) {
                var obj = allObjects[key]; 
                for (var i in obj) {
                    var obj2 = obj[i];//obj = [counter, object]
                    var graphItem = obj2[1];
                    graphValues.push([obj2[0], graphItem["percentUsed"]]);
                    unitId = graphItem["unitId"];
                }
                var graphObject = {
                    key: "",
                    values: []
                }
                graphObject.key = unitId;
                graphObject.values = graphValues;
                $scope.data.push(graphObject);

                graphValues = [];
                unitId = "";
            }
            
            
        }
        
        getObjectsFromResponse();
        
        var xAxisCounter = 0;
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
                y: function(d){ return d[1] / 100; },

                color: d3.scale.category10().range(),
                duration: 300,
                useInteractiveGuideline: true,
                clipVoronoi: false,

                xAxis: {                    
                    axisLabel: '',                   
                    tickFormat: function (d) {
                            return "";
                    },
                    showMaxMin: true,
                    staggerLabels: true
                },

                yAxis: {
                    axisLabel: 'Diskspace percent used',
                    tickFormat: function(d){
                        return d3.format('%')(d);
                    },
                    axisLabelDistance: 0
                }
            }
        };

        $scope.data = [];

        putObjectsInGraph();
    })
}]);



