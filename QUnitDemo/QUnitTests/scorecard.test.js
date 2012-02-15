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

} ());