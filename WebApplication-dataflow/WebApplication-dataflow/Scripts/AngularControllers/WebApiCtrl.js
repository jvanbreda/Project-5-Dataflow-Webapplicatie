var app = angular.module('WebApiApp', []);

app.controller('WebApiCtrl', function ($http) {
    var vm = this;
    vm.Title = "WebApi";
    vm.DiskSpace = function () {
        $http.get("http://145.24.222.160/DataFlowWebservice/api/unitDiskSpace").success(function (data) {
            vm.myData = data;
        })
    }
});