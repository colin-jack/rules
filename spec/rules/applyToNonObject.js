var assert = require('chai').assert,
    rules = lib.require('rules'),
    mustBe = lib.require('mustBe');

describe('rules - apply to something other than object', function() {
    var nameRules = {
        first  : mustBe().populated().string(),
        second : mustBe().populated().string()
    }

    describe('When you apply a simple set of rules to null', function() {
        it('should throw an exception', function() {
            assert.throws(applyValidationWrapper(null), /The target of the validation cannot be null./)
        });
    });

    describe('When you apply a simple set of rules to undefined', function() {
        it('should throw an exception', function() {
            assert.throws(applyValidationWrapper(undefined), /The target of the validation cannot be undefined./)
        });
    });

    describe('When you apply a simple set of rules to NaN/function/primitives', function() {
        var ExpectedRulesMessage = /The target of the validation must be a valid object./
        
        it('should throw an exception', function() {
            assert.throws(applyValidationWrapper(NaN), ExpectedRulesMessage)
            assert.throws(applyValidationWrapper(function() {}), ExpectedRulesMessage)
            assert.throws(applyValidationWrapper(5), ExpectedRulesMessage)
            assert.throws(applyValidationWrapper("bob"), ExpectedRulesMessage)
            assert.throws(applyValidationWrapper(false), ExpectedRulesMessage)
            assert.throws(applyValidationWrapper(Number(5)), ExpectedRulesMessage)
            assert.throws(applyValidationWrapper(String("bob")), ExpectedRulesMessage)
            assert.throws(applyValidationWrapper(Boolean(true)), ExpectedRulesMessage)
        });
    });

    function applyValidationWrapper(target) {
        return function() {
            rules.apply(target, nameRules)   
        }
    }
});