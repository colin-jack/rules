var assert = require('chai').assert;
var validatorTestUtil = require('./../testUtil');
var dateValidator = rulesLib.require('dateValidator');

describe('date validator', function() {
    describe("When value 'frank' is used", function() {
        assertFailsForExpectedReason("frank");
    });

    describe("When value '2001, 10, 105' is used", function() {
        assertFailsForExpectedReason("2001, 10, 105");
    });

     describe("When value '2001, 105, 10' is used", function() {
        assertFailsForExpectedReason("2001, 105, 10");
    });

    describe("When value false is used", function() {
        assertFailsForExpectedReason(false);
    });

    describe("When true false is used", function() {
        assertFailsForExpectedReason(false);
    });

    describe("When unsuitable array is used", function() {
        assertFailsForExpectedReason([2001, 10, 100]);
    });

    // NOTE - could support this but seems pointless
    describe("When 5 is used", function() {
        assertFailsForExpectedReason(5);
    });

    describe("When value true is used", function() {
        assertFailsForExpectedReason(true);
    });

    describe("When invalid date object is used", function() {
        it("should pass validation", function() {
            assertFailsForExpectedReason(new Date("bob"));
        });
    });

    describe("When NaN is used", function() {
        validatorTestUtil.assertNaNFailsForExpectedReason(dateValidator, "not_a_date");
    });

    function assertFailsForExpectedReason(value) {
        var runValidatorWrapper = function() {
            var underTest = dateValidator.create();
            return underTest(value);
        }

        validatorTestUtil.validateAndAssertExpectedFail(value, runValidatorWrapper, "The value must be a date.", "not_a_date")
    }
});