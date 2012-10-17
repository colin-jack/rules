var assert = require('chai').assert;
var validatorTestUtil = require('./../testUtil');
var numericValidator = require('./../../testFixture').require('numericValidator');

describe('numeric validator', function() {
	 var assertFailsForExpectedReason = function(value) {
        var runValidatorWrapper = function() {
            var underTest = numericValidator.create();
            return underTest(value);
        }

        validatorTestUtil.testFailsForExpectedReason(value, runValidatorWrapper, "The value must be numeric.", "not_numeric")
    }

	describe("When value 'bob' is used", function() {
		assertFailsForExpectedReason("bob");
	});

	describe("When value 'bob5' is used", function() {
		assertFailsForExpectedReason("bob5");
	});

	describe("When value '5bob' is used", function() {
		assertFailsForExpectedReason("5bob");
	});

	describe("When value false is used", function() {
		assertFailsForExpectedReason(false);
	});

	describe("When value true is used", function() {
		assertFailsForExpectedReason(true);
	});

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

	describe("When NaN is used", function() {
	    var result;

	    beforeEach(function() {
	        var underTest = numericValidator.create();
            result = underTest(NaN);
	    })

	    it('should fail validation', function() {           
	        assert.isDefined(result);
	        assert.equal(result.type, "not_numeric");
	    });

	});
});