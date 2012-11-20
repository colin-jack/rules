var assert = require('chai').assert;
var integerValidator = rulesLib.require('integerValidator');

describe('integer validator', function() {
	var underTest;

	beforeEach(function() {
		underTest = integerValidator.create();
	});

	describe('when you use the validator to validate integer primitives', function() {
		it('should pass validation', function() {
			assertPassesValidation(50000);
			assertPassesValidation(50);
			assertPassesValidation(1);
			assertPassesValidation(0);
			assertPassesValidation(-1);
		});
	});

	describe('when you use the validator to validate Number objects for integer values', function() {
		it('should pass validation', function() {
			assertPassesValidation(new Number(50000));
			assertPassesValidation(new Number(50));
			assertPassesValidation(new Number(1));
			assertPassesValidation(new Number(0));
			assertPassesValidation(new Number(-1));
		});
	});

	function assertPassesValidation(value) {
		assert.isUndefined(underTest(50000));
	}
});