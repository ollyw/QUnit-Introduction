(function() {
    "use strict";

    module("Ajax with fixtures");

    asyncTest("When calling record(), then the score is submitted to the server", function() {
        expect(1);
        var scorecard = new Scorecard(),
            newScore = 1;

        $.fixture("/Scores/Submit", function(orig, settings, headers) {
            strictEqual(orig.data, newScore);
            start();
        });

        scorecard.record(newScore);
    });

    asyncTest("Given the server will return a 403, when calling record() then 'forbidden' is returned", function() {
        expect(1);
        var scorecard = new Scorecard(),
            newScore = 1;

        $.fixture("/Scores/Submit", function() {
            return [403, "Unauthorized"];
        });

        scorecard.recordAsync(newScore)
            .fail(function(reason) {
                strictEqual(reason, "this user is forbidden");
                start();
            });
    });

}());