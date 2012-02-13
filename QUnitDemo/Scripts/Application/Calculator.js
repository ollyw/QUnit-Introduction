function Calculator() {
    "use strict";
    
    function enter() {
        throw "Only numeric values can be entered";
    }

    return {
        enter: enter
    };
}