var assert = require('chai').assert;
var now = lib.require('now');
var moment = require('moment');
var dateRangeValidator = lib.require('dateRangeValidator');

describe('date range validator', function() {
    describe('When you try to create date range range validator', function() {
        var NotParsable = /When included the before\/after values should be dates or parsable as dates./;

        describe('but before is a number', function() {
            shouldThrowErrorWhenCreated(5, moment(), NotParsable);
        });

        describe('but before is an array', function() {
            shouldThrowErrorWhenCreated([2010, 11, 11], moment(), NotParsable);
        })

        describe('but before is a boolean', function() {
            shouldThrowErrorWhenCreated(moment(), moment(), NotParsable);
        });

        // describe('but before is null', function() {
        //     shouldThrowErrorWhenCreated(null, 5, NotParsable);
        // });

        // describe('but before is NaN', function() {
        //     shouldThrowErrorWhenCreated(NaN, 9, NotParsable);
        // });

        // describe('but after is a number', function() {
        //     shouldThrowErrorWhenCreated(0, "bill", NotParsable);
        // });

        // describe('but after is null', function() {
        //     shouldThrowErrorWhenCreated(5, null, NotParsable);
        // });

        // describe('but after is NaN', function() {
        //     shouldThrowErrorWhenCreated(0, NaN, NotParsable);
        // });

        // describe('but minimum is greater than maximum', function() {
        //     shouldThrowErrorWhenCreated(50, 40, "Min must be less than max.");
        // });

        // describe('but minimum is same as maximum', function() {
        //     shouldThrowErrorWhenCreated(50, 50, "Min must be less than max.");
        // });

        function createValidatorWrapper(config) {
            return function() {
                dateRangeValidator.create(config);
            }
        }

        function shouldThrowErrorWhenCreated(beforeValue, afterValue, expectedMessage) {
            it('should throw exception', function() {
                debugger;
                var beforeFunc = function() { return beforeValue; };
                var afterFunc = function() { return afterValue; };
                var config = { before : beforeFunc, after : afterFunc };
                assert.throws(createValidatorWrapper(config), expectedMessage);
            })
        };
    });
});

// // TODO - Pass in numeric
// // TODO - Pass in moment
// // TODO - Pass in string
// // TODO - Pass in Date
// TODO - Inappropriate arguments to numeric validator