var validatorTestUtil = require('./../../testUtil');
var stringLengthValidator = require('./../../../testFixture').require('stringLengthValidator');

describe('string length validator', function() {
    describe('When the length is less than minimum', function() {
        assertFailsForExpectedReason("012", { minLength: 10, maxLength: 100}, "The length cannot be less than 10.");
    });

    describe('When the length is less than minimum', function() {
        assertFailsForExpectedReason("012", { minLength: 10, maxLength: 100}, "The length cannot be less than 10.");
    });

    describe('When the value is greather than maximum length', function() {
        assertFailsForExpectedReason("0123456", { maxLength: 5 }, "The length cannot be greater than 5.");
    });

    describe('When there is no maximum but length is less than minimum', function() {
        assertFailsForExpectedReason("abc", { minLength: 5 }, "The length cannot be less than 5.");
    });

    describe('When there is no minimum but length is greater than maximum', function() {
        assertFailsForExpectedReason("abcde012345", { maxLength: 5 }, "The length cannot be greater than 5.");
    });

    function assertFailsForExpectedReason(value, config, expectedMessage) {
        var runValidatorWrapper = function() {
            var underTest = stringLengthValidator.create(config);
            return underTest(value);
        }

        validatorTestUtil.validateAndAssertExpectedFail(value, runValidatorWrapper, expectedMessage, "outside_length_constraint")
    }
});