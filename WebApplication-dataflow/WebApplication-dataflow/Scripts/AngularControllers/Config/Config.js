var app = angular.module('dataflowApp', ["googlechart"]);
var gertApp = angular.module('gertApp', ["nvd3"]);

var config = {
    analysisWebserviceIp: "145.24.222.160",
    webserviceIp: "145.24.222.160",
    maintenanceThreshold: 1000,
    unitInformationSatelliteThreshold: 4,
    unitInformationHDOPThreshold: 5,
    unitDiskSpaceUsedThreshold: 80
}
