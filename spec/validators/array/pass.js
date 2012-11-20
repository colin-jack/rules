var assert = require('chai').assert;
var arrayValidator = rulesLib.require('arrayValidator');

describe('array validator', function() {
    describe("When value '' is used", function() {
        assertPassedValidation("");
    });

    describe("When value 'null' is used", function() {
        assertPassedValidation(null);
    });

    describe("When value 'undefined' is used", function() {
        assertPassedValidation(undefined);
    });

    describe("When empty array", function() {
        assertPassedValidation([]);
    });

    describe("When populated array is used", function() {
        assertPassedValidation(['bob', 'frank']);
    });

    function assertPassedValidation(value) {
        var underTest = arrayValidator.create();
        assert.isUndefined(underTest(value));
    };
});