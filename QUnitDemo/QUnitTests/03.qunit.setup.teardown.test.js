(function() {
    "use strict";

    module("Setup and teardown with test variables",
        {
            setup: function() {
                this.temporaryVariable = this.temporaryVariable++ || 1;
            }
        }
    );

    test("setup can insert values into closure - part I", function() {
        strictEqual(this.temporaryVariable, 1);
    });

    test("setup can insert values into closure - part II", function() {
        strictEqual(this.temporaryVariable, 1);
    });

    module("Setup and teardown to mock global functionality",
        {
            setup: function() {
                var self = this;
                window.close = function() {
                    self.closeCalled = true;
                };
            },
            teardown: function() {
                // Restore the default behaviour - beware of IE, which throws an exception
                delete window.close;
            }
        }
    );

    test("Assert that window.close is called", function() {
        window.close();
        strictEqual(this.closeCalled, true);
    });

}());