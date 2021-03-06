var assert = require('chai').assert;
var numericValidator = rulesLib.require('numericValidator');

describe('numeric validator', function() {
  
	describe("When config has unsupported values", function() {
		it("should throw exception", function() {
			var create = function() {
				numericValidator.create({bob: "yes", bill: 5});
			}

			assert.throws(create, /Unexpected configuration values provided \(bob\/bill\). Only min\/max supported./);
		});
	});
});