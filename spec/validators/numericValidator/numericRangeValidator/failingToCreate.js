var assert = require('chai').assert;
var numericRangeValidator = require('./../../../testFixture').require('numericRangeValidator')

describe('When you try to create numeric range validator', function() {
    var MinMessage = /The 'min' value must be a number./;
    var MaxMessage = /The 'max' value must be a number./;

    describe('but minimum is not a number', function() {
        shouldThrowErrorWhenCreated('bob', 9, MinMessage);
    });

    describe('but minimum is null', function() {
        shouldThrowErrorWhenCreated(null, 5, MinMessage);
    });

    describe('but minimum is NaN', function() {
        shouldThrowErrorWhenCreated(NaN, 9, MinMessage);
    });

    describe('but maximum is not a number', function() {
        shouldThrowErrorWhenCreated(0, "bill", MaxMessage);
    });

    describe('but maximum is null', function() {
        shouldThrowErrorWhenCreated(5, null, MaxMessage);
    });

    describe('but maximum is NaN', function() {
        shouldThrowErrorWhenCreated(0, NaN, MaxMessage);
    });

    describe('but minimum is greater than maximum', function() {
        shouldThrowErrorWhenCreated(50, 40, "Min must be less than max.");
    });

    function createValidatorWrapper(config) {
        return function() {
            numericRangeValidator.create(config);
        }
    }

    function shouldThrowErrorWhenCreated(minimum, maximum, expectedMessage) {
        it('should throw exception', function() {
            var config = { min : minimum, max : maximum };
            assert.throws(createValidatorWrapper(config), expectedMessage);
        })
    };
});