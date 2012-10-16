var assert = require('chai').assert
var mustBe = require('./../lib/mustBe')
var validatron = require('./../lib/validatron')

describe('simple numeric validation', function() {
    var validate = function(toValidate, definition) {
		return validatron(toValidate, definition);
	};

	var result;

	var shouldHaveSingleError = function(property, error) {
		it("Should have error for just age property", function() {
			var invalidProperties = Object.keys(result);
			assert.equal(invalidProperties.length, 1);
			assert.notEqual(invalidProperties.indexOf(property), -1);
		});

		it("Should have one error for age property", function() {
			assert.equal(result[property].length, 1);
		});

		it("Should notify you the value must be populated", function() {
			assert.equal(result[property][0].type, error);
		});
	};

	describe("When property age must be populated and is not", function()
	{
		var numericRequiredAge = {
			age : mustBe().populated().numeric(),
    	};

		beforeEach(function() {
			result = validate({ "age" : undefined, "name": null, weight: 80 }, numericRequiredAge);
		});

		shouldHaveSingleError("age", "not_populated")
	});

	describe("When numeric property does not need to be populated and is not", function() {
		var result;

		var numericOptionalAge = {
			age : mustBe().numeric()
    	};

		beforeEach(function() {
			result = validate({ "age" : undefined}, numericOptionalAge);
		});

		it("Should not raise any error", function() {
			assert.equal(Object.keys(result).length, 1);
		});
	});

	describe("When numeric property must be in range and is not", function() {
		var numericRequiredAge = {
			age : mustBe().populated().numeric({ minimum: 0}, { maximum: 130 })
    	};

		beforeEach(function() {
			result = validate({ "age" : -1 }, numericRequiredAge);
		});

		shouldHaveSingleError("age", "outside_range");
	});
});