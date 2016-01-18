/// <reference path="..\Scripts\HelloWorld.js" />
describe("Hello World", function () {
    it("says hello", function () {
        expect(helloWorld()).toEqual("Hello world");
    });
});