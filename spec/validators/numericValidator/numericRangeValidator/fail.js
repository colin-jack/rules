var validatorTestUtil = require('./../../testUtil');
var numericRangeValidator = require('./../../../testFixture').require('numericRangeValidator');

describe('numeric range validator', function() {
    describe('When the value is less than minimum', function() {
        assertFailsForExpectedReason(1, { min: 10, max: 100}, "The value cannot be less than 10.");
    });

    describe('When the value is greater than maximum', function() {
        assertFailsForExpectedReason(20, { max: 15 }, "The value cannot be greater than 15.");
    });

    describe('When there is no minimum but value is greater than maximum', function() {
        assertFailsForExpectedReason(50, { max: 10}, "The value cannot be greater than 10.");
    });

    describe('When there is no maximum but value is less than minimum', function() {
        assertFailsForExpectedReason(5, { min: 15 }, "The value cannot be less than 15.");
    });

    function assertFailsForExpectedReason(value, config, expectedMessage) {
        var runValidatorWrapper = function() {
            var underTest = numericRangeValidator.create(config);
            return underTest(value);
        }

        validatorTestUtil.testFailsForExpectedReason(value, runValidatorWrapper, expectedMessage, "outside_range")
    }
});