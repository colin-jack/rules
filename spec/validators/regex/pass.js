var assert = require('chai').assert;
var validatorTestUtil = require('./../testUtil');
var regularExpressionValidator = rulesLib.require('regularExpressionValidator');

describe('regex validator', function() {
    var assertPassedValidation = function(value) {
        var config = { pattern : "[abcd]"};
        var underTest = regularExpressionValidator.create(config);
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
            var underTest = regularExpressionValidator.create(config);
            assert.isUndefined(underTest('AB'));
        });
    });

    describe("When regular expression rather than string is passed in for pattern", function() {
        it("should pass validation", function() {
            var config = { pattern : /[ABCD]/ };
            var underTest = regularExpressionValidator.create(config);
            assert.isUndefined(underTest('ABCD'));
        });
    });

    describe("When you pass in a regular expression object directly skipping config object", function() {
        it("should pass validation", function() {
            var underTest = regularExpressionValidator.create(/[ABCD]/);
            assert.isUndefined(underTest('ABCD'));
        });
    });

    describe("When you pass in a regular expression string directly skipping config object", function() {
        it("should pass validation", function() {
            var underTest = regularExpressionValidator.create('[ABCD]');
            assert.isUndefined(underTest('ABCD'));
        });
    });
});