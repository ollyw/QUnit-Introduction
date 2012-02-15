(function() {
    "use strict";

    module("QUnit behaviour");

    test("ok is truthy", function() {
        var testObj = { testProperty: "test" };

        ok(true);
        ok(1);

        ok(testObj);
        ok(testObj.testProperty);
        // ok(testObj.nonExistentProperty);
        // Corollary - use more specific methods
    });

    test("equal is coercive", function() {
        equal(1, "1", "Comparing different primative types works");
    });

    test("strictEqual is not coercive", function() {
        strictEqual(1, 1);
        strictEqual(true, true);
        //strictEqual(1, "1");
        // Corollary - strictEqual is more suitable than equal and ok.
    });

    /* ignore
    test("strictEqual cannot compare objects", function () {
    strictEqual(
    { property1: "value1" },
    { property1: "value1" });
    // Corollary - use strictEqual for primatives, not for objects
    });
    */

    /* ignore
    test("deepEqual can compare objects", function () {
    deepEqual(
    { property1: "value1" },
    { property1: "value1" });

    deepEqual(
    { property1: "value1" },
    { property1: "value2" });
    });
    */

}());