var assert = require('chai').assert, 
	validatorTestUtil = require('./validatorTestUtil'),
	numericRangeValidator = require('./../lib/numericRangeValidator');

describe('numeric range validator', function() {
	describe('When you create range validator and only provide  minimum', function() {
		it('should behave as if maximum is unbounded', function() {
			var underTest = numericRangeValidator.create({minimum: 0});
			assert.isUndefined(underTest(50000));
		});
	});

	describe('When you create range validator and only provide maximum', function() {
		it('should act as if minimum is unbounded', function() {
			var underTest = numericRangeValidator.create({maximum: 50});
			assert.isUndefined(underTest(-1));
		});
	});

	var assertFailsForExpectedReason = function(value, config, expectedMessage) {
		var runValidatorWrapper = function() {
			var underTest = numericRangeValidator.create(config);
			return underTest(value);
		}

		validatorTestUtil.testFailsForExpectedReason(value, runValidatorWrapper, expectedMessage, "outside_range")
	}

	describe('When the value is less than minimum', function() {
		assertFailsForExpectedReason(1, { minimum: 10, maximum: 100}, "The value cannot be less than 10.");
	});

	describe('When the value is greater than maximum', function() {
		assertFailsForExpectedReason(50, { minimum: 0 , maximum: 10}, "The value cannot be greater than 10.");
	});

	describe('When there is no maximum but value is less than minimum', function() {
		assertFailsForExpectedReason(5, { minimum: 15 }, "The value cannot be less than 15.");
	});

	describe('When there is no maximum but value is less than minimum', function() {
		assertFailsForExpectedReason(20, { maximum: 15 }, "The value cannot be greater than 15.");
	});
});