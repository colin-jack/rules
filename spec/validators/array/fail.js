var assert = require('chai').assert;
var arrayValidator = require('./../../testFixture').require('arrayValidator');
var validatorTestUtil = require('./../testUtil');

describe('array validator', function() {   
  
    describe("When value 0 is used", function() {
        assertFailsForExpectedReason(0);
    });
    
    describe("When value 'true' is used", function() {
        assertFailsForExpectedReason('true');
    });

    describe("When value false is used", function() {
        assertFailsForExpectedReason(false);
    });

    describe("When value true is used", function() {
        assertFailsForExpectedReason(true);
    });

    describe("When string", function() {
        assertFailsForExpectedReason("oi");
    });

    function assertFailsForExpectedReason(value) {
        var runValidatorWrapper = function() {
            var underTest = arrayValidator.create();
            return underTest(value);
        }

        validatorTestUtil.assertExpectedFail(value, runValidatorWrapper, "The value must be an array.", "not_an_array")
    }
});

   