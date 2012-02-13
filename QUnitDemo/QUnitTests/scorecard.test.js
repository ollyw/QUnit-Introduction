﻿/// <reference path="/Scripts/jquery-1.7.1.js" />
/// <reference path="/Scripts/Application/Scorecard.js"/>
/// <reference path="/Scripts/jquerymx-3.2.custom.js"/>
/// <reference path="/Scripts/qunit.js" />

(function () {
    "use strict";

    QUnit.config.testTimeout = 4000;

    module("Scorecard Logic");

    test("The scorecard must throw an exception if non-numeric characters are entered", 1, function () {
        raises(function () {
            // Arrange
            var input = "invalid input",
                scorecard = new Scorecard();

            scorecard.enter(input);
        }, /Only numeric values can be entered/);
    });

    asyncTest("Calling calculate submits score to server", function () {
        expect(1);
        var scorecard = new Scorecard(),
            newScore = 1;

        $.fixture("/Scores/Submit", function (orig, settings, headers) {
            debugger;
            strictEqual(orig.data, newScore);
            start();
        });

        scorecard.record(newScore);
    });
} ());