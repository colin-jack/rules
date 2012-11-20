var assert = require('chai').assert;
var numericRangeValidator = rulesLib.require('numericRangeValidator');

describe('numeric range validator', function() {
	describe('When you create range validator and only provide  minimum', function() {
		it('should behave as if maximum is unbounded', function() {
			var underTest = numericRangeValidator.create({min: 0});
			assert.isUndefined(underTest(50000));
		});
	});

	describe('When you create range validator and only provide maximum', function() {
		it('should act as if minimum is unbounded', function() {
			var underTest = numericRangeValidator.create({max: 50});
			assert.isUndefined(underTest(-1));
		});
	});

	describe('When value is within range', function() {
		it('should pass', function() {
			var underTest = numericRangeValidator.create({min: 5, max: 10});
			assert.isUndefined(underTest(6));
		});
	});

	describe('When asking if it handles', function() {
		it('says yes if has min or max', function() {
			assert.isTrue(numericRangeValidator.handles( {min: 5} ));
			assert.isTrue(numericRangeValidator.handles( {max: 5} ));
			assert.isFalse(numericRangeValidator.handles( {bob: 5} ));
		});
	});
});