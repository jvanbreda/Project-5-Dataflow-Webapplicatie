var app = angular.module('datflowApp', []);
app.controller('dashboardController', function ($scope, $http) {
    $http.get("http://www.w3schools.com/angular/customers.php")
    .success(function (response) { $scope.names = response.records; });
});