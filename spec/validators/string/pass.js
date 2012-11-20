var assert = require('chai').assert;
var validatorTestUtil = require('./../testUtil');
var stringValidator = rulesLib.require('stringValidator');

describe('string validator', function() {
    describe('When value is undefined/null and you apply minLength/maxLength', function() {
        var underTest = stringValidator.create( { minLength: 10, maxLength: 100} );
        assert.isUndefined(underTest(undefined));
        assert.isUndefined(underTest(null));
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

    function assertPassedValidation(value) {
        var underTest = stringValidator.create();
        assert.isUndefined(underTest(value));
    };
});