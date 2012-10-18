var assert = require('chai').assert;

var assertExpectedFail = function(valueToValidate, runsValidator, expectedMessage, expectedType) {
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
    assertExpectedFail : assertExpectedFail,
    assertNaNFailsForExpectedReason : assertNaNFailsForExpectedReason
}