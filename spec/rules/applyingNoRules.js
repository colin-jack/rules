var assert = require('chai').assert,
    rules = rulesLib.require('rules'),
    mustBe = rulesLib.require('mustBe');

describe('rules - apply no schema', function() {
    describe('When you apply an invalid rules object', function() {

        var ExpectedMessage = /The rules object was not valid./

        it('should throw an exception', function() {
            assert.throws(applyValidationWrapper(NaN), ExpectedMessage)
            assert.throws(applyValidationWrapper(function() {}), ExpectedMessage)
            assert.throws(applyValidationWrapper(5), ExpectedMessage)
            assert.throws(applyValidationWrapper("bob"), ExpectedMessage)
            assert.throws(applyValidationWrapper(false), ExpectedMessage)
            assert.throws(applyValidationWrapper(Number(5)), ExpectedMessage)
            assert.throws(applyValidationWrapper(String("bob")), ExpectedMessage)
            assert.throws(applyValidationWrapper(Boolean(true)), ExpectedMessage)
        });
    });

    function applyValidationWrapper(schema) {
        return function() {
            rules.apply({}, schema)   
        }
    }
});