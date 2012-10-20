var assert = require('chai').assert;
var validatorTestUtil = require('./../testUtil');
var dateValidator = require('./../../testFixture').require('dateValidator');

describe('date validator', function() {
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

    describe("When '2011-10-10' is used", function() {
        it("should pass validation", function() {
            assertPassedValidation("2011-10-10");
        });
    });

    describe("When array is used", function() {
        it("should pass validation", function() {
            assertPassedValidation([2011, 10, 10]);
        });
    });

    describe("When date object is used", function() {
        it("should pass validation", function() {
            assertPassedValidation(new Date("2011, 10, 10"));
        });
    });

    function assertPassedValidation(value) {
        var underTest = dateValidator.create();
        assert.isUndefined(underTest(value));
    };
});