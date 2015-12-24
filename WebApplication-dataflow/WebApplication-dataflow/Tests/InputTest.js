/// <reference path="F:\Github\Project-5-Dataflow-Webapplicatie\WebApplication-dataflow\WebApplication-dataflow\Scripts/angular.min.js" />
/// <reference path="F:\Github\Project-5-Dataflow-Webapplicatie\WebApplication-dataflow\WebApplication-dataflow\Scripts/angular-mocks.js" />
/// <reference path="F:\Github\Project-5-Dataflow-Webapplicatie\WebApplication-dataflow\WebApplication-dataflow\Scripts/buydata.js" />

describe('BuyData', function () {

    beforeEach(module('BuyData'));

    describe('BuyDataController', function () {
        var scope, controller;

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();

            controller = $controller('BuyDataController', {
                $scope: scope
            });

        }));

        it('should have 3 different file types', function () {
            var filetype = scope.dataTypeSelect;
            var types = ['XML', 'JSON', 'CSV'];
            expect(types).toContain(filetype);

        });

    });
});