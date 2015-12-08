var app = angular.module('BuyData', []);

 app.controller('SelectController', function ($scope, $http) {
     $scope.dataSelect = null;

     //current day
     $scope.dateFrom = new Date();
     //current day + 1 day
     $scope.dateTo = new Date($scope.dateFrom.getTime() + 86400000);

     $scope.stepCount = 0;

     $scope.update = function () {
         var guideSteps = angular.element(document.querySelector('#guideSteps'));

         switch ($scope.stepCount) {
             case 0:
                 guideSteps.append('<p id="0">2. Select the data type of the file.</p>');
                 break;
             case 1:
                 guideSteps.append('<p id="1">3. Select the start date of your data.</p>');
                 break;
             case 2:
                 guideSteps.append('<p id="2">4. Select the end date of your data.</p>');
                 break;
             case 3:
                 if ($scope.dateTo < $scope.dateFrom) {
                     alert("The end date must be larger or equal to the start date!");
                     return;
                 }
                 break;

         }
         $scope.stepCount++;
         $scope.fillExample();
     };

     $scope.previous = function () {
         if($scope.stepCount > 0){
             $scope.stepCount--;
             var paragraph = document.getElementById($scope.stepCount);
             paragraph.remove();
             //TODO: check on last step
         }
         
     };

     $scope.buy = function () {
        
     };

     $scope.fillExample = function () {
         $http.get("http://145.24.222.160/DataFlowWebservice/api/" + $scope.dataSelect)
         .then(function (response) {

                 var fromJson = angular.fromJson(response.data.result);
                 fromJson.json = response.data.result;
                 $scope.code = fromJson;

             
         })
         .catch(function (response) {
             alert("HTTP Request failed: " + response.data.status);
         })
     }

 }

 );
