(function() {
    "use strict";

    module("Asynchronous test support");
    QUnit.config.testTimeout = 4000;

    test("Check that normal tests fail with asynchronous behaviour", function() {

        var syncCalled = false,
            asyncCalled = false,
            testObject = {
                synchronousMethod: function() {
                    syncCalled = true;
                },
                asynchronousMethod: function() {
                    setTimeout(function() {
                        asyncCalled = true;
                    });
                }
            };

        testObject.synchronousMethod();
        strictEqual(syncCalled, true);

        testObject.asynchronousMethod();
        strictEqual(asyncCalled, false);

        // after this method finishes executing, the timeout callback will be processed
        // Don't forget that JS is single threaded and effectively a message pump (excluding HTML5 features)

    });

    test("Check that QUnit.stop() allows asynchronous assertions", function() {
        expect(1);

        var testObject = {
            asynchronousMethod: function() {
                setTimeout(function() {
                    ok(true); // Can validate parameters
                    start();
                });
            }
        };

        testObject.asynchronousMethod();

        stop(); // Can also be implicit with asyncTest("description", numAssertions, function);

    });

}());