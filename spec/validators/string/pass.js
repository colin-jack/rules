var assert = require('chai').assert;
var validatorTestUtil = require('./../testUtil');
var stringValidator = require('./../../testFixture').require('stringValidator');

describe('string validator', function() {
    var assertPassedValidation = function(value) {
        var underTest = stringValidator.create();
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

    describe("When 'bob' is used", function() {
        it("should pass validation", function() {
            assertPassedValidation('bob');
        });
    });


    describe("When '' is used", function() {
        it("should pass validation", function() {
            assertPassedValidation('');
        });
    });
});