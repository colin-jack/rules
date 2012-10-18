var assert = require('chai').assert;
var stringValidator = require('./../../testFixture').require('stringValidator');
var testUtil = require('./../testUtil');

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

    describe("When NaN is used", function() {
        testUtil.assertNaNFailsForExpectedReason(stringValidator, "not_a_string");
    });

    describe("When valid string is used but its outside length range", function() {
        var runValidatorWrapper = function() {
            var underTest = stringValidator.create({minLength : 6, maxLength: 20});
            return underTest("a");
        }

        testUtil.assertExpectedFail("a", runValidatorWrapper, "The length cannot be less than 6.", "outside_length_constraint")
    });

    function assertFailsForExpectedReason(value) {
        var runValidatorWrapper = function() {
            var underTest = stringValidator.create();
            return underTest(value);
        }

        testUtil.assertExpectedFail(value, runValidatorWrapper, "The value must be a string.", "not_a_string")
    }
});

   