var assert = require('chai').assert;
var populatedValidator = lib.require('populatedValidator');

describe('populated validator', function() {
    describe("When value 0 is used", function() {
        assertPassedValidation(0);
    });

    describe("When value NaN is used", function() {
        assertPassedValidation(NaN);
    });

    describe("When populated array is used", function() {
        assertPassedValidation(["bob"]);
    });

    describe("When value 'true' is used", function() {
        assertPassedValidation('true');
    });

    describe("When value false is used", function() {
        assertPassedValidation(false);
    });

    describe("When value true is used", function() {
        assertPassedValidation(true);
    });

    function assertPassedValidation(value) {
        var underTest = populatedValidator.create();
        assert.isUndefined(underTest(value));
    };
});