var assert = require('chai').assert;
var validatorTestUtil = require('./../testUtil');
var regexValidator = require('./../../testFixture').require('regexValidator');

describe('numeric validator', function() {
    describe("When value has wrong case and no flags are used", function() {
        assertFailsForExpectedReason("ab");
    });

    describe("When value does not match regex", function() {
        assertFailsForExpectedReason("something"); 
    });

    describe("When value false is used", function() {
        assertFailsForExpectedReason(false);
    });

    describe("When value true is used", function() {
        assertFailsForExpectedReason(true);
    });

    function assertFailsForExpectedReason(value) {
        var runValidatorWrapper = function() {
            var config = { pattern: "(AB)+" }
            var underTest = regexValidator.create(config);
            return underTest(value);
        }

        validatorTestUtil.assertExpectedFail(value, runValidatorWrapper, "The value does not match the required pattern '(AB)+'", "regex_not_matched")
    }
});