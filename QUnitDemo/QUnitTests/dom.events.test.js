(function() {
    "use strict";

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

    /* ignore
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
    */

    module("Using JQuery to emulate events", {
        setup: function () {
            $("#qunit-fixture").html('<form id="widgetForm"><button id="widgetButton" type="reset"></button><form>');
        },
        teardown: function () {
            $("#qunit-fixture").empty();
        }
    });
    
    test("When the submit button is pressed, the default action is suppressed", function() {

        function TestView() {
            $("#widgetButton").on("click", function(event) {
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

}());