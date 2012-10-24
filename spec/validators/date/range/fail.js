var testUtil = require('./../../testUtil');
var dateRangeValidator = lib.require('dateRangeValidator');
var now = lib.require('now');
var moment = require('moment');

describe('date range validator', function() {
    // TODO: Change the way this and next test work, the use of date in the message makes it possible it'll fail
    describe('When date is too far in future', function() {
        var result, validUpToTwoYears, expectedMessage, fiveYearsTime;

        beforeEach(function() {
            var validUpToTwoYears = { before: now.add("years", 2)}
            fiveYearsTime = moment().add("years", 30);
            expectedMessage = "The date must be before '" + moment().add("years", 2).toString() + "'";

            var underTest = dateRangeValidator.create(validUpToTwoYears);
            result = underTest(fiveYearsTime);
        });

        it("should fail for expected reason", function() {
            testUtil.assertExpectedFail(result, fiveYearsTime, expectedMessage, "outside_date_range")
        });
    });

    describe('When date is too far in past', function() {
        var result, oneYearInpast, expectedMessage, fiveYearsTime;

        beforeEach(function() {
            var valueFiveHoursInPast = { after: now.subtract("hours", 5)}
            oneYearInpast = moment().subtract("years", 1);
            expectedMessage = "The date must be after '" + moment().subtract("hours", 5).toString() + "'";

            var underTest = dateRangeValidator.create(valueFiveHoursInPast);
            result = underTest(oneYearInpast);
        });

        it("should fail for expected reason", function() {
            testUtil.assertExpectedFail(result, oneYearInpast, expectedMessage, "outside_date_range")
        });
    });
});