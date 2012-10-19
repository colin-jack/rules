var assert = require('chai').assert;
var validatorTestUtil = require('./../testUtil');
var regexValidator = require('./../../testFixture').require('regexValidator');

describe('regex validator', function() {
    var assertPassedValidation = function(value) {
        var config = { pattern : "[abcd]"};
        var underTest = regexValidator.create(config);
        assert.isUndefined(underTest(value));
    };

    describe("When null is used", function() {
        it("should pass validation", function() {
            assertPassedValidation(null);
        });
    });

    describe("When undefined is used", function() {
        it("should pass validation", function() {
            assertPassedValidation(undefined);
        });
    });

    describe("When value matching pattern as string is used", function() {
        it("should pass validation", function() {
            assertPassedValidation('ab');
        });
    });

    describe("When another value matching pattern is used", function() {
        it("should pass validation", function() {
            assertPassedValidation('abc');
        });
    });

    describe("When value has wrong case but case-insensitive flag is applied", function() {
        it("should pass validation", function() {
            var config = { pattern : "[abcd]", flags: "i"};
            var underTest = regexValidator.create(config);
            assert.isUndefined(underTest('AB'));
        });
    });
});