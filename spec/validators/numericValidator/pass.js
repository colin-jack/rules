var assert = require('chai').assert;
var validatorTestUtil = require('./../testUtil');
var numericValidator = require('./../../testFixture').require('numericValidator');

describe('numeric validator', function() {
    describe('When value is null/undefined and you have min/max length', function() {
        it('should pass', function() {
            var underTest = numericValidator.create({min: 5, max: 10});
            assert.isUndefined(underTest(null));
            assert.isUndefined(underTest(undefined));
        });
    });
    
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

    function assertPassedValidation (value) {
        var underTest = numericValidator.create();
        assert.isUndefined(underTest(value));
    };

});