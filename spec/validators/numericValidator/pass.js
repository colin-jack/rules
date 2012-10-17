var assert = require('chai').assert;
var validatorTestUtil = require('./../testUtil');
var numericValidator = require('./../../testFixture').require('numericValidator');

describe('numeric validator', function() {
    var assertPassedValidation = function(value) {
        var underTest = numericValidator.create();
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

    describe("When 5 as string is used", function() {
        it("should pass validation", function() {
            assertPassedValidation('5');
        });
    });

    describe("When 5 is used", function() {
        it("should pass validation", function() {
            assertPassedValidation(5);
        });
    });
});