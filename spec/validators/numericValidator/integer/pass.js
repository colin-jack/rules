var fixture = require("./../../../testFixture")
var assert = fixture.assert;
var integerValidator = fixture.rulesLib.integerValidator;

describe('integer validator', function() {
	var underTest;

	beforeEach(function() {
		underTest = integerValidator.create();
	});

	describe('when you use the validator to validate integer primitives', function() {
        it('should pass validation', function () {
            debugger;
			assertPassesValidation(50000);
			assertPassesValidation(50);
			assertPassesValidation(1);
			assertPassesValidation(0);
			assertPassesValidation(-1);
		});
	});

	describe('when you use the validator to validate null or undefined', function() {
		it('should pass validation', function() {
			assertPassesValidation(null);
			assertPassesValidation(undefined);
		});
	});

	describe('when you use the validator to validate Number objects for integer values', function() {
        it('should pass validation', function () {
            debugger;
			assertPassesValidation(new Number(50000));
			assertPassesValidation(new Number(50));
			assertPassesValidation(new Number(1));
			assertPassesValidation(new Number(0));
			assertPassesValidation(new Number(-1));
		});
	});

	function assertPassesValidation(value) 
	{
		assert.isUndefined(underTest(value));
	}
});