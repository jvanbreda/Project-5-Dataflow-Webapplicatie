var diskSpaceApp = angular.module("diskSpace2App", ['nvd3']);

diskSpaceApp.service('HTTPService', function ($http) {
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


