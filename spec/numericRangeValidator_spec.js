describe('simple numeric validation', function() {
  
	describe("When minimum is not a number", function() {
		//shouldThrowException({ minimum: "bob"});
	});

	describe("When maximum is not a number", function() {
		//shouldThrowException({ maximum: "bob"});
	});

	describe("When minimum is larger than maximum", function() {
		//shouldThrowException({ minimum: 50, maximum : 40});
	});

	describe("When there is only minimum", function() {
		it("should behave as if maximum is unbounded", function() {
		});
	});

	describe("When there is only maximum", function() {
		it("should accept very small values", function() {
		});
	});

	describe("When value is less than minimum", function() {
		it("should identify validation failure", function() {

		});
	});

	describe("When value is more than maximum", function() {
		it("should identify validation failure", function() {

		});
	});
});