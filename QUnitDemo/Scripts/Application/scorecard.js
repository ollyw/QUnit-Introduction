function Scorecard() {
    "use strict";

    function enter(digits) {
        if (typeof digits !== "number") {
            throw "Only numeric values can be entered";
        }
    }

    function leakyMethod() {
        // Can also just call 'foo = function () {};' if use strict is not supported/enabled
        window.foo = function() {};
    }
    
    function record(score) {
        $.ajax({
            url: "/Scores/Submit",
            type: "POST",
            data: score
        });
    }

    function recordAsync(score) {
        var deferred = new $.Deferred();

        $.ajax({
            url: "/Scores/Submit",
            type: "POST",
            data: score
        }).fail(function (jqXHR) {
            if (jqXHR.status === 403) {
                deferred.reject("this user is forbidden");
            }
        });

        return deferred.promise();
    }

    return {
        enter: enter,
        record: record,
        leakyMethod: leakyMethod,
        recordAsync: recordAsync
    };
}