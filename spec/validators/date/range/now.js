// non-numeric value
// in-appropriate key

var assert = require('chai').assert;
var now = rulesLib.require('now');
var moment = require('moment');

describe('date range validator - now interface', function() {
    describe('When you try to pass a boolean value to now.add', function() {
        shouldThrowOnInvalidValuePassedToAdd(true)
    });

    describe('When you try to pass a boolean value to now.subtract', function() {
        shouldThrowOnInvalidValuePassedToSubtract(true)
    });

    describe('When you try to pass an inappropriate key to now.add', function() {
        shouldThrowOnInvalidKeyPassedToAdd("millenium")
        shouldThrowOnInvalidKeyPassedToAdd("bob")
        shouldThrowOnInvalidKeyPassedToAdd("")
        shouldThrowOnInvalidKeyPassedToAdd(undefined)
    });

    function shouldThrowOnInvalidKeyPassedToAdd(key) {
        it('should raise an exception', function() {
            var passingInValue = function() { now.add(key, 1)}

            assert.throws(passingInValue);
        });
    }

    function shouldThrowOnInvalidValuePassedToAdd(value) {
        it('should raise an exception', function() {
            var passingInValue = function() { now.add("years", value)}

            assert.throws(passingInValue);
        });
    }

    function shouldThrowOnInvalidValuePassedToSubtract(value) {
        it('should raise an exception', function() {
            var passingInValue = function() { now.subtract("years", value)}

            assert.throws(passingInValue);
        });
    }
});