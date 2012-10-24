var assert = require('chai').assert;

// TODO: This was a bad idea, use assertExpectedFail instead.
var validateAndAssertExpectedFail = function(valueToValidate, runsValidator, expectedMessage, expectedType) {
    var result;

    beforeEach(function() {
        result = runsValidator(valueToValidate);
    })

    it('should fail validation', function() {           
        assert.isDefined(result);
    });

    it('should fail validation for correct reason', function() {            
        assert.equal(result.type, expectedType);
    });

    it('should include value in response', function() {         
        assert.equal(result.value, valueToValidate);
    });

    it('should include message in response', function() {           
        assert.equal(result.message, expectedMessage);
    });
};

var assertExpectedFail = function(result, valueToValidate, expectedMessage, expectedType) {
    assert.isDefined(result, 'should fail validation for expected reason');
    assert.equal(result.type, expectedType, 'should fail validation for correct reason');

    assert.equal(result.value, valueToValidate,'should include value in response');

    assert.equal(result.message, expectedMessage, 'should include message in response');
};

// Test seperately as NaN doesn't equal itself which makes validation a bit different
var assertNaNFailsForExpectedReason = function(validator, reason) {
    var result;

    beforeEach(function() {
        var underTest = validator.create();
        result = underTest(NaN);
    })

    it('should fail validation', function() {           
        assert.isDefined(result);
        assert.equal(result.type, reason);
    });
};

module.exports = {
    validateAndAssertExpectedFail : validateAndAssertExpectedFail,
    assertNaNFailsForExpectedReason : assertNaNFailsForExpectedReason,
    assertExpectedFail : assertExpectedFail
}