describe('throwing on invalid', function() {
	describe("When you ask it throw and some of the values are invalid", function() {
		var numericRequiredAge = {
			age : mustBe().populated().numeric(),
			name: mustBe().populated()
    	};

		beforeEach(function() {
			result = validatron({ "age" : -1, name: null }, numericRequiredAge)
		});

		it("should throw validation exception", function() {
			expect(result.throw()).toThrow(ValidationException);
		});

		it("should include details in validation exception", function() {
			try {
				result.throw();
			} catch (e) {
				expect(e.message).instanceof(ValidationException);
				expect(e.message).toEqual("Validation failed.");
				expect(e.errors.length).toEqual(2);
				expect(e.errors["age"]).toNotBeUndefined();
				expect(e.errors["name"]).toNotBeUndefined();
			}
		});
	});
});