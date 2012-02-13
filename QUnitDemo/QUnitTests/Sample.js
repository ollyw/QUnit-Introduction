/// use an xml comment tag to reference javascript file under test
/// <reference path="/Scripts/MicrosoftAjax.js" />
/// <reference path="/Scripts/Application/Calculator.js"/>

(function () {
    "use strict";
    module("Calculator");

    test("The calculator must throw an exception if non-numeric characters are entered", 1, function () {
        QUnit.raises(function() {
            // Arrange
            var input = "invalid input",
                calculator = new Calculator();

            calculator.enter(input);
        }, /Only numeric values can be entered/);
    });
} ());