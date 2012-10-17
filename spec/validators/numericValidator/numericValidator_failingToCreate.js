var assert = require('chai').assert;
var numericValidator = lib.require('numericValidator');

describe('numeric validator', function() {
  
	describe("When config has unsupported values", function() {
		it("should throw exception", function() {
			var create = function() {
                debugger;
				numericValidator.create({bob: "yes", bill: 5});
			}

			assert.throws(create, Error, "Unexpected configuration values provided (bob/bill). Only minimum/maximum supported.");
		});
	});
});