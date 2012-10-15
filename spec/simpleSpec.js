describe('simple numeric validation', function() {
    var validate = function(toValidate, definition) {
		return validatron(toValidate, definition);
	};

	var result;

	var shouldHaveSingleError = function(property, error) {
		it("Should have error for just age property", function() {
			var invalidProperties = Object.keys(result);
			expect(invalidProperties.length).toEqual(1);
			expect(invalidProperties.indexOf(property)).toNotEqual(-1);
		});

		it("Should have one error for age property", function() {
			expect(result[property].length).toEqual(1);
		});

		it("Should notify you the value must be populated", function() {
			expect(result[property][0].type).toEqual(error);
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
			expect(Object.keys(result).length).toEqual(1);
		});
	});

	describe("When numeric property must be in range and is not", function() {
		var numericRequiredAge = {
			age : mustBe().populated().numeric({ minimum: 0, maximum: 130})
    	};

		beforeEach(function() {
			result = validate({ "age" : -1 }, numericRequiredAge);
		});

		shouldHaveSingleError("age", "outside_range");
	});
});


////expect(validate(toValidate, definition)).toThrow(ValidationError);