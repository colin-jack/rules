var assert = require('chai').assert;
var rules = lib.require('rules'),
    mustBe = lib.require('mustBe'),
    compare = require('objectcompare');

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
        it('should throw an exception', function() {
            assert.throws(applyValidationWrapper(NaN), /The target of the validation must be a valid object./)
            assert.throws(applyValidationWrapper(function() {}), /The target of the validation must be a valid object./)
            assert.throws(applyValidationWrapper(5), /The target of the validation must be a valid object./)
            assert.throws(applyValidationWrapper("bob"), /The target of the validation must be a valid object./)
            assert.throws(applyValidationWrapper(false), /The target of the validation must be a valid object./)
            assert.throws(applyValidationWrapper(Number(5)), /The target of the validation must be a valid object./)
            assert.throws(applyValidationWrapper(String("bob")), /The target of the validation must be a valid object./)
            assert.throws(applyValidationWrapper(Boolean(true)), /The target of the validation must be a valid object./)
        });
    });

    function applyValidationWrapper(target) {
        return function() {
            rules.apply(target, nameRules)   
        }
    }

    // TODO: Rules object null/undefined.
});