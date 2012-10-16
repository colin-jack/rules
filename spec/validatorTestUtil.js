var assert = require('chai').assert;

var testFailsForExpectedReason = function(valueToValidate, runsValidator, expectedMessage, expectedType) {
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

module.exports = {
    testFailsForExpectedReason : testFailsForExpectedReason
}