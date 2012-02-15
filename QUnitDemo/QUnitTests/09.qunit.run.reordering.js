(function () {
    "use strict";

    // Can turn reordering on or off
    // QUnit.config.reorder = false;
    
    // Look at session storage to view/reset ordering

    module("QUnit failed unit test re-ordering");

    test("Do something which affects the global namespace", function () {
        window.log = function (msg) {
            console.log(msg); // console.log does not exist in all script hosts, so is a gotcha
            window.messages = window.messages || [];
            window.messages.push(msg);
        };

        log("test message");
        strictEqual(messages[0], "test message");
    });

    test("Use something that another test added to the global namespace", function () {
        log("test 1");
        log("test 2");

        //ok(false);    // Use this to trigger failure, or run the test individually
        ok(messages.length > 0);    // Using the GT operator is not specific enough if this were a real test
    });
} ());