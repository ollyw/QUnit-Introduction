(function() {
    "use strict";

    module("Stubbed functions");

    function stubbedFunction(returnValue) {
        var func = function() {
            func.args = arguments;
            func.called = true;
            func.callCount += 1;
            return returnValue;
        };

        func.called = false;
        func.callCount = 0;
        func.args = [];
        return func;
    }

    test("a stubbed function allows the return value to be inspected", function() {
        var returnValue,
            testObject = {
                testMethod: stubbedFunction("test return value")
            };

        returnValue = testObject.testMethod();
        strictEqual(returnValue, "test return value");
    });

    test("a stubbed function allows inspection of parameters passed in", function() {
        var fn = stubbedFunction();

        fn("1", 2);
        strictEqual(fn.args[0], "1");
        strictEqual(fn.args[1], 2);
    });

    test("a stubbed function records how many times it is called", function() {
        var fn = stubbedFunction();

        strictEqual(fn.callCount, 0);
        strictEqual(fn.called, false);

        fn();
        strictEqual(fn.callCount, 1);
        strictEqual(fn.called, true);

        fn();
        strictEqual(fn.callCount, 2);
        strictEqual(fn.called, true);
    });

}());