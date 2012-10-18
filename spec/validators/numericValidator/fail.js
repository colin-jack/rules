var assert = require('chai').assert;
var validatorTestUtil = require('./../testUtil');
var numericValidator = require('./../../testFixture').require('numericValidator');

describe('numeric validator', function() {
	 var assertFailsForExpectedReason = function(value) {
        var runValidatorWrapper = function() {
            var underTest = numericValidator.create();
            return underTest(value);
        }

        validatorTestUtil.assertExpectedFail(value, runValidatorWrapper, "The value must be numeric.", "not_numeric")
    }

	describe("When value 'bob' is used", function() {
		assertFailsForExpectedReason("bob");
	});

	describe("When value 'bob5' is used", function() {
		assertFailsForExpectedReason("bob5");
	});

	describe("When value '5bob' is used", function() {
		assertFailsForExpectedReason("5bob");
	});

	describe("When value false is used", function() {
		assertFailsForExpectedReason(false);
	});

	describe("When value true is used", function() {
		assertFailsForExpectedReason(true);
	});

	describe("When NaN is used", function() {
        validatorTestUtil.assertNaNFailsForExpectedReason(numericValidator, "not_numeric");
	});
});