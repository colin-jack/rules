var assert = require('chai').assert, 
	validatorTestUtil = require('./validatorTestUtil'),
	numericValidator = require('./../lib/numericValidator');

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

	describe("When value '' is used", function() {
		assertFailsForExpectedReason("");
	});

	describe("When value false is used", function() {
		assertFailsForExpectedReason(false);
	});

	describe("When value true is used", function() {
		assertFailsForExpectedReason(true);
	});

	var assertPassesValidation = function(value) {
		var underTest = numericValidator.create();
        assert.isUndefined(underTest(value));
    };

	describe("When null is used", function() {
		it("should pass validation", function() {
			assertPassesValidation(null);
		});
	});

	describe("When undefined is used", function() {
		it("should pass validation", function() {
			assertPassesValidation(undefined);
		});
	});

	describe("When 5 as string is used", function() {
		it("should pass validation", function() {
			assertPassesValidation('5');
		});
	});

	describe("When 5 is used", function() {
		it("should pass validation", function() {
			assertPassesValidation(5);
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