var assert = require('chai').assert;
var now = rulesLib.require('now');
var moment = require('moment');
var dateRangeValidator = rulesLib.require('dateRangeValidator');

describe('date range validator', function() {
	describe('When you create range validator and only provide after', function() {
		it('should act as if before is unbounded', function() {
			var underTest = dateRangeValidator.create({ after: now.subtract("years", 5) });
			var agesInFuture = moment().add("years", 30);

			assert.isUndefined(underTest(agesInFuture));
		});
	});

	describe('When you create range validator and only provide before', function() {
		it('should act as if after is unbounded', function() {
			var underTest = dateRangeValidator.create({ before: now.add("years", 5) });
			var agesAgo = moment().subtract("years", 30);

			assert.isUndefined(underTest(agesAgo));
		});
	});

	describe('When any time from an hour in the past to an hours time is valid', function() {
		var oneHourPastAndFuture = { after: now.subtract("hours", 1), 
					  				 before: now.add("hours", 1)};

		shouldBeHappyWithCurrentTime(oneHourPastAndFuture);
	});

	describe('When any time within three years is OK and we pass in current date as number', function() {
		var twoYearsPastOneYearFuture = { after: now.subtract("years", 2), 
							  		 before: now.add("years", 1)};

		shouldBeHappyWithCurrentTime(twoYearsPastOneYearFuture);
	});

	function shouldBeHappyWithCurrentTime(rangeConfig) {
		describe('should pass validation when given current date as number', function() {
			shouldPassValidation(Date.now(), rangeConfig);
		});

		describe('should pass validation when given current date as string', function() {
			shouldPassValidation(new Date().toUTCString(), rangeConfig);
		});

		describe('should pass validation when given current date object', function() {
			shouldPassValidation(new Date(), rangeConfig);
		});

		describe('should pass validation when given current moment object', function() {
			shouldPassValidation(new moment(), rangeConfig);
		});

		describe('should pass validation when given current date as moment', function() {
			shouldPassValidation(new moment(), rangeConfig);
		});
	};

	function shouldPassValidation(toValidate, rangeConfig) {
		it('should pass', function() {
			var underTest = dateRangeValidator.create(rangeConfig);

			assert.isUndefined(underTest(toValidate));
		});
	}
});