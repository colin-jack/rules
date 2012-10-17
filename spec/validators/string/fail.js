var assert = require('chai').assert;
var stringValidator = require('./../../testFixture').require('stringValidator');
var validatorTestUtil = require('./../testUtil');

describe('string validator', function() {   
    describe("When value 5 is used", function() {
        assertFailsForExpectedReason(5);
    });

    describe("When value true is used", function() {
        assertFailsForExpectedReason(true);
    });

    describe("When value false is used", function() {
        assertFailsForExpectedReason(false);
    });

    describe("When function is used", function() {
        assertFailsForExpectedReason(function() {});
    });

    describe("When object is used", function() {
        assertFailsForExpectedReason({});
    });

    // Test seperately as NaN doesn't equal itself which makes validation a bit different
    describe("When NaN is used", function() {
        var result;

        beforeEach(function() {
            var underTest = stringValidator.create();
            result = underTest(NaN);
        })

        it('should fail validation', function() {           
            assert.isDefined(result);
            assert.equal(result.type, "not_a_string");
        });

    });

    function assertFailsForExpectedReason(value) {
        var runValidatorWrapper = function() {
            var underTest = stringValidator.create();
            return underTest(value);
        }

        validatorTestUtil.testFailsForExpectedReason(value, runValidatorWrapper, "The value must be a string.", "not_a_string")
    }
});

   