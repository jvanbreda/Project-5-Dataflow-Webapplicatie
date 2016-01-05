(function () {
    'use strict';

    var diskSpaceService = angular.module('diskSpaceFactory', ['ngResource']);
    diskSpaceService.factory('diskSpace', ['$resource',
        function ($resource) {
            return $resource('http://145.24.222.160/DataFlowAnalyseWebService/api/UnitDiskSpace', {}, {
                query: { method: 'GET', params: {}, isArray: true }
            });
        }
    ]);
})();