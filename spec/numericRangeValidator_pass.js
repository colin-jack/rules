var assert = require('chai').assert, 
	numericRangeValidator = require('./../lib/numericRangeValidator');

describe('numeric range validator', function() {
	describe('When you create range validator and only provide  minimum', function() {
		it('should behave as if maximum is unbounded', function() {
			debugger;
			var underTest = numericRangeValidator.create({minimum: 0});
			assert.isUndefined(underTest(50000));
		});
	});

	describe('When you create range validator and only provide maximum', function() {
		it('should act as if minimum is unbounded', function() {
			debugger;
			var underTest = numericRangeValidator.create({maximum: 50});
			assert.isUndefined(underTest(-1));
		});
	});
});