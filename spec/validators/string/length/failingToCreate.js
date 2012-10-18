var assert = require('chai').assert;
var stringLengthValidator = require('./../../../testFixture').require('stringLengthValidator')

describe('When you try to create range validator', function() {
    describe('but minimum length is not a number', function() {
        shouldThrowErrorWhenCreated('bob', 9, "Minimum must be a number.");
    });

    describe('but minimum is nulll', function() {
        shouldThrowErrorWhenCreated(null, 9, "Minimum must be a number.");
    });

    describe('but minimum length is NaN', function() {
        shouldThrowErrorWhenCreated(NaN, 9, "Minimum must be a number.");
    });

    describe('but maximum length is not a number', function() {
        shouldThrowErrorWhenCreated(0, "bill", "Maximum must be a number.");
    });

    describe('but maximum is nulll', function() {
        shouldThrowErrorWhenCreated(5, null, "Maximum must be a number.");
    });

    describe('but maximum length is NaN', function() {
        shouldThrowErrorWhenCreated(0, NaN, "Maximum must be a number.");
    });

    describe('but minimum is greater than maximum', function() {
        shouldThrowErrorWhenCreated(50, 40, "Minimum must be less than maximum.");
    });

    function shouldThrowErrorWhenCreated(minLength, maxLength, expectedMessage) {
        it('should throw exception', function() {
            var config = { minLength : minLength, maxLength : maxLength };
            assert.throws(createValidatorWrapper(config), Error, expectedMessage);
        })
    };

    function createValidatorWrapper(config) {
        return function() {
            stringLengthValidator.create(config);
        }
    }
});