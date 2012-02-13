function Scorecard() {
    "use strict";
    
    function enter() {
        throw "Only numeric values can be entered";
    }

    function record(score) {
        $.ajax({
            url: "/Scores/Submit",
            type: "POST",
            data: score
        });
    }

    return {
        enter: enter,
        record: record
    };
}