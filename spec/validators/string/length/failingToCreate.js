var assert = require('chai').assert;
var stringLengthValidator = require('./../../../testFixture').require('stringLengthValidator')

describe('When you try to create range validator', function() {
    var MinLengthMessage = /The minimum length \(minLength\) must be a number/;
    var MaxLengthMessage = /The maximum length \(maxLength\) must be a number/;

    describe('but minimum length is not a number', function() {
        shouldThrowErrorWhenCreated('bob', 9, MinLengthMessage);
    });

    describe('but minimum is null', function() {
        shouldThrowErrorWhenCreated(null, 9, MinLengthMessage);
    });

    describe('but minimum length is NaN', function() {
        shouldThrowErrorWhenCreated(NaN, 9, MinLengthMessage);
    });

    describe('but maximum length is not a number', function() {
        shouldThrowErrorWhenCreated(0, "bill", MaxLengthMessage);
    });

    describe('but maximum is null', function() {
        shouldThrowErrorWhenCreated(5, null, MaxLengthMessage);
    });

    describe('but maximum length is NaN', function() {
        shouldThrowErrorWhenCreated(0, NaN, MaxLengthMessage);
    });

    describe('but minimum is greater than maximum', function() {
        shouldThrowErrorWhenCreated(50, 40, /The minimum length \(minLength\) must be less than maximum \(maxLength\)./);
    });

     describe('but minimum is equal to maximum', function() {
        shouldThrowErrorWhenCreated(50, 50, /The minimum length \(minLength\) must be less than maximum \(maxLength\)./);
    });

    function shouldThrowErrorWhenCreated(minLength, maxLength, expectedMessage) {
        it('should throw exception', function() {
            var config = { minLength : minLength, maxLength : maxLength };
            assert.throws(createValidatorWrapper(config), expectedMessage);
        })
    };

    function createValidatorWrapper(config) {
        return function() {
            stringLengthValidator.create(config);
        }
    }
});