angular.module('BuyData', [])
 .controller('SelectController', ['$scope', function ($scope) {

     $scope.dataSelect = null;

     $scope.dateFrom = null;
     $scope.dateTo = null;

     $scope.stepCount = 0;

     $scope.update = function () {

         switch ($scope.stepCount) {
             case 0:
                 var guideSteps = angular.element(document.querySelector('#guideSteps'));
                 guideSteps.append("<p>2. Select the time range of your data.</p>");
                 break;

             case 1:
                 alert($scope.dateFrom);
         }
        $scope.stepCount++;
     };


 }]);
