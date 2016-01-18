var app = angular.module('BuyData', []);
app.controller('SelectController', function ($scope, $http) {
    $scope.dataSelect = null;
    $scope.dataTypeSelect = null;

    //current day
    $scope.dateFrom = new Date();
    //current day + 1 day
    $scope.dateTo = new Date($scope.dateFrom.getTime() + 86400000);

    $scope.stepCount = 0;

    $scope.update = function () {
        console.log($scope.dateFrom);
        var guideSteps = angular.element(document.querySelector('#guideSteps'));

        switch ($scope.stepCount) {
            case 0:
                guideSteps.append('<p id="0">2. Select the data type of the file.</p>');
                break;
            case 1:
                $scope.fillExample();
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
    };

    $scope.previous = function () {
        if ($scope.stepCount > 0) {
            $scope.stepCount--;
            var paragraph = document.getElementById($scope.stepCount);
            paragraph.remove();
            //TODO: check on last step
        }

    };

    $scope.buy = function () {
        var textContent = null;
        var filename = "default.txt";
        var beginDate = $scope.dateFrom.getFullYear() + "-" + ($scope.dateFrom.getMonth() + 1) + "-" + $scope.dateFrom.getDate();
        var endDate = $scope.dateTo.getFullYear() + "-" + ($scope.dateTo.getMonth() + 1) + "-" + $scope.dateTo.getDate();

        var filename = 'data.txt';

        $.ajax({
            url: "http://145.24.222.160/DataFlowWebservice/api/" + $scope.dataSelect + "/" + beginDate + "/" + endDate,
            dataType: 'text',
            success: function (data) {
                var x2js = new X2JS();
                switch ($scope.dataTypeSelect) {
                    case 'JSON':
                        textContent = data;
                        filename = 'data.json';
                        break;
                    case 'XML':
                        textContent = x2js.json2xml_str($.parseJSON(data));
                        filename = 'data.xml';
                        break;
                    case 'CSV':
                        break;

                }
                writeToFile(textContent, filename);

            }
        });
    };


    //http://145.24.222.160/DataFlowWebservice/api/positions/
    $scope.fillExample = function () {
        var jsonExample =
               '{\n'
             + '\"_id\": \"564b38b02968ea0d10ae869b\",\n'
             + '\"unitId\": 357566000058106,\n'
             + '\"dateTime\": \"2015-03-09T23:00:02Z\",\n'
             + '\"rdX\": 158126.109,\n'
             + '\"rdY\": 380446.031,\n'
             + ' \"latitudeGps\": 51.4131355,\n'
             + ' \"longitudeGps\": 5.43213844,\n'
             + ' \"speed\": 0,\n'
             + ' \"course\": 31,\n'
             + ' \"numSatellite\": 7,\n'
             + ' \"hdop\": 1,\n'
             + ' \"dopType\": \"Gps\"\n'
             + '}';

        var xmlExample =
             '<?xml version="1.0" encoding="UTF-8" ?>\n'
           + '<_id>564b38b02968ea0d10ae869b</_id>\n'
           + '<unitId>357566000058106</unitId>\n'
           + '<dateTime>2015-03-09T23:00:02Z</dateTime>\n'
           + '<rdX>158126.109</rdX>\n'
           + '<rdY>380446.031</rdY>\n'
           + '<latitudeGps>51.4131355</latitudeGps>\n'
           + '<longitudeGps>5.43213844</longitudeGps>\n'
           + '<speed>0</speed>\n'
           + '<course>31</course>\n'
           + '<numSatellite>7</numSatellite>\n'
           + '<hdop>1</hdop>\n'
           + '<dopType>Gps</dopType>';

        var csvExample =
            '_id,unitId,dateTime,rdX,rdY,latitudeGps,longitudeGps,speed,course,numSatellite,hdop,dopType\n' +
            '564b38b02968ea0d10ae869b,357566000058106,2015-03-09T23:00:02Z,158126.109,380446.031,51.4131355,5.43213844,0,31,7,1,Gps'

        switch ($scope.dataTypeSelect) {
            case "JSON":
                $scope.code = jsonExample;
                break;
            case "XML":
                $scope.code = xmlExample;
                break;
            case "CSV":
                $scope.code = csvExample;
                break;
        }

    }

}

);

writeToFile = function (text, filename) {
    var textFile = null;
    var data = new Blob([text], {
        type: 'text/plain'
    });
    //If we are replacing a previously generated file we need to
    //manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }


    textFile = window.URL.createObjectURL(data);
    var downloadLink = document.getElementById('downloadLink');
    downloadLink.download = filename;
    downloadLink.href = textFile;
    downloadLink.style.display = 'block';

}