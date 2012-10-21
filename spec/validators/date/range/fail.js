var validatorTestUtil = require('./../../testUtil');

var dateRangeValidator = lib.require('dateRangeValidator');
var now = lib.require('now');
var moment = require('moment');

describe('date range validator', function() {
    describe('When date is too far in future', function() {
        var validUpToTwoYears = { before: now.add("years", 2)}
        var fiveYearsTime = moment().add("years", 5);

        assertFailsForExpectedReason(fiveYearsTime, validUpToTwoYears, "The date is too far in the future.");
    });

    describe('When date is too far in past', function() {
        var validUpToTwoYears = { after: now.subtract("hours", 5)}
        var oneYearInpast = moment().subtract("years", 1);

        assertFailsForExpectedReason(oneYearInpast, validUpToTwoYears, "The date is too far in the past.");
    });

    function assertFailsForExpectedReason(value, config, expectedMessage) {
        var runValidatorWrapper = function() {
            var underTest = dateRangeValidator.create(config);
            return underTest(value);
        }

        validatorTestUtil.assertExpectedFail(value, runValidatorWrapper, expectedMessage, "outside_date_range")
    }
});

// TODO - Using each of the types!