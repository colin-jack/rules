var assert = require('chai').assert
var mustBe = require('./../lib/mustBe')
var validatron = require('./../lib/validatron')
var ValidationError = require('./../lib/ValidationError')

describe('throwing on invalid', function() {
	describe("When you ask it throw and some of the values are invalid", function() {
		var result;

		var numericRequiredAge = {
			age : mustBe().populated().numeric(),
			name: mustBe().populated()
    	};

    	var catchException = function() {
			try {
				result.throw();
			} catch (e) {
				return e;
			}
		}

		beforeEach(function() {
			result = validatron({ "age" : -1, name: null }, numericRequiredAge);
		});

		it("should throw validation exception", function() {
			assert.throws(function() { result.throw() }, ValidationError);
		});

		it("should raise a validation exception", function() {
			var e = catchException();
			assert.equal(e.message, "Validation failed.");
		});

		it("should include details in validation exception", function() {
			var e = catchException();
			assert.equal(Object.keys(e.errors).length, 2);
			assert.isDefined(e.errors["age"]);
			assert.isDefined(e.errors["name"]);
		});
	});
});