var assert = require('chai').assert;
var numericRangeValidator = require('./../../../testFixture').require('numericRangeValidator')

describe('When you try to create range validator', function() {
    var createValidatorWrapper = function(config) {
        return function() {
            numericRangeValidator.create(config);
        }
    }

    var shouldThrowErrorWhenCreated = function(minimum, maximum, expectedMessage) {
        it('should throw exception', function() {
            var config = { minimum : minimum, maximum : maximum };
            assert.throws(createValidatorWrapper(config), Error, expectedMessage);
        })
    };

    describe('but minimum is not a number', function() {
        shouldThrowErrorWhenCreated('bob', 9, "Minimum must be a number.");
    });

    describe('but minimum is NaN', function() {
        shouldThrowErrorWhenCreated(NaN, 9, "Minimum must be a number.");
    });

    describe('but maximum is not a number', function() {
        shouldThrowErrorWhenCreated(0, "bill", "Maximum must be a number.");
    });

    describe('but maximum is NaN', function() {
        shouldThrowErrorWhenCreated(0, NaN, "Maximum must be a number.");
    });

    describe('but minimum is greater than maximum', function() {
        shouldThrowErrorWhenCreated(50, 40, "Minimum must be less than maximum.");
    });
});