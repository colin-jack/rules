var assert = require('chai').assert;
var now = rulesLib.require('now');
var moment = require('moment');
var dateRangeValidator = rulesLib.require('dateRangeValidator');

describe('date range validator', function() {
    describe('When you try to create date range range validator', function() {
        var NotParsable = /When included the before\/after values should be dates or parsable as dates./;

        describe('but before is a number', function() {
            shouldThrowErrorWhenCreated(5, moment(), NotParsable);
        });

        describe('but before is a Date', function() {
            shouldThrowErrorWhenCreated(new Date(), moment(), NotParsable);
        });

        describe('but before is a date as a string', function() {
            shouldThrowErrorWhenCreated(new Date().toUTCString(), moment(), NotParsable);
        });

        describe('but before is an array', function() {
            shouldThrowErrorWhenCreated([2010, 11, 11], moment(), NotParsable);
        })

        describe('but before is a boolean', function() {
            shouldThrowErrorWhenCreated(true, moment(), NotParsable);
        });

        describe('but before is null', function() {
            shouldThrowErrorWhenCreated(null, moment(), NotParsable);
        });

        describe('but before is NaN', function() {
            shouldThrowErrorWhenCreated(NaN, moment(), NotParsable);
        });

        describe('but after is a number', function() {
            shouldThrowErrorWhenCreated(moment(), 5, NotParsable);
        });

        describe('but after is an array', function() {
            shouldThrowErrorWhenCreated(moment(), [2010, 11, 11], NotParsable);
        })

        describe('but after is a boolean', function() {
            shouldThrowErrorWhenCreated(moment(), true, NotParsable);
        });

        describe('but after is null', function() {
            shouldThrowErrorWhenCreated(moment(), null, NotParsable);
        });

        describe('but after is NaN', function() {
            shouldThrowErrorWhenCreated(moment(), NaN, NotParsable);
        });

         describe('but after is a Date', function() {
            shouldThrowErrorWhenCreated(moment(), new Date(), NotParsable);
        });

        describe('but after is a date as a string', function() {
            shouldThrowErrorWhenCreated(moment(), new Date().toUTCString(), NotParsable);
        });

        describe('but after is greater than before', function() {
            var fiveDays = moment().add("days", 5);
            shouldThrowErrorWhenCreated(moment(), fiveDays, "The before value must be later than the after value.");
        });

          describe('but after is equal to before', function() {
            shouldThrowErrorWhenCreated(moment(), moment(), "The before value must be later than the after value.");
        });

        function createValidatorWrapper(config) {
            return function() {
                dateRangeValidator.create(config);
            }
        }

        function shouldThrowErrorWhenCreated(beforeValue, afterValue, expectedMessage) {
            it('should throw exception', function() {
                var beforeFunc = function() { return beforeValue; };
                var afterFunc = function() { return afterValue; };

                var config = { before : beforeFunc, after : afterFunc };
                assert.throws(createValidatorWrapper(config), expectedMessage);
            })
        };
    });
});