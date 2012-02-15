/// <reference path="/Scripts/jquery-1.7.1.js" />
/// <reference path="/Scripts/Application/Scorecard.js"/>
/// <reference path="/Scripts/jquerymx-3.2.custom.js"/>
/// <reference path="/Scripts/qunit.js" />

(function () {
    "use strict";

    module("Scorecard Logic");

    test("The scorecard must throw an exception if non-numeric characters are entered", 1, function () {
        raises(function () {
            // Arrange
            var input = "invalid input",
                scorecard = new Scorecard();

            scorecard.enter(input);
        }, /Only numeric values can be entered/);
    });

    /* ignore
    test("Scorecard namespace pollution test", function () {
    var scorecard = new Scorecard();

    scorecard.leakyMethod();
    });
    */

    test("ok is truthy", function () {
        var testObj = { testProperty: "test" };

        ok(true);
        ok(1);

        ok(testObj);
        ok(testObj.testProperty);
        // ok(testObj.nonExistentProperty);
        // Corollary - use more specific methods
    });

    module("QUnit behaviour");

    test("equal is coercive", function () {
        equal(1, "1", "Comparing different primative types works");
    });

    test("strictEqual is not coercive", function () {
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

    module("Stubbed functions");

    function stubbedFunction(returnValue) {
        var func = function () {
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

    test("a stubbed function allows the return value to be inspected", function () {
        var returnValue,
            testObject = {
                testMethod: stubbedFunction("test return value")
            };

        returnValue = testObject.testMethod();
        strictEqual(returnValue, "test return value");
    });

    test("a stubbed function allows inspection of parameters passed in", function () {
        var fn = stubbedFunction();

        fn("1", 2);
        strictEqual(fn.args[0], "1");
        strictEqual(fn.args[1], 2);
    });

    test("a stubbed function records how many times it is called", function () {
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

    module("Setup and teardown with test variables",
        {
            setup: function () {
                this.temporaryVariable = this.temporaryVariable++ || 1;
            }
        }
    );

    test("setup can insert values into closure - part I", function () {
        strictEqual(this.temporaryVariable, 1);
    });

    test("setup can insert values into closure - part II", function () {
        strictEqual(this.temporaryVariable, 1);
    });

    module("Setup and teardown to mock global functionality",
        {
            setup: function () {
                var self = this;
                window.close = function () {
                    self.closeCalled = true;
                };
            },
            teardown: function () {
                // Restore the default behaviour - beware of IE, which throws an exception
                delete window.close;
            }
        }
    );

    test("Assert that window.close is called", function () {
        window.close();
        strictEqual(this.closeCalled, true);
    });


    module("Asynchronous test support");
    QUnit.config.testTimeout = 4000;

    test("Check that normal tests fail with asynchronous behaviour", function () {

        var syncCalled = false,
            asyncCalled = false,
            testObject = {
                synchronousMethod: function () {
                    syncCalled = true;
                },
                asynchronousMethod: function () {
                    setTimeout(function () {
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

    test("Check that normal tests fail with asynchronous behaviour", function () {
        expect(1);

        var testObject = {
            asynchronousMethod: function () {
                setTimeout(function () {
                    ok(true);   // Can validate parameters
                    start();
                });
            }
        };

        testObject.asynchronousMethod();

        stop();  // Can also be implicit with asyncTest("description", numAssertions, function);

    });

    module("Ajax with fixtures");

    asyncTest("When calling record(), then the score is submitted to the server", function () {
        expect(1);
        var scorecard = new Scorecard(),
            newScore = 1;

        $.fixture("/Scores/Submit", function (orig, settings, headers) {
            strictEqual(orig.data, newScore);
            start();
        });

        scorecard.record(newScore);
    });

    asyncTest("Given the server will return a 403, when calling record() then 'forbidden' is returned", function () {
        expect(1);
        var scorecard = new Scorecard(),
            newScore = 1;

        $.fixture("/Scores/Submit", function () {
            return [403, "Unauthorized"];
        });

        scorecard.recordAsync(newScore)
            .fail(function (reason) {
                strictEqual(reason, "this user is forbidden");
                start();
            });
    });

    module("Using JQuery to emulate events", {
        setup: function () {
            $("#qunit-fixture").empty().append(
                $("<form>")
                    .attr("id", "widgetForm")
                    .append(
                        $("<button>")
                            .attr("id", "widgetButton")
                    )
            );
        },
        teardown: function () {
            $("#qunit-fixture").empty();
        }
    });

    // This uses a simple widget, with no separation of concerns - not best practise
    test("When the submit button is pressed, the form is hidden ", function () {
    function TestView() {
    $("#widgetButton").on("click", function (event) {
    // What's missing here!
    $("#widgetForm").hide();
    });
    return this;
    }

    var view = new TestView();
    $("#qunit-fixture button").trigger("click");
    strictEqual($("#qunit-fixture form:visible").length, 0);
    });

    test("When the submit button is pressed, the default action is suppressed", function () {
        function TestView() {
            $("#widgetButton").on("click", function (event) {
                event.preventDefault();
                $("#widgetForm").hide();
            });
            return this;
        }

        var view = new TestView(),
            e = new $.Event("click");

        $("#qunit-fixture button").trigger(e);
        strictEqual(e.isDefaultPrevented(), true);
    });

} ());