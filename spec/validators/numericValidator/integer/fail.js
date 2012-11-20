var validatorTestUtil = require('./../../testUtil');
var integerValidator = rulesLib.require('integerValidator');

describe('numeric range validator', function() {
    describe('When the value is contains a decimal value', function() {
        var expectedMessage = 'The value must be an integer.'
        assertFailsForExpectedReason(1.5, expectedMessage, "not_an_integer");
        assertFailsForExpectedReason(1.0001, expectedMessage, "not_an_integer");
        assertFailsForExpectedReason(-1.5, expectedMessage, "not_an_integer");
    });

    describe('When the value is not a number', function() {
        var expectedMessage = 'The value must be numeric.'
        assertFailsForExpectedReason("bob", expectedMessage, "not_numeric");
        assertFailsForExpectedReason(true, expectedMessage, "not_numeric");
        assertFailsForExpectedReason(function() { }, expectedMessage, "not_numeric");
        assertFailsForExpectedReason({}, expectedMessage, "not_numeric");
    });

    function assertFailsForExpectedReason(value, expectedMessage, reason) {
        var runValidatorWrapper = function() {
            var underTest = integerValidator.create();
            return underTest(value);
        }

        validatorTestUtil.validateAndAssertExpectedFail(value, runValidatorWrapper, expectedMessage, reason)
    }
});