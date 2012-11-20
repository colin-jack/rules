var assert = require('chai').assert;
var populatedValidator = rulesLib.require('populatedValidator');
var validatorTestUtil = require('./../testUtil');

describe('populated validator', function() {   
    describe("When value '' is used", function() {
        assertFailsForExpectedReason("");
    });

    describe("When value 'null' is used", function() {
        assertFailsForExpectedReason(null);
    });

    describe("When empty array is used", function() {
        assertFailsForExpectedReason([]);
    });

    describe("When value 'undefined' is used", function() {
        assertFailsForExpectedReason(undefined);
    });

    function assertFailsForExpectedReason(value) {
        var runValidatorWrapper = function() {
            var underTest = populatedValidator.create();
            return underTest(value);
        }

        validatorTestUtil.validateAndAssertExpectedFail(value, runValidatorWrapper, "The value must be populated.", "not_populated")
    }
});

   